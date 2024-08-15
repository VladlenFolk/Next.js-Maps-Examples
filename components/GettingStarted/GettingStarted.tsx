import style from "@/components/GettingStarted/GettingStarted.module.scss";
import Image from "next/image";

export default function GettingStarted() {
  return (
    <section className={style.start}>
      <h3 className={style.start__header}>Регистрация и получение ключа</h3>
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
            alt="Личный кабинет"
            width={1800}
            height={200}
          ></Image>
        </div>
        Нажимаем в верхнем правом углу кнопку {'"Подключить API"'}. Из
        предложенного списка выбираем необходимый сервис, например{" "}
        <span className={style.start__main_bold}>
          JavaScript API и HTTP Геокодер
        </span>{" "}
        (У меня уже подключено).
        <div className={style.imageContainer}>
          <Image
            src={"/StartPage/API.webp"}
            alt="Получение ключа"
            width={1800}
            height={200}
          ></Image>
        </div>
        Далее нам необходимо зайти в созданный API
        интерфейс и нажать на кнопку {'"Новый ключ"'}. Будет создан новый ключ,
        который вы будете использвать для загрузки карты в своем проекте.{" "}
        <span className={style.start__main_bold}>
          Важно! Для того чтобы карта отображалась на вашем сайте необходимо
          ввести его доменное имя в поле {'"Ограничение по HTTP Referer"'}.
        </span>{" "}
        Нажимаем кнопку изменить, после вводим доменное имя в указанное ранее
        поле.
        <div className={style.imageContainer}>
          <Image
            src={"/StartPage/change.jpg"}
            // className={style.image}
            alt="Изменяем ключ"
            width={1200}
            height={400}
          ></Image>
        </div>
        <div className={style.imageContainer}>
          <Image
            src={"/StartPage/referer-1.webp"}
            alt="Получение ключа"
            width={1000}
            height={400}
          ></Image>
        </div>
         На этом этап регистрации/получения ключа окончен.
      </div>
    </section>
  );
}
