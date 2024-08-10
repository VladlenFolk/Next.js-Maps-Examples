"use client";
import styles from "./page.module.css";
import YMapContainer from "@/components/YMapContainer/YMapContainer";
import Greating from "@/components/Greating/Greating";
import SideBar from "@/components/SideBar/SideBar";

export default function Home() {
  return (
    <>
     
      <main className={styles.main}>
       
        <Greating />
        <YMapContainer />
      </main>
    </>
  );
}
