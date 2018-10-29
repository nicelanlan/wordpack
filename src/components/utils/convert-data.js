export const convertTableDataToJson = tableData => {
  const header = tableData[0];
  const result = {
  };
  for (let i = 1; i < tableData.length; i++) {
    const jsonKey = tableData[i][0];
    for (let j = 1; j<header.length;j++) {
      if (!result[header[j]]) {
        result[header[j]] = {};
      }
      result[header[j]][jsonKey] = tableData[i][j];
    }
  }
  return result;
};
