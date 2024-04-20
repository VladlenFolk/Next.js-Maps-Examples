// 'use client'
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { YMapLoader } from "@/components/Map/YMapLoader";
import Some from "@/components/Some/some";
export default function Home() {
  return (
    <main className={styles.main}>
      <Some />
      <YMapLoader />
    </main>
  );
}
