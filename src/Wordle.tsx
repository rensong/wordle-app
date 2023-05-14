import { useState, useEffect } from 'react'

import { Grid } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

import WordleGrid from './components/grid/WordleGrid';
import NavBar from './components/nav/NavBar';
import Keyboard from './components/keyboard/Keyboard';
import {StatsData, calculateStatsData} from './lib/statsHelper';
import {
  auth,
  signInWithGoogle,
  signOutFromGoogle,
  getTodaysWordFromFirestore,
  getStatsFromFirestore,
  updateStatsInFirestore,
} from './services/firebase';


import {
  MAX_TRIES,
  MAX_WORD_LENGTH,
} from './constants/constants';

import {isValidWord} from './lib/wordHelper';
import {getCurrentGame, setCurrentGame} from './lib/localStorage';

type Props = {
  correctWord: string
}

function Wordle({
  correctWord,
}: Props) {
  const [user, setUser] = useState<any | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setUser(user);
      if (user) {
        getStatsFromFirestore(user!.uid).then(data => {
          setStats(calculateStatsData(data));
        });
      } else {
        setStats(null);
      }
    });
  }, []);
  const [currentWord, setCurrentWord] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const createAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const [words, setWords] = useState<string[]>(() => {
    const currentGame = getCurrentGame(correctWord);
    if (!currentGame) {
      return [];
    }
    if (
      currentGame.words.includes(correctWord) ||
      currentGame.words.length === MAX_TRIES
    ) {
      if (currentGame.words.includes(correctWord)) {
        createAlert("You win!");
      } else {
        createAlert("You lose - the word was " + correctWord);
      }

      setGameOver(true);
    }
    return currentGame.words;
  });

  const onKeyPress = (key: string) => {
    if (gameOver) {
      return;
    }
    if (key === "ENTER") {
      // if word is 5 letters
      if (currentWord.length === MAX_WORD_LENGTH) {
        if (currentWord === correctWord) {
          if (user) {
            updateStatsInFirestore(user!.uid, true, words.length + 1).then(data => {
              setStats(calculateStatsData(data));
            });
          }
          setWords([...words, currentWord]);
          setCurrentWord("");
          // YOU WIN!!
          createAlert("You win!");
          setGameOver(true);
          return;
        } else if (!isValidWord(currentWord)) {
          // show invalid word message
          createAlert("Invalid word");
          return;
        }
        // if we still have tries left
        if (words.length < MAX_TRIES - 1) {
          setWords([...words, currentWord]);
          setCurrentWord("");
        } else {
          // TODO: SHOW LOSE MESSAGE
          setWords([...words, currentWord]);
          setCurrentWord("");
          createAlert("You lose - the word was " + correctWord);
          setGameOver(true);
          if (user) {
            updateStatsInFirestore(user!.uid, false).then(data => {
              setStats(calculateStatsData(data));
            });
          }
          return;
        }
      } else {
        createAlert("Not enough letters");
        return;
      }
    } else if (key === "BACKSPACE") {
      if (currentWord.length > 0) {
        setCurrentWord(currentWord.substring(0, currentWord.length - 1));
      }
    } else {
      if (currentWord.length < MAX_WORD_LENGTH) {
        setCurrentWord(currentWord + key.toLowerCase());
      }
    }
  };

  useEffect(() => {
    setCurrentGame(words, correctWord);
  }, [words]);

  return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <NavBar
              user={user}
              stats={stats}
              onSignOutClick={signOutFromGoogle}
              onSignInClick={signInWithGoogle}
            />
          </Grid>
          <div className="nav-bar-buffer" />
          <div className="wordle-grid">
            <WordleGrid
              words={words}
              currentWord={currentWord}
              maxWordLength={MAX_WORD_LENGTH}
              numTries={MAX_TRIES}
              correctWord={correctWord}
            />
          </div>
          <div className="keyboard">
            <Keyboard
              onKeyPress={onKeyPress}
              words={words}
              correctWord={correctWord}
            />
          </div>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showAlert}
          autoHideDuration={2000}
          onClose={() => setShowAlert(false)}
          message={alertMessage}
          key={alertMessage}
        />
      </div>
  );
}

export default Wordle;
