"use client";
import "./global.css";
import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function Page() {
  const [data, setData] = useState(null);

  const [tasks, setTasks] = useState([])
  const [visions, setVisions] = useState([])
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


  const visionMap = visions.map((value, index) => {
    return (
      <h3 key={index} className="vision">{value}</h3>
    )
  })

  function addVision(formData) {
    const newVision = formData.get("vision");
    setVisions((prev) => { return ([...prev, newVision]) })
    console.log("test vision input, newVision: " + newVision);
  }


  const tasksMap = tasks.map((value, index) =>{
    return (
      <h3 key={index} className="task">{value}</h3>
    )
  })

  function addTasks(tasksFormData) {
    const newTask = tasksFormData.get("task");
    setTasks((prev) => [...prev, newTask]);
    console.log("newTask to be added is" + newTask);
  }

  const [date, setDate] = useState()

  return (
    <div className="allTheSHIT bg-yellow-300">

      <div className="visions">
        <form action={addVision}>
          <input type="text" name="vision" />
          <button>add vision</button>
        </form>

        {visionMap}
      </div>

      <div className="schedule">
        <h1>Your Schedule</h1>
      </div>

      <div className="input">

        <form action={addTasks}>
          <input type="text" name="task" />
          <button>enter task</button>
        </form>

        <form>
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Click to select a date"
          />
          <button>enter date</button>
        </form>

        <div className="tasks">
          {tasksMap}
        </div>

        <div className="date">
          {date
            ? date.toDateString() // e.g., "Mon Jun 01 2025"
            : "No date selected"}
        </div>

      </div> {/*end of input div*/}
    </div>
  );
}
