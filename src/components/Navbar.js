import React, { useContext, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import '../stylesheets/Navbar.css'
import { ImageContext } from '../context/ImageContext';

export default function Navbar() {
  const [query,setQuery]=useState("")
  const [count,setCount]=useState("")
  const {searchImage}=useContext(ImageContext)

   function handleSearch(){
    if(!count)setCount(5)
    if (query !== ""){
      searchImage(query,count)
    }else{
      alert("Enter a query")
    }
   }

   useEffect(()=>{
    document.addEventListener('keydown',e=>{
      if (e.key ==='Enter'){
        handleSearch()
      }
    })
    // eslint-disable-next-line
   },[])
  return (
    <nav>
        <div className="logo">
            <a href='https://manishkulal.netlify.app/'>SNAPSTORE</a>
        </div>
        <div className="searchInpBox">
            <input type="search" id="searchInp" placeholder='Enter your search' value={query} onChange={(e)=>setQuery(e.target.value)} />
            <input type="number" name="" id="countInp" value={count} onChange={e=>setCount(e.target.value)} placeholder='Count'/>
            <button id='searchBtn' onClick={handleSearch}>
                <span><IoSearch/></span>
            </button>
        </div>
    </nav>
  )
}
