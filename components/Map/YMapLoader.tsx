import Script from "next/script";

export const YMapLoader = () => {
  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.MAP_KEY}&lang=ru_RU`}
        strategy="beforeInteractive"
      />
    </>
  );
};
