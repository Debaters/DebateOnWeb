const getHomeDebates = (offset: number, size: number): string => {
  let minBox = 7;
  if (offset === undefined) offset = 0;
  if (size === undefined || size < 6) size = minBox;
  return `query gethomeDebates {
    homeDebates(offset:${offset}, size:${size}){id title creatorName}
  }`;
};

const homeQuery = { getHomeDebates };

export default homeQuery;
