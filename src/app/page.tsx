import { Elements } from "./component/Elements";
import { SignPdf } from "./component/SignPdf";



export default function Home() {
  return (
    <main className="grid place-items-center pt-8">
      <SignPdf/>
    </main>
  );
}