import React,{useContext, useEffect} from 'react'
import "../stylesheets/Home.css"
import Box from '../components/Box'
import Popup from '../components/Popup'
import { ImageContext } from '../context/ImageContext'



export default function Home() {
 const {showPopup,searchImage,searchImgData}=useContext(ImageContext)

 useEffect(()=>{
  let arr=["Nature","cars","Bike","Painting","flowers","Technology","Cat","Dog","Animal","Birds","love","romance","rose"]
  searchImage(arr[(Math.floor(Math.random() * arr.length))],(Math.floor(Math.random() * 10) + 5))
 },[])

  return (
    <div className='homeContainer'>
        <>{showPopup && <Popup/>}</>
        <>
        {searchImgData&&searchImgData.map(imgData=>(<Box imgData={imgData} key={imgData.id}/>))}
        </>
    </div>
  )
}
