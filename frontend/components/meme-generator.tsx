"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Sparkles, Send } from "lucide-react"
import { MemePreview } from "@/components/meme-preview"

export function MemeGenerator() {
  const [prompt, setPrompt] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your AI and Twitter posting logic
    toast({
      title: "Meme Posted",
      description: "Your AI-generated meme is now live on Twitter.",
    })
    setPrompt("")
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Sparkles className="mr-2 text-neon-purple" />
          Generate Meme
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your meme prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <Button type="submit" className="w-full bg-neon-purple hover:bg-neon-blue transition-colors duration-300">
            <Send className="mr-2 h-4 w-4" /> Generate & Post
          </Button>
        </form>
      </div>
      <MemePreview />
    </div>
  )
}

