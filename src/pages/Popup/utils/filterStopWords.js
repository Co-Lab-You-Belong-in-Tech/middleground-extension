function filterH1RemoveStopWords(response, STOPWORDS) {
  if (response === null) return;
  response = response.toLowerCase();
  response = response.split(" ");
  var returnValue = [];

  for (let word of response) {
    if (!STOPWORDS.words.includes(word)) {
      returnValue.push(word);
    }
  }
  if (returnValue.length > 3) {
    returnValue = returnValue.slice(0, 3).join(" ");
  }

  return returnValue;
}

export default filterH1RemoveStopWords;
