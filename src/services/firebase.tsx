// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, signInWithPopup, getAuth, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPHmGfnKRQiX-KEcJogk16AWQgw1O2zAI",
  authDomain: "wordle-def95.firebaseapp.com",
  projectId: "wordle-def95",
  storageBucket: "wordle-def95.appspot.com",
  messagingSenderId: "295393947405",
  appId: "1:295393947405:web:e08cb858a950e281bd0a44",
  measurementId: "G-79E6G7B4LV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

export const signOutFromGoogle = async () => {
  signOut(auth).catch((err) => {
    // An error happened.
    console.error(err);
    alert(err.message);
  });
}

const db = getFirestore(app);

export const getTodaysWordFromFirestore = async () => {
  const date = new Date();
  const dateString = date.toLocaleDateString().replace(/\//g, "");
  return getDoc(doc(db, "words", dateString)).then(doc => {
    const data = doc.data();
    return data && data["word"];
  });
}

export const getStatsFromFirestore = async (userId: string) => {
  return getDoc(doc(db, "stats", userId)).then(doc => {
    if (!doc) {
      return null;
    }
    return doc.data();
  });
}

export const updateStatsInFirestore = async (
  userId: string,
  gameWon: boolean,
  tryCount?: number,
) => {
  return getStatsFromFirestore(userId).then(data => {
    if (!data) {
      // stats don't exist currently; let's create new ones
      let statsObj = null as any;
      const guessDistribution = [0, 0, 0, 0, 0, 0];
      if (gameWon && tryCount) {
        guessDistribution[tryCount - 1] = 1;
        statsObj = {
          current_streak: 1,
          max_streak: 1,
          games_played: 1,
          games_won: 1,
          guess_distribution: guessDistribution,
        };
      } else {
        statsObj = {
          current_streak: 0,
          max_streak: 0,
          games_played: 1,
          games_won: 0,
          guess_distribution: guessDistribution,
        };
      }
      const docRef = doc(db, "stats", userId);
      return setDoc(docRef, statsObj).then(() => {
        return statsObj;
      });
    }
    if (gameWon && tryCount) {
      data["games_played"] += 1;
      data["games_won"] += 1;
      data["guess_distribution"][tryCount - 1] += 1;
      data["current_streak"] += 1;
      data["max_streak"] = Math.max(data["current_streak"], data["max_streak"]);
    } else {
      data["games_played"] += 1;
      data["current_streak"] = 0;
    }
    const docRef = doc(db, "stats", userId);
    return updateDoc(docRef, data).then(() => {
      return data;
    });
  });
}
