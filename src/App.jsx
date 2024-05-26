// Copyright (c) Pascal Brand
// MIT License

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { Sign } from './components/Sign'

function App() {
  const [count, setCount] = useState(0)
  const [app, setApp] = useState(undefined)
  const [db, setDb] = useState(undefined)

  useEffect(() => {
    const init = async() => {
      const firebaseConfig = {
        apiKey: "AIzaSyAggx6E7Q6ttCUI2Lkexf6xz4VvtiPNUZc",
        authDomain: "firbase-react-helloworld.firebaseapp.com",
        projectId: "firbase-react-helloworld",
        storageBucket: "firbase-react-helloworld.appspot.com",
        messagingSenderId: "597188741887",
        appId: "1:597188741887:web:fa6a8203246efeed77daca"
      };

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      setApp(app)
      const db = getFirestore(app);
      setDb(db)

      const docRef = doc(db, "stats", "count");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCount(docSnap.data().count)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }

    init()

  }, [])

  const incCount = () => {
    setCount((count) => {
      const newCount = count + 1
      const docRef = doc(db, "stats", "count");
      setDoc(docRef, { count: newCount }, { merge: true });

      return newCount
    })
  }

  return (
    <>
      <button onClick={() => incCount()}>
        count from database is {count}
      </button>

      <Sign />
    </>
  )
}

export default App
