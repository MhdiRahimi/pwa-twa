"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

interface ContentData {
  features: string[];
  timestamp: string;
}

export default function Home() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/content/home");
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/PWADemo.apk">install App TWA version 2.2.4</Link>
    </div>
  );
}
