"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Courses from "@/data/dashboard/instructor/instructor.json";
import { useLessonContext } from "@/context/lesson-context/lesson-context";
import "./courseStyle.scss";
import courseImage from "./courseImage.jpeg";
import "@/styles/css/plugins/mainstyle.css";

interface UnitData {
  id: string;
  title: string;
  moduleCode?: string;
}

interface Props {
  data: UnitData;
  courseStyle: string;
  isProgress: boolean;
  isCompleted: boolean;
  isEdit: boolean;
  showDescription: boolean;
  showAuthor: boolean;
}

const UnitStandardWidget: React.FC<Props> = ({data, courseStyle, isProgress,}) => {
    // Set a random number when the component mounts
    const generateRandomVideoCount = () => {
      return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    };

    console.log("data: ", data);


  return (
    <>
      <div className="rbt-card variation-01 rbt-hover" style={{ display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <div className="rbt-card-img">
          <Link
            href={{
              pathname: '/take-lesson',
              query: { moduleId: `${data.id}` },
            }}
          >
            <Image
              width={330}
              height={227}
              src={courseImage.src}
              alt={data.title}
            />
          </Link>
          
        </div>
        
        <div className="rbt-card-body" style={{paddingTop:'0 !important'}}>
          {courseStyle === "two" && (
              <h4
                className="rbt-card-title"
                style={{ fontSize: "1.2em", margin:'0'}}
              >
                <Link
                  href={{
                    pathname: '/take-lesson',
                    query: { moduleId: `${data.id}` },
                  }}
                >
                  {data.title}
                  
                </Link>
              </h4>
          )}
          <ul className="rbt-meta mt-3">
            <li>
              <i className="feather-book" />
              {data?.moduleCode}
            </li>
            <li>
              <i className="bi bi-play-circle-fill" />
              {generateRandomVideoCount()} Videos
            </li>
          </ul>

          {isProgress ? (
            <>
              <div className="rbt-card-bottom">
                <button
                  className={`bi bi-play rbt-btn bg-primary-opacity w-100 text-center continue-watching`}
                  style={{padding:'0 !important'}}
                >
                  <Link href={{
                    pathname: '/take-lesson',
                    query: { moduleId: `${data.id}` },
                  }}>
                    Continue Watching</Link>
                </button>
              </div>
            </>
          ) : (
            ""
          )}

        </div>
      </div>
    </>
  );
};

export default UnitStandardWidget;
