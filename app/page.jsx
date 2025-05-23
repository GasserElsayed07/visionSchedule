"use client"
import React, { useEffect , useState } from "react"

export default function Page() {
  const [data , setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: 'I need to make time for studying, coding, and gym, make blocks 2hours' }),
      })
      const result = await res.json()
      setData(result)
    }

    fetchData()
  } , [])
  console.log(data  , "this is the data ")
    return (
      <div>
        <h1>Server Response</h1>
        {data ? (
          <pre>{JSON.stringify(data , null , 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }