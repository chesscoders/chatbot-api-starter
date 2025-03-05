import { error } from 'express-goodies/functions/index.js';
import { docWithTimestamp, generateIds } from '../../ai/functions/index.js';
import vectorStore from '../../ai/vector-store/_vector-store.js';

export const addDocuments = async (documents) => {
  /**
    const exampleDocuments = [{
      pageContent: 'The powerhouse of the cell is the mitochondria',
      metadata: { source: 'https://example.com', tag: 'faq' },
    }];
  */

  const ids = generateIds(documents.length);
  await vectorStore.addDocuments(documents.map(docWithTimestamp), { ids });

  return ids;
};

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(403, 'Forbidden');
  }

  const { documents } = req.body;

  const ids = await addDocuments(documents);

  return res.status(200).json(ids);
};
