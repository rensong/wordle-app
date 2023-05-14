import { Grid, Box, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

import {isInWord} from '../../lib/wordHelper';
import {Colors} from '../../constants/colors';

type Props = {
  word: string
  isCompleted?: boolean
  wordLength?: number
  correctWord?: string
}

const Item = styled(Box)<{ status?: string }>`
   background-color: ${p => (!p.status ? 'white'
    : (p.status === 'in_correct_position' ? Colors.green
    : (p.status === 'not_in_word' ? Colors.darkGrey : (
      Colors.yellow
    ))))};
   border: ${p => (!p.status ? "2px solid " + Colors.borderGrey : "none")};
   color: ${p => (p.status ? '#fff' : '#000')};
   aspect-ratio: 1;
   width: 100%;
   margin-top: 8px;
   display: flex;
   align-items: center;
   justify-content: center;
   box-sizing: border-box;
`;

export default function WordleRow({
  word,
  correctWord,
  isCompleted = false,
  wordLength = 5,
}: Props) {
  const completedWord = [];
  for (let i = 0; i < wordLength; i++) {
    if (word.length > i) {
      completedWord.push(word[i]);
    } else {
      completedWord.push(" ");
    }
  }
  const inWord = correctWord ? isInWord(word, correctWord) : [];
  return (
    <Grid container spacing={1}>
      {completedWord.map((letter, i) =>  (
        <Grid item xs key={i}>
          {correctWord
            ? <Item
                className={inWord[i] && "bounce"}
                status={inWord[i]}>
                {letter.toUpperCase()}
              </Item>
            : <Item>{letter.toUpperCase()}</Item>
          }
        </Grid>
      ))}
    </Grid>
  );
}
