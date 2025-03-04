import fs from 'fs';
import path from 'path';
import { addDocuments } from '../controllers/document/add-documents.js';

const mergedFilePath = path.join(process.cwd(), 'data/regulament-de-joc-documents.json');

const addRegulamentJocDocuments = async () => {
  try {
    const data = fs.readFileSync(mergedFilePath, 'utf8');
    const documents = JSON.parse(data);

    await addDocuments(documents);
    console.log('Regulament de Joc documents added successfully.');
  } catch (err) {
    console.error('Error reading or adding Regulament de Joc documents:', err);
  }
};

addRegulamentJocDocuments();
