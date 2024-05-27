//eslint-disable-next-line-no-unused-vars
const isStringPalindrom = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i < Math.floor(string.length / 2); i++) {
    if (string[i] !== string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

//eslint-disable-next-line-no-unused-vars
const extractNumber = (string) => parseInt(String(string).replace(/\D/g, ''), 10);


//eslint-disable-next-line-no-unused-vars
const isNormalLength = (string, maxLength) => string.length <= maxLength;


//eslint-disable-next-line-no-unused-vars
const padStart = (string, length, template) => {
  while (string.length < length) {
    string = string.length - length >= template.length ? template + string : template.slice(0, length - string.length) + string;
  }
  return string;
};

isStringPalindrom('ДовОд');
extractNumber('1 кефир, 0.5 батона');
isNormalLength('проверяемая строка', 18);
padStart('q', 4, 'werty');
