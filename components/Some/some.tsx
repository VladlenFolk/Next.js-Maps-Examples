'use client'
import dynamic from "next/dynamic";

const Map = dynamic(async () => import("@/components/Map/Map"), {
  ssr: false,
});

export default function Some() {
  return <Map />;
}
