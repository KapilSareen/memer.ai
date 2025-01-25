import React , {useState} from 'react'
import './Card.css'
import Hero2 from '../assets/hero-position-img.webp'
import useStore from '../../Store'

function MemeGeneratorCard() {
    const [loading, setLoading] = useState(false)
    const [memeUrl , setMemeUrl] = useState(null)
    const [prompt , setPrompt] = useState("")
    const my_user = useStore((state)=>state.user)


    const generateMeme = async () => {
      const meme = await fetch("http://localhost:5000/api/generate-meme", {
        method: "POST",  // Correct syntax for method
        headers: {
          "Content-Type": "application/json",  // Correct headers format
        },
        body: JSON.stringify({
          user_prompt: prompt, 
           // Properly stringify the request body
        }), // Remove the trailing comma
      });
      let data = meme.json()
      setMemeUrl(data["meme"])
    }
    const uploadToTwitter = async () => {
      const post_meme = await fetch("http://localhost:5000/api/post-meme", method="POST",headers={"Content-type":"application/json"},body= JSON.stringify( {
        "user_prompt" : prompt, "meme": memeUrl,"entity_id":user},))
        console.log(post_meme.response())
    }
  return (
    <div className='Card'>
        <div className='Left'>
            <h1>CREATE YOUR MEME</h1>
            <input placeholder='Enter Your Prompt' required onChange={(e)=>setPrompt(e.target.value)}></input>
            <button   onClick={generateMeme}
                        disabled={loading }
                        style={{
                            backgroundColor: loading  ? "#e0e0e0" : "#007bff",
                            color: loading  ? "#aaa" : "white",
                            cursor: loading  ? "not-allowed" : "pointer",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            transition: "background 0.3s ease",
                        }}>{loading ? "Generationg..." : "Generate Meme"}</button>
            {memeUrl && <img src={memeUrl} alt='Meme'/>}
            <button   onClick={uploadToTwitter}
                        disabled={!memeUrl}
                        style={{
                            backgroundColor: memeUrl ? "#6c757d" : "#e0e0e0",
                            color: memeUrl ? "white" : "#aaa",
                            cursor: memeUrl ? "pointer" : "not-allowed",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "1rem",
                            transition: "background 0.3s ease",
                        }}>Upload to Twitter</button>
        </div>
        <img className="Card_hero" src={Hero2}></img>
        
    </div>
  )
}

export default MemeGeneratorCard

