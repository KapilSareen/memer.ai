"use client"

import { useState } from "react"
import { MemeButton } from "@/components/ui/meme-button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Sparkles } from "lucide-react"

export function MemeInput() {
  const [prompt, setPrompt] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your AI and Twitter posting logic
    toast({
      title: "Meme Posted! 🎉",
      description: "Your hilarious meme is now live on Twitter!",
    })
    setPrompt("")
  }

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Craft Your Meme Magic ✨</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter your meme prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
        />
        <MemeButton type="submit" className="w-full">
          <Sparkles className="inline-block mr-2" />
          Generate & Post Meme
        </MemeButton>
      </form>
    </div>
  )
}

