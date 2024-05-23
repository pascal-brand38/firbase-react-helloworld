import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";


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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => incCount()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
