const { saveDataToJson } = require('../service/table');

exports.getTableData = function* () {
  let res;
  const data = this.request.query;
  try {
    res = yield saveDataToJson('abc', {a: 1, b: 2});
    
  } catch (err) {
    console.log(err);
    res = {
      code: 'SYSTEM_ERROR',
    };
  }
  yield this.renderData(res);
};