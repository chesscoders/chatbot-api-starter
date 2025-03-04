const formatDocumentsAsString = (documents) => {
  return documents.map((document) => document.pageContent).join('\n\n');
};

export default formatDocumentsAsString;
