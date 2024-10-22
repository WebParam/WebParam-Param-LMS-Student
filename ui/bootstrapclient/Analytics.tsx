"use client";

import { useEffect } from 'react'
import Hotjar from '@hotjar/browser'
import { GoogleAnalytics } from 'nextjs-google-analytics';


const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID
const HOTJAR_VERSION = process.env.NEXT_PUBLIC_HOTJAR_VERSION


export default function Analytics() {
    useEffect(() => {
      if (HOTJAR_ID && HOTJAR_VERSION) {
        Hotjar.init(parseInt(HOTJAR_ID), parseInt(HOTJAR_VERSION))
      }
    }, [])
  
    return (
      <>
        <GoogleAnalytics trackPageViews />
      </>
    );
  }