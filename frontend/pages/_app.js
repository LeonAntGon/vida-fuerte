import Header from "@/components/Header";
import Aos from "@/components/Aos";
import Footer from "@/components/Footer";
import ScrollToTopBtn from "@/components/ScrollToTopBtn";
import TopLoadingLine from "@/components/TopLoadingLine";
import "@/styles/globals.css";


import localFont from 'next/font/local'


const chivo = localFont({
  src: '../public/fonts/text/Chivo-VariableFont_wght.ttf',
  variable: '--font-chivo',
})

const gambetta = localFont({
  src: '../public/fonts/titles/Gambetta-Variable.ttf',
  variable: '--font-gambetta',
})

export default function App({ Component, pageProps }) {
  return (
    // PASO 3: Inyectar las variables en un contenedor que envuelva TODO
    // Cambié el fragmento <> por un <div> para poder pasarle las clases
    <div className={`${chivo.variable} ${gambetta.variable} font-sans`}>
      <Header />
      <main>
        <TopLoadingLine/>
        <Aos>
          <Component {...pageProps} />
        </Aos>
        <ScrollToTopBtn/>
      </main>
      <Footer/>
    </div>
  );
}