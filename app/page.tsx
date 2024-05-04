"use client";
import styles from "./page.module.css";
import YMapContainer from "@/components/YMapContainer/YMapContainer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <YMapContainer />
      </main>
    </>
  );
}
