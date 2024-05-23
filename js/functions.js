const isStringPalindrom = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < Math.floor(string.length / 2); i++) {
    if (!(string.at(i) === string.at(string.length - 1 - i))) {
      return false;
    }
  }
  return true;
};


const getNumber = (string) => {
  let tempStr = '';
  if (typeof (string) === 'number') {
    string = String(string);
  }
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      tempStr += string.at(i);
    }
  }
  return parseInt(tempStr, 10);
};


const isNormalLength = (string, maxLength) => string.length <= maxLength;


const addingStr = (string, minLength, addStr) => {
  while (string.length < minLength) {
    string = string.length - minLength >= addStr.length ? addStr + string : addStr.slice(0, minLength - string.length) + string;
  }
  return string;
};
