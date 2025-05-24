"use client";
import "./global.css";
import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";

export default function Page() {
  const [data, setData] = useState(null);

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
  } // end of zeft

  function addVision(formData){
    const newVision = formData.get("vision");
    console.log("test vision input, newVision: " + newVision);
  }
  
  return (
    <div className="allTheSHIT">

      <div className="vision">
        <form action={addVision}>
          <input type="text" name="vision"></input>
          <button>add vision</button>
        </form>
      </div> 

      <div className="schedule">
        <h1>Your Schedule</h1>
      </div>

      <div className="input">

        <form>
          <input type="text" name="task"></input>
          <button>enter task</button>
        </form>

        <form>
          <input type="text" name="date"></input>
          <button>enter date</button>
        </form>
      </div>
    </div>
  );
}
