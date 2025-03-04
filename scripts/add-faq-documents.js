import fs from 'fs';
import path from 'path';
import { addDocuments } from '../controllers/document/add-documents.js';

const mergedFilePath = path.join(process.cwd(), 'data/faq-documents.json');

const sendFaqDocuments = async () => {
  try {
    const data = fs.readFileSync(mergedFilePath, 'utf8');
    const documents = JSON.parse(data);

    await addDocuments(documents);
    console.log('FAQ documents added successfully.');
  } catch (err) {
    console.error('Error reading or adding FAQ documents:', err);
  }
};

sendFaqDocuments();
