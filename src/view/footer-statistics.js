export const createFooterStatisticsTemplate = (filter) => {
  const {count} = filter;

  return `<p>${count} movies inside</p>`;
};
