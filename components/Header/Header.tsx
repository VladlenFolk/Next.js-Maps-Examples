import style from "@/components/Header/Header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

  return (
    <header className={style.header}>
      <Link href={"/"} className={`${style.header__link} `}>
        <Image src={pathname === '/' ? '/home.png' : '/home-active.png'} width={50} height={50} alt={"На главную"} />
      </Link>
      <Link href={'/YandexMap'}>{"Яндекс карты JS API v3"}</Link>
      <Link href={'/google'}>{"Гугл карты"}</Link>
      <Link href={'/leaflet'}>{"Библиотека Leaflet"}</Link>
    </header>
  );
}
