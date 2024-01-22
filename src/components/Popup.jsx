import React, { useContext, useEffect, useRef, useState } from "react";
import "../stylesheets/Popup.css";
import { ImageContext } from "../context/ImageContext";
import { IoClose } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { saveAs } from "file-saver";

export default function Popup(props) {
  const { setShowPopup, popupObj, showPopup } = useContext(ImageContext);
  const [selectedSize, setSelectedSize] = useState("original");
  const closeDiv = useRef();

  useEffect(() => {
    function handler(e) {
      if (showPopup && !closeDiv.current.contains(e.target)) {
        setShowPopup(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDims(selectedSize);
    // eslint-disable-next-line
  }, [selectedSize]);

  function getDims() {
    const regex = /[?&]([wh])=(\d+)/g;
    let match;
    let imgDims = {};
    while ((match = regex.exec(popupObj.src[selectedSize])) !== null) {
      const [, key, value] = match;
      imgDims[key] = value;
    }
    return imgDims;
  }
  async function handleDownload() {
    let imgUrl = popupObj.src[selectedSize];
    const fileName = popupObj.alt || "downloaded_image";
    try {
      const response = await fetch(imgUrl);
      if (response.ok) {
        const blob = await response.blob();
        saveAs(blob, `${fileName}.jpg`);
      }
    } catch (error) {
      console.error(`Error downloading image: ${error.message}`);
    }
  }
  
  return (
    <>
      {popupObj && (
        <div className="popupContainer" ref={closeDiv}>
          <button
            className="closeBtn"
            onClick={() => {
              setShowPopup(false);
            }}
          >
            <IoClose />
          </button>
          <div className="img">
            <img
              src={popupObj.src[selectedSize]}
              alt={popupObj.alt}
              height={getDims()["h"] || null}
              width={getDims()["w"] || 500}
            />
          </div>
          <p>
            <strong>Title : </strong>
            {popupObj.alt}
          </p>
          <p>
            <strong>photographer : </strong>
            {popupObj.photographer}
          </p>
          <div className="options">
            <div className="selectInp">
              <select
                onChange={(e) => {
                  setSelectedSize(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select the size
                </option>
                {Object.keys(popupObj.src).map((keys, i) => (
                  <option value={keys} key={i}>
                    {keys}
                  </option>
                ))}
              </select>
            </div>
            <button className="downloadBtn" onClick={handleDownload}>
              Download <IoMdDownload />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
