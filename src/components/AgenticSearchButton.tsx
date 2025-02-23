'use client'

import { useRouter } from 'next/navigation'

interface AgenticSearchButtonProps {
  marketTitle: string
  description: string
}

export default function AgenticSearchButton({ marketTitle, description }: AgenticSearchButtonProps) {
  const router = useRouter()

  const handleAgenticSearch = () => {
    const searchParams = new URLSearchParams({
      title: marketTitle,
      description: encodeURIComponent(description)
    })
    router.push(`/agentic-calls?${searchParams.toString()}`)
  }

  return (
    <button
      onClick={handleAgenticSearch}
      className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      Start Agentic Calls
    </button>
  )
} 