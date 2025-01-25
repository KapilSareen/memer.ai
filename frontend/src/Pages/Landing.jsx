import React, { useState} from 'react'
import Bg from '../assets/hero-position-img.webp'
import Hero from '../assets/hero-bg1.webp'
import './Landing.css'
import Card from '../Components/MemeGeneratorCard'
import useStore from '../../Store'
import Linker from '../Components/Link'
function Landing() {
  const [username, setUsername] = useState("")
  const setLink = useStore((state) => state.setLink);
  const setUser =  useStore((state) => state.setUser);
  const [authenticate, setAuthenticate] = useState(false)
  setUser(username)
  const authentication = () => {
    let data={
      "redirect_url":"http://localhost:5173/another-page",
      "username": username
    }
    async function auth() {
      console.log("hello")
      let a= await fetch('http://localhost:5000/api/auth', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Ensure json is a valid object
      })
      let b = await a.json()
      setLink(b["auth-url"])
      console.log(b)
      setAuthenticate(true)
    }

    auth()
    console.log(authenticate)
  }
  return (
    <div className='Landing'>
        <img className='Hero' src={Bg}></img>
        <img className='Background' src={Hero}></img>
        <h1 className='Title'>Memer.ai</h1>
        <p className='Description'>"Unleash Your Inner Comedian with Memer.ai"
        </p>
        <p className='Description2'>Turn your wildest ideas into hilarious memes in seconds! Just type a prompt, let our AI work its magic, and watch as your meme comes to life. Love it? Instantly share the laughs with the world on Twitter. Your creativity, our memes—let’s go viral together!</p>
        <button className='Start' onClick={authentication}>Get Started</button>
        <input className="Username" placeholder="Enter username..." onChange={(e)=>setUsername(e.target.value)}></input>
        {/* <Card /> */}
        {authenticate ? <Linker/> : "none" }
    </div>
  )
}

export default Landing   





