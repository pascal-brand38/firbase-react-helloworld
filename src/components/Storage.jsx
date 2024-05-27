// Copyright (c) Pascal Brand
// MIT License

import { useEffect, useState } from 'react'

import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Storage({app}) {
  const [ url, setUrl ] = useState(undefined)
  useEffect(() => {
    const init = async() => {
      const storage = getStorage();

      const imgRef = ref(storage, 'public/firebase-cloud-storage.png');
      getDownloadURL(imgRef)
        .then((url) => {
          // Insert url into an <img> tag to "download"
          console.log('PASCAL url ', url)
          setUrl(url)
        })
        .catch((error) => {
          // check https://firebase.google.com/docs/storage/web/download-files?hl=fr
          // and https://firebase.google.com/docs/storage/web/handle-errors
          console.log(`STORAGE ERROR ${error}`)
        })
    }

    if (app !== undefined) {
      init()
    }
  }, [app])

  if (url !== undefined) {
    return (
      <>
        <img src={url} title="Image loaded from Firebase Storage" />
      </>
    )
  }
}

export { Storage }
