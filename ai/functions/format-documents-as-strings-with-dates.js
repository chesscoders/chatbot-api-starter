const formatDocumentsAsString = (documents) => {
  return documents
    .map((document) => {
      const createdAt = document.metadata.createdAt;

      // Convert to Date object
      const date = new Date(createdAt);

      // Format the date
      const formattedDate = date
        .toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        .replace(',', '');

      const documentContext = '\n' + formattedDate + '\n' + document.pageContent;

      return documentContext;
    })
    .join('\n\n');
};

export default formatDocumentsAsString;
