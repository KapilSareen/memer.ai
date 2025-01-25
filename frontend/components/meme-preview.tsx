import Image from "next/image"

export function MemePreview() {
  return (
    <div className="bg-gray-700 p-6">
      <h2 className="text-2xl font-semibold mb-4">Meme Preview</h2>
      <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center bg-gray-800">
        <Image src="/placeholder.svg" alt="Meme Preview" layout="fill" objectFit="contain" className="p-4" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
          AI Meme Loading...
        </div>
      </div>
    </div>
  )
}

