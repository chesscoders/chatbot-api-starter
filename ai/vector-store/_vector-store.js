import 'dotenv/config';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';
import collection from './_collection.js';

const embeddings = new OpenAIEmbeddings({
  model: 'text-embedding-3-small',
});

const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection,
  indexName: 'default', // The name of the Atlas search index. Defaults to "default"
  textKey: 'text', // The name of the collection field containing the raw content. Defaults to "text"
  embeddingKey: 'embedding', // The name of the collection field containing the embedded text. Defaults to "embedding"
});

export default vectorStore;
