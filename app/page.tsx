'use client'
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { YMapLoader } from "@/components/Map/YMapLoader";
import YMapContainer from "@/components/YMapContainer/YMapContainer";
export default function Home() {
  return (
    <main className={styles.main}>
      <YMapContainer/>
    </main>
  );
}
