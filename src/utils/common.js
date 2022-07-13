export const decodeHtmlEntity = (str) => {
  if (!str) return '';
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
};

export const encodeHtmlEntity = (str) => {
  let buf = [];
  for (let i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};