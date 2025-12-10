"use client"
import Link from "next/link";
import { FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-10">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl group w-fit">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dumbbell-icon lucide-dumbbell"><path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/></svg>
                
              </div>
              <span className="text">
                Vida <span className="text-primary">Fuerte</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed text">
              Tu guía para una vida más fuerte y saludable. Rutinas, nutrición y bienestar.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="text font-semibold text-sm mb-3 sm:mb-4">Contenido</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/#blogs" className="text text-muted-foreground hover:text-primary transition-colors">
                  Artículos
                </Link>
              </li>
              <li>
                <Link href="/#categorias" className="text text-muted-foreground hover:text-primary transition-colors">
                  Categorías
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Information links */}
          <div>
            <h3 className="font-semibold text-sm mb-3 sm:mb-4 text">Información</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              <li>
                <Link href="/sobre-nosotros" className="text text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text font-semibold text-sm mb-3 sm:mb-4">Seguinos</h3>
            <div className="flex gap-3">
              <div className='st_icon'>
                    <FaPinterest />
                  </div>
                  <div className='st_icon'>
                    <FaXTwitter/>
                  </div>
                  <div className='st_icon'>
                    <FaInstagram/>
                  </div>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text text-xs sm:text-sm text-muted-foreground">
              © {currentYear} Vida Fuerte Blog. Todos los derechos reservados.
            </p>
            <p className="text text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
              Este sitio contiene enlaces de afiliado. Podemos recibir una comisión sin costo adicional para vos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}