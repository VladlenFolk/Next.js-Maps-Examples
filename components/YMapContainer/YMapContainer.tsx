"use client";
import dynamic from "next/dynamic";
import style from "@/components/YMapContainer/YMapContainer.module.scss";


const Map = dynamic(async () => import("@/components/Map/Map"), {
  ssr: false,
});

export default function YMapContainer() {
  return (
    <div className={style.container}>
      <Map />
    </div>
  );
}
