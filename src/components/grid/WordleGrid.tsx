import { Grid } from "@mui/material";
import WordleRow from './WordleRow';

type Props = {
  words: string[]
  currentWord: string
  correctWord: string
  numTries?: number
  maxWordLength?: number
}

export default function WordleGrid({
  words,
  currentWord,
  correctWord,
  numTries = 6,
  maxWordLength = 5,
}: Props) {
  const remainingRows = numTries - words.length - 1;
  const hasCurrentRow = words.length !== numTries;
  const emptyRows = [];
  for (let i = 0; i < remainingRows; i++) {
    emptyRows.push(
      <WordleRow key={i} word="" wordLength={maxWordLength} />
    );
  }
  return (
    <div>
      {words.map((word, index) =>
        <WordleRow key={word} correctWord={correctWord} word={word} />
      )}
      {hasCurrentRow && <WordleRow key={currentWord} word={currentWord} />}
      {emptyRows}
    </div>
  );
}
