export type CurrentGameState = {
  words: string[]
  correctWord: string
}

export const setCurrentGame = (
  words: string[],
  correctWord: string,
) => {
  localStorage.setItem("current_game", JSON.stringify({
    words: words,
    correctWord: correctWord,
  }));
}

export const getCurrentGame = (correctWord: string) => {
  const state = localStorage.getItem("current_game");
  if (state) {
    const ret = JSON.parse(state) as CurrentGameState;
    if (ret.correctWord === correctWord) {
      return ret;
    }
  }
  return null;
}

export const getTodaysWordFromCache = () => {
  // do not pull from cache for now
  return null;
  // const date = new Date();
  // const [dateString] = date.toISOString().split('T');
  // return localStorage.getItem("current_word_" + dateString);
}

export const setTodaysWordInCache = (word: string) => {
  // ignore cache for now
  return null;
  // const date = new Date();
  // const [dateString] = date.toISOString().split('T');
  // return localStorage.setItem("current_word_" + dateString, word);
}
