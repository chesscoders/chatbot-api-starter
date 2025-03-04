// MVP approach to adding timestamps.
// TODO @todo: should use mongoose and native timestamps

const docWithTimestamp = (doc) => {
  if (!doc || !doc.pageContent || !doc.metadata) {
    console.warn('Document incomplete. No formattinig performed.');

    return doc;
  }

  const NOW = Date.now();

  return { ...doc, metadata: { ...doc.metadata, createdAt: NOW } };
};

export default docWithTimestamp;
