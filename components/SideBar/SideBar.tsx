import style from "@/components/SideBar/SideBar.module.scss";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className={style.container}>
      <ul className={style.container__list}>
        <li className={style.container__theme}>
          {" "}
          <Link  href={"/YandexMap/GetStartedYanedx"}>
            Начало работы
          </Link>
        </li>
        <li className={style.container__space}></li>
        <li className={style.container__theme}>
          {" "}
          <Link  href={"/YandexMap/YMapCluster"}>
            Группировка кластеров
          </Link>
        </li>
      </ul>
    </div>
  );
}
