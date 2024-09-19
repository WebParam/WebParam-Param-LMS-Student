"use client";

import { useEffect, useState } from "react";
import LessonSidebar from "@/ui/lesson/Lesson-sidebar";
import styles from "@/ui/lesson/lesson-home/scroll.module.css";
import "@/public/scss/styles.scss";
import { VideoProvider } from "@/context/video-context/video-context";

export default function LessonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeElement, setActiveElement] = useState<any>();

  function handleElementChange(element:any) {
    setActiveElement(element)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <VideoProvider>
          <div className={styles.innerScrollable}>{children}</div>
    </VideoProvider>
  );
}
