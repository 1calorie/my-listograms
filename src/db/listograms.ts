let listograms  = require('./caniuse.json');

export function getListograms() {
  let concatenated = listograms;
  for (let i = 0; i < 10; i ++) {
    concatenated = concatenated.concat(listograms);
  }

  return concatenated;
}
