import  Button  from "./ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://cdn.pixabay.com/photo/2017/04/27/08/29/man-2264825_1280.jpg" 
          alt="" 
          className="w-full h-full object-cover" 
        />
        {/* Dark overlay for text readability */}
         <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/70 to-black/20 z-0" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance text-white leading-tight">
              Tu guía para una vida más <span className="text-primary">fuerte</span> y{" "}
              <span className="text-primary">saludable</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl">
              Descubrí rutinas, suplementos, dietas y herramientas para transformar tu cuerpo y tu mente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">              
              <Button  as="a" href="#category" color="#f97316" className="ml-2 py-5 px-3 ">
                <span className="font-bold text-[1rem]">Explorar artículos</span>

                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="12" viewBox="0 0 16 9"
                className="ml-1 h-5 w-5">
                  <path fill="#fff" d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5"/><path fill="#fff" d="M10 8.5a.47.47 0 0 1-.35-.15c-.2-.2-.2-.51 0-.71l3.15-3.15l-3.15-3.15c-.2-.2-.2-.51 0-.71s.51-.2.71 0l3.5 3.5c.2.2.2.51 0 .71l-3.5 3.5c-.1.1-.23.15-.35.15Z"/>
                </svg>
                </Button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  )
}
