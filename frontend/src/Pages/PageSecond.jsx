import React, { useState} from 'react'
import Bg from '../assets/hero-position-img.webp'
import Hero from '../assets/hero-bg1.webp'
import './Landing.css'
import Card from '../Components/MemeGeneratorCard'
import useStore from '../../Store'
import Linker from '../Components/Link'
function PageSecond() {
  
  return (
    <div className='Landing'>
        <img className='Hero2' src={Bg}></img>
        <img className='Background' src={Hero}></img>
        <h1 className='Title'>Memer.ai</h1>
        {/* <p className='Description'>"Unleash Your Inner Comedian with Memer.ai"
        </p>
        <p className='Description2'>Turn your wildest ideas into hilarious memes in seconds! Just type a prompt, let our AI work its magic, and watch as your meme comes to life. Love it? Instantly share the laughs with the world on Twitter. Your creativity, our memes—let’s go viral together!</p> */}
        {/* <button className='Start' onClick={authentication}>Create</button>
        <input className="Username" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}></input> */}
        <Card />
        {/* {authenticate ? <Linker/> : "none" } */}
    </div>
  )
}

export default PageSecond   