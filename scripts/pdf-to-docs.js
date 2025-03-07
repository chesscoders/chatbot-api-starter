import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { addDocuments } from '../controllers/document/add-documents.js';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import fs from 'fs';

// Recreate __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adjust the relative paths: Go up one level from the scripts folder, then into the data folder
const pdfFilePath = join(__dirname, '..', 'data', 'joc-responsabil.pdf');
const outputFilePath = (tag) => join(__dirname, '..', 'data', `output_${tag}.json`);

async function saveDocsToJson({ filepath, source, tag, title }) {
  const loader = new PDFLoader(filepath);
  const docs = await loader.load();

  const transformedDocs = docs.map((doc) => ({
    pageContent: doc.pageContent,
    metadata: {
      source,
      tag,
      title,
    },
  }));

  console.log('Adding documents');
  await addDocuments(transformedDocs);
  console.log('Documents added successfully.');

  const jsonContent = JSON.stringify(transformedDocs, null, 2);
  fs.writeFileSync(outputFilePath(tag), jsonContent, 'utf8');
  console.log('Documents have been saved to JSON');
}

// Run the function using the paths constructed with __dirname
saveDocsToJson({
  filepath: pdfFilePath,
  source: pdfFilePath,
  tag: 'joc-responsabil',
  title: 'Joc Responsabil',
});
