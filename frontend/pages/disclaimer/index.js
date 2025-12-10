"use client"
export default function Page() {
  return (
    <main className="background_primary min-h-screen pt-4">
      {/* Header */}
      <div className="">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-600 rounded-lg"></div>
            <span className="text-sm font-medium text uppercase tracking-wide">
              Información Legal
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text">
            Disclaimer
          </h1>

          <p className="text-lg md:text-xl text leading-relaxed max-w-2xl">
            Transparencia y claridad sobre nuestra política de afiliados y el uso de la
            información publicada.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16 lg:py-20">
        <div className="space-y-6 md:space-y-8">

          {/* Enlaces de Afiliado */}
          <div className="border-2 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">

                <div className="p-3 bg-orange-500 rounded-xl shrink-0"></div>

                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text ">
                    Enlaces de Afiliado
                  </h2>

                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text text-base md:text-lg leading-relaxed">
                      Vida Fuerte Blog participa en programas de afiliados…
                    </p>

                    <ul className="text mt-4 space-y-2">
                      <li>Los enlaces de afiliado están claramente identificados</li>
                      <li>No hay costo adicional para vos al usar nuestros enlaces</li>
                      <li>Solo recomendamos productos valiosos</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>

          

          {/* Recomendaciones de Productos */}
          <div className="border-2 hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors">
            <div className="p-6 md:p-8">

              <div className="flex items-start gap-4">

                <div className="p-3 bg-orange-500 rounded-xl shrink-0"></div>

                <div className="flex-1">
                  <h2 className="text text-2xl md:text-3xl font-boldmb-4">
                    Recomendaciones de Productos
                  </h2>

                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="text md:text-lg leading-relaxed">
                      Las recomendaciones de productos se basan en nuestra investigación la cual siempre está respaldada profesionalmente.
                    </p>

                    <ul className="text mt-4 space-y-2">
                      <li>Investigación exhaustiva</li>
                      <li>Resultados pueden variar</li>
                      <li>Investigá antes de comprar</li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
        

      </div>
    </main>
  );
}
