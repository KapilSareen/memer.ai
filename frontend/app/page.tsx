import MemeGenerator from "@/components/meme-generator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0">
      <h1 className="mb-5 text-[3vw] p-0 font-bold font-lilita">Memer.ai</h1>
      <MemeGenerator />
    </main>
  )
}

