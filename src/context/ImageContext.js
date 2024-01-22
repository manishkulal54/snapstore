import React, { createContext, useState } from "react";
import { createClient } from 'pexels'

const client = createClient(process.env.REACT_APP_API_KEY)

export const ImageContext = createContext();

export default function ImageState(props) {
  const [showPopup, setShowPopup] = useState(false) //to display the popup
  const [popupObj, setPopupObj] = useState({})
  const [searchImgData, setSearchImgData] = useState([])
  // const [searchInp, setSearchInp] = useState(null)

  function searchImage(query, amount) {
    if (query === null) return
      client.photos.search({ query, per_page: amount })
      .then(photos => { setSearchImgData(photos.photos) })
      .catch(err=>{
        alert(err)
      })
  }

  return (
    <ImageContext.Provider value={{
      showPopup,
      setShowPopup,
      popupObj,
      setPopupObj,
      searchImage,
      searchImgData
    }}>
      {props.children}
    </ImageContext.Provider>
  );
}
