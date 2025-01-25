import React , {useState} from 'react'
import './Card.css'


function MemeGeneratorCard() {
    const [loading, setLoading] = useState(false)
    const [memeUrl , setMemeUrl] = useState(null)


    const generateMeme = async () => {}
    const uploadToTwitter = async () => {}
  return (
    <div className='Card'>
        <div className='Left'>
            <h1>CREATE YOUR MEME</h1>
            <input placeholder='Enter Your Prompt' required></input>
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
        
    </div>
  )
}

export default MemeGeneratorCard

