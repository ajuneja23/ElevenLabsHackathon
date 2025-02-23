'use client'

import { useEffect, useState } from 'react'

interface Call {
  id: string
  status: 'pending' | 'answered' | 'rejected'
  contactName: string
  timestamp: string
  description: string
}

interface CallListProps {
  marketTitle: string
  description: string
}

export function CallList({ marketTitle, description }: CallListProps) {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching calls - replace with actual API call
    const fetchCalls = async () => {
      // Mock data - replace with actual API call
      const mockCalls: Call[] = [
        {
          id: '1',
          status: 'answered',
          contactName: 'John Smith',
          timestamp: new Date().toISOString(),
          description: 'Discussed market implications and potential outcomes.'
        },
        {
          id: '2',
          status: 'rejected',
          contactName: 'Sarah Johnson',
          timestamp: new Date().toISOString(),
          description: 'Call was not answered after 3 attempts.'
        },
        {
          id: '3',
          status: 'pending',
          contactName: 'Mike Wilson',
          timestamp: new Date().toISOString(),
          description: 'Scheduled for follow-up discussion.'
        },
      ]

      setCalls(mockCalls)
      setLoading(false)
    }

    fetchCalls()
  }, [marketTitle])

  const getStatusIcon = (status: Call['status']) => {
    switch (status) {
      case 'answered':
        return (
          <div className="rounded-full bg-green-500/20 p-2">
            <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case 'rejected':
        return (
          <div className="rounded-full bg-red-500/20 p-2">
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )
      case 'pending':
        return (
          <div className="rounded-full bg-yellow-500/20 p-2">
            <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
    }
  }

  if (loading) {
    return <div className="text-gray-400">Loading calls...</div>
  }

  return (
    <div className="space-y-4">
      {calls.map((call) => (
        <div
          key={call.id}
          className="rounded-lg bg-gray-800 p-4 flex items-start gap-4"
        >
          {getStatusIcon(call.status)}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{call.contactName}</h3>
              <span className="text-sm text-gray-400">
                {new Date(call.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-gray-300">{call.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 