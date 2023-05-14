import { DICTIONARY } from '../constants/dictionary'

export const isValidWord = (word: string) => {
  return DICTIONARY.includes(word.toLowerCase());
}

export const isInWord = (completedWord: string, correctWord: string) => {
  const letterToLocationMapping: Record<string, number> = {};
  const inWord = ["", "", "", "", ""];
  // Hack to remove correct letters from this function
  for (let i = 0; i < correctWord.length; i++) {
    if (correctWord[i] === completedWord[i]) {
      correctWord = correctWord.substring(0, i) + " " + correctWord.substring(i + 1);
      inWord[i] = "in_correct_position";
    }
  }
  for (let i = 0; i < correctWord.length; i++) {
    if (inWord[i] === "in_correct_position") {
      continue;
    }
    let wordIndex = correctWord.indexOf(completedWord[i]);
    if (wordIndex === -1) {
      inWord[i] = "not_in_word";
    } else {
      if (letterToLocationMapping.hasOwnProperty(completedWord[i])) {
        let newCorrectWord = correctWord.substring(letterToLocationMapping[completedWord[i]] + 1, correctWord.length + 1);
        let newWordIndex = newCorrectWord.indexOf(completedWord[i]);
        if (newWordIndex === -1) {
          inWord[i] = "not_in_word";
        } else {
          inWord[i] = "in_word";
          letterToLocationMapping[completedWord[i]] = letterToLocationMapping[completedWord[i]] + newWordIndex + 1;
        }
      } else {
        inWord[i] = "in_word";
        letterToLocationMapping[completedWord[i]] = wordIndex;
      }
    }
  }
  return inWord;
}

const letterStatusMapping: Record<string, number> = {
  not_in_word: 0,
  in_word: 1,
  in_correct_position: 2,
};

export const getLetterStatuses = (words: string[], correctWord: string) => {
  const letterStatuses: Record<string, string> = {};
  words.forEach(word => {
    let isInWordMap = isInWord(word, correctWord);
    for (let i = 0; i < word.length; i++) {
      if (letterStatuses.hasOwnProperty(word[i])) {
        if (letterStatusMapping[isInWordMap[i]] > letterStatusMapping[letterStatuses[word[i]]]) {
          letterStatuses[word[i]] = isInWordMap[i];
        }
      } else {
        letterStatuses[word[i]] = isInWordMap[i];
      }
    }
  });
  return letterStatuses;
}
