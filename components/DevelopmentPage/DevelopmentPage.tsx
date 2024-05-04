import style from "@/components/DevelopmentPage/DevelopmentPage.module.scss";
import Image from "next/image";

export default function DevelopmentPage() {
  return (
    <section className={style.development}>
      <div className={style.development__contentContainer}>
        <Image
          src={"/development.png"}
          alt={"Страница в разработке"}
          width={100}
          height={100}
          className={style.development__image}
        />
        <p className={style.development__text}>
          {"Страница на данный момент находится на стадии разработки"}
        </p>
      </div>
    </section>
  );
}