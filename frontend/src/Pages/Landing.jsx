import React from 'react'
import Bg from '../assets/hero-position-img.webp'
import Hero from '../assets/hero-bg1.webp'
import './Landing.css'
import Card from '../Components/MemeGeneratorCard'

function Landing() {
  return (
    <div className='Landing'>
        <img className='Hero' src={Bg}></img>
        <img className='Background' src={Hero}></img>
        <h1 className='Title'>Memer.ai</h1>
        <p className='Description'>"Unleash Your Inner Comedian with Memer.ai"
        </p>
        <p className='Description2'>Turn your wildest ideas into hilarious memes in seconds! Just type a prompt, let our AI work its magic, and watch as your meme comes to life. Love it? Instantly share the laughs with the world on Twitter. Your creativity, our memes—let’s go viral together!</p>
        <button className='Start'>Create</button>
        {/* <Card /> */}
    </div>
  )
}

export default Landing