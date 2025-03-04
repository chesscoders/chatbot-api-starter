import { addDocuments } from '../controllers/document/add-documents.js';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import fs from 'fs';

// Load the PDF

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

  fs.writeFileSync(
    `/Volumes/Code/projects/super-bot/superbot-api/data/output_${tag}.json`,
    jsonContent,
    'utf8'
  );

  console.log('Documents have been saved to JSON');
}

// Run the function
saveDocsToJson({
  filepath: '/Volumes/Code/projects/super-bot/superbot-api/data/joc-responsabil.pdf',
  source: 'https://superbet.ro/wiki/joc-responsabil',
  tag: 'joc-responsabil',
  title: 'Joc Responsabil',
});
