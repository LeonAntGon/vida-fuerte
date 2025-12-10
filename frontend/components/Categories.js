"use client"
import { Card, CardContent } from "./ui/Card.js"
import Link from "next/link"

const categories = [
  {
    title: "Rutinas de Entrenamiento",
    description: "Programas diseñados para todos los niveles",
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/>
        <path d="m2.5 21.5 1.4-1.4"/>
        <path d="m20.1 3.9 1.4-1.4"/>
        <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/>
        <path d="m9.6 14.4 4.8-4.8"/>
      </svg>
    ),
    slug: "rutinas-de-entrenamiento",
    image: "https://images.unsplash.com/photo-1551984427-6d77a1918093?q=80&w=758&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Máquinas y Equipamiento",
    description: "Guías completas de uso y recomendaciones",
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="8" y="8" width="8" height="8" rx="1"/>
        <path d="M12 20v2"/>
        <path d="M12 2v2"/>
        <path d="M17 20v2"/>
        <path d="M17 2v2"/>
        <path d="M2 12h2"/>
        <path d="M2 17h2"/>
        <path d="M2 7h2"/>
        <path d="M20 12h2"/>
        <path d="M20 17h2"/>
        <path d="M20 7h2"/>
        <path d="M7 20v2"/>
        <path d="M7 2v2"/>
      </svg>
    ),
    slug: "maquinas-y-equipamiento",
    image: "https://images.unsplash.com/photo-1697490580141-a76008636dd7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Suplementos",
    description: "Todo sobre nutrición deportiva",
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
        <path d="m8.5 8.5 7 7"/>
      </svg>
    ),
    slug: "suplementos",
    image: "https://images.unsplash.com/photo-1724160167630-a33086ddb552?q=80&w=799&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Nutrición y Dietas",
    description: "Planes alimenticios para tus objetivos",
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.528V3a1 1 0 0 1 1-1h0"/>
        <path d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"/>
      </svg>
    ),
    slug: "nutricion-y-dietas",
    image: "https://cdn.pixabay.com/photo/2017/04/18/07/47/coffee-2238110_1280.jpg",
  },
  {
    title: "Libros y Conocimiento",
    description: "Recursos para profundizar tu aprendizaje",
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 7v14"/>
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
      </svg>
    ),
    slug: "libros-y-conocimiento",
    image: "https://cdn.pixabay.com/photo/2016/11/22/21/33/christmas-background-1850645_1280.jpg",
  },
  {
    title: "Vida Saludable",
    description: "Bienestar integral y hábitos positivos",
    icon: (props) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
      </svg>
    ),
    slug: "vida-saludable",
    image: "https://cdn.pixabay.com/photo/2019/11/11/12/12/woman-4618189_1280.jpg"
  },
]

export default function Categories() {
  return (
    <section id="categorias" className="py-12 sm:py-16 md:py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl text-balance text">
            Explorá por categoría
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed text">
            Encontrá contenido especializado para cada área de tu entrenamiento y bienestar
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <Link key={category.slug} href={`/categoria/${category.slug}`} className="group">
                <Card className="h-full overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 active:scale-98">
                  <CardContent className="relative p-0 h-56 sm:h-64 md:h-72">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${category.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 group-hover:from-black/80 transition-colors duration-300" />
                    </div>
                    {/* </CHANGE> */}
                    <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 text-white">
                      <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-primary/90 text-white mb-3 sm:mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300 shadow-lg bg-[#f97316]">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <h3 className="text-lg sm:text-xl font-bold group-hover:text-[#f97316] transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/90 leading-relaxed">{category.description}</p>
                      </div>
                      <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Explorar</span>
                        <svg
                          className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
