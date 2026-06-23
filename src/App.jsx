import { useState } from 'react'
import Homepage from './Homepage'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <Homepage></Homepage>
      <ToastContainer />
    </>
  )
  
}

export default App
