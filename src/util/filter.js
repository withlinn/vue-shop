// 数组去重
function getFilterArray(array) {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    if (res.indexOf(array[i]) === -1) {
      res.push(array[i]);
    }
  }
  return res;
}

export default getFilterArray;
