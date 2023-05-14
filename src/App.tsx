import { useState, useEffect } from 'react'
import Wordle from './Wordle';

import './App.css';
import { setTodaysWordInCache, getTodaysWordFromCache } from './lib/localStorage';
import { getTodaysWordFromFirestore } from './services/firebase';
import { CORRECT_WORD } from './constants/constants';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
  const [correctWord, setCorrectWord] = useState<null | string>(() => {
    // get todays word from cache if possible
    return getTodaysWordFromCache();
  });
  // Load todays word from firestore
  useEffect(() => {
    if (!correctWord) {
      getTodaysWordFromFirestore().then(word => {
        setCorrectWord(word);
        setTodaysWordInCache(word);
      }).catch(err => {
        setCorrectWord(CORRECT_WORD);
      });
    }
  }, [correctWord]);

  if (!correctWord) {
    // return loading state
    return (
      <Box className="progress_indicator">
        <CircularProgress />
      </Box>
    );
  }
  return <Wordle correctWord={correctWord} />;
}

export default App;
