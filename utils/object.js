/**
 * sort url params by keys, and encode uri components
 */
const obj2urlParams = (obj) => {
  return objKeysSort(obj)
    .map((key) => `${key}=${encodeURIComponent(obj[key] || "")}`)
    .join("&");
};

const objKeysSort = (obj) => Object.keys(obj).sort();

module.exports = {
  obj2urlParams,
};
