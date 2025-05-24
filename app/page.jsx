"use client";
import "./global.css"
import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";

export default function Page() {
  const [data, setData] = useState(null);

  const [vision, setVision] = useState([])

  const [prompt, setPrompt] = useState()
  function addVision(formData){
    const newVision = formData.get("vision");
    setVision((prev) => {return [...prev, newVision]});
    for(let i = 0; i < vision.length; i++) {
      console.log(vision[i], "this is the vision");
    }
  }

  function getResponse() {

    for (let i = 0; i < vision.length; i++) {
      prompt += vision[i] + " ";
    }
    console.log(prompt, "this is the prompt");
    const fetchData = async () => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            `Generate a schedule for the following visions: ${prompt}`,
        }),
      });
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }
  if(data)console.log(data.schedule, "this is the data ");
  return (
    <div className="allTheSHIT">

      <div>
        <form action={addVision}>
          <input type="text" name="vision" />
          <button>add vision</button>
        </form>
      </div>

      <div className="schedule">
        <button onClick={getResponse}>Generate Schedule</button>
        <h1>Server Response</h1>
        {data ? (
          <Markdown rehypePlugins={[remarkGfm]}>
            {data.schedule}
          </Markdown>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
