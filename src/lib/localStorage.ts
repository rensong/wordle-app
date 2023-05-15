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
  // return localStorage.getItem("current_word_" + date.toLocaleDateString());
}

export const setTodaysWordInCache = (word: string) => {
  // ignore cache for now
  return null;
  // const date = new Date();
  // return localStorage.setItem("current_word_" + date.toLocaleDateString());
}
