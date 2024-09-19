"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/ui/loader/loader";
import styles from "@/styles/enrolled-courses/enrolled-courses.module.css";
import { getAlltUnitStandards } from "@/actions/unit-standards/get-unit-standards";
import { UnitStandardData } from "@/interfaces/enrolled-unit-standards/unit-standards/unit-standards";
import UnitStandardWidget from "@/ui/student/enrolled/sample-unit";
import { useRouter } from "next/navigation";
import { useCourseId } from "@/context/courseId-context/courseId-context";

export default function Enrolled() {
  const { courseId } = useCourseId();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [unitStandards, setUnitStandards] = useState<UnitStandardData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isProgress, setIsProgress] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const [courseStyle, setCourseStyle] = useState("two");
  

  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  console.log("courseId from context: ", courseId);


  const getUnitStandards = async (courseId: string) => {
    setLoading(true);
    setError(null);
  

    try {
      const data = await getAlltUnitStandards(courseId);
      console.log("get data: ", data);
      setUnitStandards(data);
   
      setLoading(false);
      router.push('/student/enrolled-courses?tab=enrolled');
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  
  
  useEffect(() => {
    
    // const courseId = localStorage.getItem("courseId") ?? "";
    if (process.env.NEXT_PUBLIC_DEMO) {
      if (courseId) {
        getUnitStandards(courseId);
      }
    } else {
      const courseId = process.env.NEXT_PUBLIC_COURSE_ID??"";
      getUnitStandards(courseId);
    }

  }, [courseId]);
  

  if (loading) {
    return <Loader />;
  } else {
  }



    return (
        <div
              className="tab-pane fade active show"
              id="home-4"
              role="tabpanel"
              aria-labelledby="home-tab-4"
            >
              <div className="row g-5">
                {unitStandards?.map((standard, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    key={`unit-standard-completed-${index}`}
                  >
                    <UnitStandardWidget
                      data={standard}
                      courseStyle={courseStyle}
                      isProgress={isProgress}
                      isCompleted={isCompleted}
                      showDescription={showDescription}
                      isEdit={isEdit}
                      showAuthor={showAuthor}
                    />
                  </div>
                ))}
              </div>
            </div>
    )
}