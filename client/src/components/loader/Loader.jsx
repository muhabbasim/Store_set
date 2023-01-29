import React from 'react'
import './Loader.scss'
import  ReactDOM  from 'react-dom'

function Loader() {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader"></div>
    </div>,
    document.getElementById("loader")
  );
};

export const Spinner = () => {
  return (
    <div className="container">
      <div className="spinner">
        <div className="loader"></div>
      </div>
    </div>
  )
}

export const Spinner2 = () => {
  return (
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  )
}

export default Loader;



