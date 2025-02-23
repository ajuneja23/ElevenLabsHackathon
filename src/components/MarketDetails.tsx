import Image from "next/image"
import { getMarketDetails } from "@/lib/kalshi"
import { analyzeSentiment } from "@/lib/openai"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default async function MarketDetails({ url }: { url: string }) {
  if (!url) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg bg-red-900/50 p-6 text-white">
          <h1 className="mb-4 text-3xl font-bold text-red-400">Error</h1>
          <p className="text-red-200">No market URL provided</p>
        </div>
      </div>
    )
  }

  try {
    const market = await getMarketDetails(url)
    const sentimentAnalysis = await analyzeSentiment(market.title)

    return (
      <div className="mx-auto max-w-6xl text-white">
        <div className="mb-8 rounded-lg bg-gray-900 p-6">
          <h1 className="mb-4 text-3xl font-bold">{market.title}</h1>
          
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Market Stats */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h2 className="mb-2 text-xl font-semibold">Market Stats</h2>
              <div className="grid gap-4">
                <div>
                  <p className="text-4xl font-bold text-blue-400">
                    {market.currentOdds.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-400">Current Odds</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-300">Status</p>
                    <p className="text-gray-400">{market.status}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">Last Price</p>
                    <p className="text-gray-400">${market.lastPrice}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">24h Volume</p>
                    <p className="text-gray-400">${market.volume24h.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">Total Volume</p>
                    <p className="text-gray-400">${market.volume.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">Liquidity</p>
                    <p className="text-gray-400">${market.liquidity.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-300">Close Time</p>
                    <p className="text-gray-400">{market.closeTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Image */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h2 className="mb-2 text-xl font-semibold">Market Image</h2>
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={market.imageUrl}
                  alt={market.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Sentiment Analysis Section */}
          <div className="mb-8 rounded-lg bg-gray-800 p-6">
            <h2 className="mb-4 text-xl font-semibold">Social Sentiment Analysis</h2>
            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-blue-300 
              prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
              prose-p:text-gray-300 
              prose-strong:text-blue-200 
              prose-ul:text-gray-300 prose-li:marker:text-blue-400
              prose-a:text-blue-400 hover:prose-a:text-blue-300
              prose-blockquote:border-blue-400 prose-blockquote:text-gray-400
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
              <Markdown remarkPlugins={[remarkGfm]}>
                {sentimentAnalysis}
              </Markdown>
            </div>
          </div>

          {/* Market Description */}
          <div className="rounded-lg bg-gray-800 p-6">
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-blue-300 
              prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
              prose-p:text-gray-300 
              prose-strong:text-blue-200 
              prose-ul:text-gray-300 prose-li:marker:text-blue-400
              prose-a:text-blue-400 hover:prose-a:text-blue-300
              prose-blockquote:border-blue-400 prose-blockquote:text-gray-400
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
              <Markdown remarkPlugins={[remarkGfm]}>
                {market.summary}
              </Markdown>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-4 text-right text-sm text-gray-400">
            Last updated: {new Date(market.lastUpdated).toLocaleString()}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in MarketDetails:", error)
    return (
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg bg-red-900/50 p-6 text-white">
          <h1 className="mb-4 text-3xl font-bold text-red-400">Error</h1>
          <p className="text-red-200">
            {error instanceof Error ? error.message : "An unexpected error occurred while fetching market details."}
          </p>
          <div className="mt-4 text-sm text-red-200">
            <p>Provided URL: {url}</p>
            <p className="mt-2">Error details: {error instanceof Error ? error.stack : JSON.stringify(error)}</p>
          </div>
        </div>
      </div>
    )
  }
}

