"use client";
import style from "@/components/Header/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={style.header}>
      <Link href={"/"} className={`${style.header__link} `}>
        <Image
          src={pathname === "/" ? "/home-active.png" : "/home.png"}
          width={50}
          height={50}
          alt={"На главную"}
        />
      </Link>
      <Link
        href={"/YandexMap"}
        className={`${style.header__link} ${
          pathname === "/YandexMap" ? style.header__link_active : ""
        } `}
      >
        {"Яндекс карты JS API v3"}
      </Link>
      <Link
        href={"/GoogleMap"}
        className={`${style.header__link} ${
          pathname === "/GoogleMap" ? style.header__link_active : ""
        } `}
      >
        {"Гугл карты"}
      </Link>
      <Link
        href={"/LeafletLibrary"}
        className={`${style.header__link} ${
          pathname === "/LeafletLibrary" ? style.header__link_active : ""
        } `}
      >
        {"Библиотека Leaflet"}
      </Link>
    </header>
  );
}
