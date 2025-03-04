const queryToFilterDocuments = (filter) => {
  const mongoFilter = { ...filter };
  if (filter.search) {
    mongoFilter.text = { $regex: new RegExp(filter.search, 'i') };
  }
  delete mongoFilter.search;

  return mongoFilter;
};

export default queryToFilterDocuments;
