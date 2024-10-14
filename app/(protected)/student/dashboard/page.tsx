"use client";

import Link from "next/link";
import Sor from "./sor/page";
import Analytics from "./analytics/page";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "analytics";

  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.replace("/student/dashboard?tab=analytics");
    }
  }, [searchParams, router]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="content" data-aos="fade-down">
      <div className="section-title">
        <ul
          className="nav nav-tabs tab-button-style-2 justify-content-start"
          id="reviewTab-4"
          role="tablist"
        >
          <li role="presentation">
            <Link
              href="/student/dashboard?tab=analytics"
              onClick={(e) => {
                e.preventDefault();
                router.push("/student/dashboard?tab=analytics");
              }}
              className={`tab-button ${tab === "analytics" ? "active" : ""}`}
              id="received-tab"
              data-bs-toggle="tab"
              data-bs-target="#received"
              role="tab"
              aria-controls="received"
              aria-selected={tab === "analytics"}
            >
              <span className="title">Analytics</span>
            </Link>
          </li>
          <li role="presentation">
            <Link
              href="/student/dashboard?tab=sor"
              onClick={(e) => {
                e.preventDefault();
                router.push("/student/dashboard?tab=sor");
              }}
              className={`tab-button ${tab === "sor" ? "active" : ""}`}
              id="given-tab"
              data-bs-toggle="tab"
              data-bs-target="#given"
              role="tab"
              aria-controls="given"
              aria-selected={tab === "sor"}
            >
              <span className="title">SOR</span>
            </Link>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {tab === "analytics" && <Analytics />}
        {tab === "sor" && <Sor />}
      </Suspense>
    </div>
  );
}

export default function PageAnalytics() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
