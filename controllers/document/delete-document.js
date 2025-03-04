import { error } from '@functions';
import vectorStore from 'ai/vector-store/_vector-store';

const deleteDocuments = async (ids) => {
  /**
   * const exampleIds = ['1', '2', '3']
   */
  try {
    await vectorStore.delete({ ids });

    return true;
  } catch (err) {
    console.error(err);

    return false;
  }
};

export default async (req, res) => {
  const { id } = req.params;
  const { me } = req.user;

  if (!me) {
    throw error(403, 'Forbidden');
  }

  if (!id) {
    throw error(400, 'Missing required params');
  }

  const result = await deleteDocuments([id]);

  return res.status(200).json({ success: result });
};
