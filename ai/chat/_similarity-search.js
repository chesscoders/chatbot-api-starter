/**
 * Apparently not used throughout the project
 */

import vectorStore from 'ai/vector-store/_vector-store';

const NUM_RESULTS = 3;

const similaritySearch = async (prompt) => {
  /**
   * const examplePrompt = 'Cum resetez contul?'
   */
  const retriever = vectorStore.asRetriever({
    k: NUM_RESULTS,
  });
  const results = await retriever.invoke(prompt);

  return results;
};

export default similaritySearch;
