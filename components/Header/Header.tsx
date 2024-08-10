"use client";
import style from "@/components/Header/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname: string = usePathname();
  const isActive = (path: string) => pathname.startsWith(path);

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
        href={"/YandexMap/GetStartedYanedx"}
        className={`${style.header__link}  ${
          isActive("/YandexMap") ? style.header__link_active : ""
        } `}
      >
        {"Яндекс карты JS API v3"}
      </Link>
      <Link
        href={"/GoogleMap"}
        className={`${style.header__link} ${
          isActive("/GoogleMap") ? style.header__link_active : ""
        } `}
      >
        {"Гугл карты"}
      </Link>
      <Link
        href={"/LeafletLibrary"}
        className={`${style.header__link} ${
          isActive("/LeafletLibrary") ? style.header__link_active : ""
        } `}
      >
        {"Библиотека Leaflet"}
      </Link>
    </header>
  );
}
