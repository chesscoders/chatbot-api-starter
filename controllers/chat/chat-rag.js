/**
 * Streaming mode is not straightforward for a RAG chain with sources.
 * The context attachment step in the RAG chain breaks the stream.
 * As such, we need to manually indicate the end of the stream by writing to the response using SSE format.
 * On the FrontEnd, we handle this case gracefully, storing context for the message when specific events are received.
 */

import { error } from '@functions';
import chain from '../../ai/chat/_rag-chain.js';

const chatRag = async ({ question, streamMode, onChunk, answerSize }) => {
  const ragChain = await chain(question, answerSize);

  if (!streamMode) {
    const response = await ragChain.invoke(question);
    return response;
  }

  const stream = await ragChain.stream(question);

  for await (const chunk of stream) {
    onChunk(chunk);
  }
};

const handler = async (req, res) => {
  const { me } = req.user;
  const { question, streamMode, isShortAnswer } = req.body;

  if (!me) {
    throw error(403, 'Forbidden');
  }

  if (!question) {
    throw error(400, 'Missing question');
  }

  const answerSize = isShortAnswer ? 'Present a short answer.' : 'Present the full information.';

  if (!streamMode) {
    const response = await chatRag({ question, answerSize });
    return res.status(200).json({ response });
  }

  // If streaming mode
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  try {
    await chatRag({
      question,
      streamMode: true,
      answerSize,
      onChunk: (chunk) => {
        if (chunk && chunk.answer) {
          sendEvent('answer', chunk.answer);
        } else if (chunk && chunk.context) {
          sendEvent('context', chunk.context);
        }
      },
    });

    sendEvent('end', 'END_OF_STREAM');
    res.end();
  } catch (err) {
    sendEvent('error', err.message);
    console.error(err);
    res.end();
  }
};

export default handler;
