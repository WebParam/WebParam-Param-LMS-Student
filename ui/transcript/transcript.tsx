"use client";

import { useState } from "react";
import styles from "@/styles/transcript/transcript.module.css";

const Transcript = ({currentVideo}:any) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDisplayContent = (
    text: string,
    isCollapsed: boolean,
    wordLimit = 100
  ) => {
    const lines = text.split("\n").map((line) => line.trim());
    const isLong = lines.length > wordLimit;
    const displayContent =
      isCollapsed && isLong
        ? lines.slice(0, wordLimit).join("\n") + "..."
        : text;
    return { displayContent, isLong };
  };

  const transcriptData = [
    {
      time: "00:00",
      text: "[Opening Music]\nWelcome to 'C# Essentials: Mastering the Basics.' In this introductory video, we'll explore the fundamentals of C# programming, laying the groundwork for your journey into software development.",
    },
    {
      time: "",
      text: "Hi, I'm [Instructor's Name], your guide through this course. Today, we'll cover the basics of C#, including data types, variables, and control structures.",
    },
    {
      time: "",
      text: "C# is a powerful and versatile programming language used for developing a wide range of applications, from desktop software to web applications and games.",
    },
    {
      time: "",
      text: "Throughout this course, you'll learn how to write clean, efficient code in C#, following best practices and industry standards.",
    },
  ];

  const { displayContent, isLong } = getDisplayContent(
    transcriptData.map((item) => item.text).join("\n"),
    isCollapsed
  );

  return (
    <div className="container mt-4 pb-5">
      <div className="row">
        <div className="col-md-5 mb-3">
          <h6 className="form-label fw-bold ">Transcript</h6>
        </div>
      </div>

      <div className="row mt-3">
        <div className="mb-3">
          <div className="mt-2">
            {currentVideo?.videoScript?.split('**').map((item:string) => (
                <p className="videoPar" key={item} dangerouslySetInnerHTML={{__html: item}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
