const fs = require('fs');

function saveDataToJson(name, data) {
  fs.writeFile(`${name}.json`, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`write ${name}.josn successfully!`);
    }
    return {
      data: '',
      code: 'ok'
    }
  })
}

exports.saveDataToJson = saveDataToJson;