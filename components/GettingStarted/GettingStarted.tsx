import style from "@/components/GettingStarted/GettingStarted.module.scss";
import Image from "next/image";

export default function GettingStarted() {
  return (
    <section className={style.start}>
      <h3 className={style.start__header}>Начало работы</h3>
      <div className={style.start__main}>
        Для начала необходимо зарегестрироваться в Яндекс ID по адресу{" "}
        <a className={style.start__main_link} href="https://id.yandex.ru/">
          id.yandex.ru
        </a>
        .
        <div className={style.imageContainer}>
          <Image
            src={"/StartPage/YID.webp"}
            alt="Яндекс ID"
            className={style.image}
            width={1800}
            height={400}
          ></Image>
        </div>
        Данный шаг позволит вам пользоваться инструментами яндекса,
        расположенными по адресу{" "}
        <a
          className={style.start__main_link}
          href="https://yandex.ru/maps-api/"
        >
          yandex.ru/maps-api/
        </a>
        . Переходим в кабинет.
        <div className={style.imageContainer}>
          <Image
            src={"/StartPage/Cabinet.webp"}
            alt="Яндекс ID"
            // className={style.cabinetImage}
            width={1800}
            height={200}
          ></Image>
        </div>
        Нажимаем в верхнем правом углу кнопку "Подключить API". Из предложенного списка выбираем необходимый сервис, например{" "}
        <span className={style.start__main_bold}>Static API Яндекс.Карт</span>.
      </div>
    </section>
  );
}
