// Copyright (c) Pascal Brand
// MIT License

import { useEffect, useState } from 'react'

import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Firestore({app}) {
  const [count, setCount] = useState(undefined)
  const [db, setDb] = useState(undefined)

  useEffect(() => {
    const init = async() => {
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

    if (app !== undefined) {
      init()
    }
  }, [app])

  const incCount = () => {
    setCount((count) => {
      const newCount = count + 1
      const docRef = doc(db, "stats", "count");
      setDoc(docRef, { count: newCount }, { merge: true });

      return newCount
    })
  }

  if (count === undefined) {
    return 'Waiting for Firestore Database'
  } else {
    return (
      <button onClick={() => incCount()}>
        Firestore Database - count is {count}
        <br />
        Click to increment
      </button>
    )
  }
}

export { Firestore }
