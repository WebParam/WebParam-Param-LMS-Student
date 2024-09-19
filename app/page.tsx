'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./page.module.css";
import { CourseIdProvider } from "@/context/courseId-context/courseId-context";
import Banner from "../ui/maintenance/Banner";
import { useDeploymentTime } from "./Utils/useDeploymentTime";

export default function Home() {
  const router = useRouter();
  const { showBanner, checkDeploymentTime } = useDeploymentTime();
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });

    if (!initialized) {
      setInitialized(true);
      return;
    }

    if (!checkDeploymentTime()) {
      router.push("/login");
    }

  }, [router, checkDeploymentTime, initialized]);

  return (
    <NextUIProvider>
      <CourseIdProvider>
        <Banner />
        <main className={styles.main}>
          {/* Your other content here */}
        </main>
      </CourseIdProvider>
    </NextUIProvider>
  );
}