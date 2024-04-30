import Script from "next/script";

export const YMapLoader = () => {
  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/v3/?apikey=${`cf8bccf1-5619-40e7-b016-0d7a5f133142`}&lang=ru_RU`}
        strategy="beforeInteractive"
      />
    </>
  );
};
