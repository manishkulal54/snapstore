import React, { useContext } from 'react'
import { ImageContext } from '../context/ImageContext'

export default function Box({imgData}) {
  const {setShowPopup,setPopupObj }=useContext(ImageContext)
  return (
    <div className='box' onClick={()=>{setShowPopup(true);setPopupObj(imgData)}}>
      <img src={imgData.src['original']} alt={imgData.alt} />
    </div>
  )
}
