import { CallList } from '@/components/CallList'
import BackButton from '@/components/BackButton'

export default function AgenticCallsPage({
  searchParams,
}: {
  searchParams: { title: string; description: string }
}) {
  return (
    <main className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-6xl">
        <BackButton />
        <div className="rounded-lg bg-gray-900 p-6 text-white">
          <h1 className="mb-6 text-3xl font-bold">Agentic Calls</h1>
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-300">Market Details</h2>
            <p className="mt-2 text-gray-400">{searchParams.title}</p>
          </div>
          <CallList marketTitle={searchParams.title} description={searchParams.description} />
        </div>
      </div>
    </main>
  )
} 