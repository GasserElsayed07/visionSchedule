"use client";
import "./global.css";
import Markdown from "react-markdown";
import React, { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function Page() {
  const [data, setData] = useState(null);

  //const [prompt, setPrompt] = useState(""); // No Use :|
  const [tasks, setTasks] = useState([]) // holds the tasks the user inputs
  const [visions, setVisions] = useState([]) // holds the visions the user inputs
  const [date, setDate] = useState() // holds the date the user inputs
  const [personal, setPersonal] = useState("")


  function getResponse() {
    const fetchData = async () => {
      console.log("fetchData ran");
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates a structured daily schedule for today based on user visions, tasks, personal information and a selected date."
            },
            {
              role: "user",
              content: `My visions are: ${visions.join(", ")}.`,
            },
            {
              role: "user",
              content: `My tasks are: ${tasks.join(", ")}.`,
            },
            {
              role: "user",
              content: `Today's date is: ${date}. Please generate a schedule.`,
            },
            {
              role: "user",
              content: `My personal information are: ${personal}.`,
            }
          ]
        }),
      });
      const result = await res.json();
      setData(result);
    };

    fetchData();
  } // end of zeft

  function print() {
    console.log("get a schedule ran");
  }

  function addVision(formData) {
    const newVision = formData.get("vision");
    setVisions((prev) => { return ([...prev, newVision]) })
    console.log("test vision input, newVision: " + newVision);
  }

  function addTasks(tasksFormData) {
    const newTask = tasksFormData.get("task");
    setTasks((prev) => [...prev, newTask]);
    console.log("newTask to be added is" + newTask);
  }

  function addPersonal(personalFormData){
    const newPersonal = personalFormData.get("personal");
    setPersonal((prev) => [...prev,newPersonal]);
    console.log(personal);
  }
  const visionMap = visions.map((value, index) => {
    return (
      <h3 key={index} className="vision">{value}</h3>
    )
  })

  const tasksMap = tasks.map((value, index) => {
    return (
      <h3 key={index} className="task">{value}</h3>
    )
  })



  return (
    <div className="allTheSHIT bg-yellow-300">

      <div className="visions">
        <form action={addVision}>
          <div>

            <input type="text" name="vision" />
            <button>add vision</button>

          </div>
        </form>
          {visionMap}
        <form action={addPersonal}>

          <div>

            <input type="text" name="personal" />
            <button>add personal information</button>

          </div>

        </form>

        
      </div>

      <div className="schedule">
        <h1>Your Schedule</h1>
        <button onClick={getResponse}>get a schedule</button>
        <Markdown>{data?.schedule}</Markdown>
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