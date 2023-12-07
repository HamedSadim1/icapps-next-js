import { useRouter } from "next/navigation";
import StagiairOverzicht from "./components/StagiairOverzicht";
import { GetServerSideProps } from "next";

export default function Home({params: { lang}} : { params: { lang: string }}){
  return (
    <main>
      <StagiairOverzicht lang={lang}/>
    </main>
  );
}
