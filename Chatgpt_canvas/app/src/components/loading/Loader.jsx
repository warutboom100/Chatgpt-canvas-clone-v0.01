import React from 'react'
import { getImageUrl } from "../../utils";
import './Loader.css'
const Loader = () => {
  return (
    <div className='loader-body'>
        <img src={getImageUrl("loading.gif")} alt="Loading animation"/>
    </div>
    
  )
}

export default Loader