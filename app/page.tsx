import Link from 'next/link';
import Image from "next/image";
import { lusitana } from './ui/fonts';
import Cartas from "./ui/components/Cartas";
import Mision from "./ui/components/mision";

export default function HomePage() {
  return (
    <>
      <div className="min-h-full">
        < main className="flex min-h-screen flex-col p-6" >
          <div className="mt-4 flex grow flex-col gap-4 md:flex-row justify-between">
            <div className="flex flex-col justify-center gap-6 rounded-3xl bg-gray-50 bg-opacity-30 px-6 py-10 md:w-3/5 md:px-20 m-6">
              <div />
              <p
                className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                <strong>HAGA REALIDAD SUS IDEAS CON NUESTRA PLATAFORMA DE FINANCIACIÓN COLECTIVA.</strong>
              </p>
              <p>
                Lanza y gestiona fácilmente tu campaña de crowdfunding. Conéctese con patrocinadores, realice un seguimiento del progreso y convierta su visión en realidad.
                <br />
                Además, puedes convertirte también en un patrocinador
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  href="/login"
                  className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
                  <span>Empezar Campaña</span>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
                  <span>Explorar y Donar</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 md:w-4/5 md:px-28 md:py-12">
              <Image
                src="/productor.webp"
                width={1000}
                height={760}
                className="hidden md:block rounded-3xl"
                alt="Screenshots of the dashboard project showing desktop version"
                priority= {true}
              />
              <Image
                src="/productor.webp"
                width={560}
                height={620}
                className="block md:hidden rounded-3xl"
                alt="Screenshot of the dashboard project showing desktop version"
                priority= {true}
              />
            </div>
          </div>
          <div className='z-50'>
            <br /><br />
            <Cartas />
            <br /><br />
            <Mision />
          </div>
        </main>
      </div>
    </>
  )
}