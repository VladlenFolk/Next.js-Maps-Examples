import SideBar from "@/components/SideBar/SideBar";
export default function YandexMap({ children }: { children: React.ReactNode }) {
  return (
    <section className="YandexMap" style={{display:"flex"}}>
    <SideBar/>
      {children}
    </section>
  );
}
