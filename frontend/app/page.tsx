import { MemeGenerator } from "@/components/meme-generator"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-neon-blue to-neon-purple text-transparent bg-clip-text">
            MemeAI
          </h1>
          <p className="text-gray-400">Unleash the power of AI-generated memes</p>
        </header>
        <MemeGenerator />
      </div>
    </div>
  )
}

