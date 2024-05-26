// Copyright (c) Pascal Brand
// MIT License

import { useEffect, useState } from 'react'

import { initializeApp } from "firebase/app";


import { Firestore } from './components/Firestore'
import { Sign } from './components/Sign'

function App() {
  const [app, setApp] = useState(undefined)

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
    }

    init()

  }, [])

  return (
    <>
      <Firestore app={app} />

      <Sign />
    </>
  )
}

export default App
