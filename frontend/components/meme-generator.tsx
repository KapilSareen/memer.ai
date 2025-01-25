"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Twitter } from "lucide-react"

export default function MemeGenerator() {
  const [topText, setTopText] = useState("")
  const [bottomText, setBottomText] = useState("")
  const [memeUrl, setMemeUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const generateMeme = async () => {
    setLoading(true)
    // Simulate meme generation process
    setBottomText("madarchod")
    
    let a = await fetch("http://localhost:5000/generate-meme", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({"user_prompt": topText })})
    console.log(a)
    // setTimeout(() => {
    //   setMemeUrl(a.text) 
    //   setLoading(false)
    // }, 1500)
  }

  const uploadToTwitter = async () => {
    // Placeholder logic for uploading meme to Twitter
    fetch("http://localhost:5000/post-meme", {method: "POST", body: JSON.stringify({ "user_prompt":bottomText , "meme":memeUrl})})
    alert("Meme uploaded to Twitter!")
  }

  return (
    <Card className="w-[30vw]  p-6 shadow-lg rounded-lg hover:shadow-xl transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-blue-600">
          Create Your Meme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          {/* <Label htmlFor="topText" className="text-lg font-medium text-gray-700">Enter Prompt ... </Label> */}
          <Input
            id="topText"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            placeholder="Enter your Prompt ..."
            className="focus:ring-2 focus:ring-blue-500 transition-all h-[50px] text-[50px]"
          />
        </div>
        {/* <div className="space-y-2">
          <Label htmlFor="bottomText" className="text-lg font-medium text-gray-700">Bottom Text</Label>
          <Input
            id="bottomText"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            placeholder="Enter bottom text"
            className="focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div> */}
        <Button
          onClick={generateMeme}
          className={`w-full ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 text-white font-semibold rounded-lg py-3`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Meme"}
        </Button>
        {memeUrl && (
          <div className="mt-6 transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-80">
            <img src={memeUrl || "/placeholder.svg"} alt="Generated Meme" className="w-full rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={uploadToTwitter}
          className={`w-full ${!memeUrl ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} flex items-center justify-center transition-all duration-300 text-white font-semibold rounded-lg py-3`}
          disabled={!memeUrl}
        >
          <Twitter className="mr-2 h-5 w-5 text-white" />
          Upload to Twitter
        </Button>
      </CardFooter>
    </Card>
  )
}
