import { ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableMap, RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import prompt from './_prompt.js';
import formatDocumentsAsString from 'ai/functions/format-documents-as-string.js';
import formatDocumentsAsStringsWithDates from 'ai/functions/format-documents-as-strings-with-dates.js';
import vectorStore from 'ai/vector-store/_vector-store.js';
import { ScoreThresholdRetriever } from 'langchain/retrievers/score_threshold';

const PRIORITY_NUM_RESULTS = 3;
const NUM_RESULTS = 6;

const chain = async (question, answerSize) => {
  const llm = new ChatOpenAI({ model: 'o3-mini' });

  // filter to only retrieve documents with tag "feed"
  const withFeedFilter = { tag: 'feed' };

  const priorityRetriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
    minSimilarityScore: 0.7, // Minimum similarity threshold
    maxK: PRIORITY_NUM_RESULTS, // Maximum number of documents to return
    kIncrement: 2, // How much to increase K by each time
    filter: withFeedFilter, // Your existing filter
  });

  const docsRetriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
    minSimilarityScore: 0.7,
    maxK: NUM_RESULTS,
    kIncrement: 2,
    filter: { tag: { $ne: 'feed' } },
  });

  const priorityDocs = await priorityRetriever.getRelevantDocuments(question);
  const docs = await docsRetriever.getRelevantDocuments(question);
  const priorityContextString = formatDocumentsAsStringsWithDates(priorityDocs);
  const documentsContextString = formatDocumentsAsString(docs);

  const completeContext = `
  These are various articles from the support section of the website.
  <articles>
  ${documentsContextString}
  </articles>

  These are updates offered by the admins which may impact the initial articles. Each update has a date and time for you to discern the most recent information.
  <updates>
  ${priorityContextString}
  </updates>

  Answer the question using the initial presented articles and the updates.
  `;

  // Build a chain that uses the context from the filtered documents.
  const ragChainFromDocs = RunnableSequence.from([
    RunnablePassthrough.assign({
      context: () => completeContext,
      answerSize: () => answerSize,
    }),
    prompt,
    llm,
    new StringOutputParser(),
  ]);

  // Build the overall chain.
  let ragChainWithSource = new RunnableMap({
    steps: {
      question: new RunnablePassthrough(),
      answerSize: new RunnablePassthrough(),
    },
  });
  ragChainWithSource = ragChainWithSource.assign({ answer: ragChainFromDocs });

  return ragChainWithSource;
};

export default chain;
