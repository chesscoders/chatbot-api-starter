import { error } from '@functions';
import collection from '../../ai/vector-store/_collection.js';
import queryToFilterDocuments from '@functions/filters/query-to-filter-documents.js';

const listDocuments = async (filter) => {
  /**
   * const exampleFilter = {
   *  tag: 'faq'
   *  search: 'cum pot'
   * }
   */
  const mongoFilter = queryToFilterDocuments(filter);

  const documents = await collection
    .find(mongoFilter, {
      sort: { createdAt: -1 },
      projection: {
        embedding: 0,
      },
    })
    .toArray();

  return documents;
};

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(403, 'Forbidden');
  }

  const filter = req.query;
  /**
   * MVP approach with no pagination
   * TODO @todo: should use mongoose with pagination
   */
  const documents = await listDocuments(filter);

  return res.status(200).json(documents);
};
