import { useEffect } from 'react'

import { Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

import Key from './Key';
import {getLetterStatuses} from '../../lib/wordHelper';
import {KEYBOARD_KEYS} from '../../constants/constants';


type Props = {
  words: string[],
  correctWord: string,
  onKeyPress: Function,
}

export default function Keyboard({
  words,
  correctWord,
  onKeyPress,
}: Props) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onKeyPress("ENTER");
      } else if (e.code === 'Backspace') {
        onKeyPress("BACKSPACE");
      } else {
        if (e.key.match(/[a-z]/i) && e.key.length == 1) {
          onKeyPress(e.key.toUpperCase());
        }
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    };
  }, [onKeyPress])

  const letterStatuses = getLetterStatuses(words, correctWord);
  return (
    <div>
      {KEYBOARD_KEYS.map(
        keys => (
          <Grid container spacing={1}>
            {keys.map(key => (
              <Key
                value={key}
                onKeyPress={onKeyPress}
                status={letterStatuses.hasOwnProperty(key.toLowerCase()) ?
                  letterStatuses[key.toLowerCase()] : "unused"}
              />
            ))}
          </Grid>
        )
      )}
    </div>
  );
}
