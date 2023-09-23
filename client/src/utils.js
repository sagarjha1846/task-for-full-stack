export const getFilteredData = (data, keyToCompare, keyToCompareWith) => {
  if (data) return data.filter((el) => el[keyToCompare] === keyToCompareWith);
};

export const getUniqueArrayOfEle = (data) => {
  return [...new Set(data)];
};

export const getMappedData = (data, key) => {
  if (data) return data?.map((el) => el[key]);
};

export const getSumOfAllEleInList = (data, key) => {
  return data.reduce((sum, item) => sum + item[key], 0);
};

export const getDataFromRes = (data, key, returnValue, comparingKey) => {
  if (data)
    return data.filter((el) => el[comparingKey] === key)[0][returnValue];
};
