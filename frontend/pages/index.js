import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import useFetchData from "@/hooks/useFetchData";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories"

export default function Home() {

  const [currentPage, setCurrentPage] = useState(1); // page number
  const [perPage] = useState(12); // seis blogs por página

  const { alldata, loading } = useFetchData('/api/getblog');

  // function to handle page change
  const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);

  // Cuando la página cambia, scrollea a #category
  const el = document.getElementById("blogs");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

  // Primero filtrar blogs publicados
  const publishedBlogs = alldata.filter(ab => ab.status === "publish");
  
  // Luego calcular la paginación
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = publishedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  
  // Usar length de publicados para el total de páginas
  const totalPages = Math.ceil(publishedBlogs.length / perPage);
  
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

    function extractFirstImageUrl(markdownContent){
      // check if markdownconetnt is provided and non-empty
      if(!markdownContent || typeof markdownContent !== 'string'){
        return null;
      }

    // regular expression to match image urls in markdown format ![alt text](imageurl)
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
    
  }

  function truncateText(text, maxLength = 120) {
    if (!text || typeof text !== 'string') return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }


  
  return (
    <>
      <Head>
        {/* Metadatos específicos para la página de inicio */}
        <title>Vida fuerte</title>
        <meta name="description" content="Bienvenido a mi blog personal donde comparto mis experiencias y conocimientos" />
        <meta property="og:title" content="Inicio - Mi Blog Personal" />
        <meta property="og:description" content="Bienvenido a mi blog personal donde comparto mis experiencias y conocimientos" />
      </Head>

      <Hero/>

      <Categories id="categorias"/>
      
      <section className='main_blog_section'>
        <div className='container '>
          <div className='leftblog_sec' id="blogs">
            <h2>Blogs</h2>
            <div className='blogs_sec lg:flex gap-2'>
            {loading ? <div className='wh-100 flex flex-center mt-2 pb-5'>
              <div className='loader'></div>
            </div> : <>
            {currentBlogs.map((blog) => {
              //in the markdown content first image show here
              const firstImageUrl = extractFirstImageUrl(blog.description);
              return <div className='blog' key={blog._id}>
                <div className='blogimg'>
                  {/*If not image in markdown show no image */}
                  <Link href={`/blog/${blog.slug}`}>
                    <img src={firstImageUrl || "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_1280.png"} alt={blog.title} />
                  </Link>
                </div>
                <div className="bloginfo">
                  <Link href={`/tag/${blog.tags[0]}`}>
                    <div className="blogtag">{blog.tags[0]}</div>
                  </Link>
                  <Link href={`/blog/${blog.slug}`}><h3>{blog.title}</h3></Link>
                  <p>
                      {truncateText(
                        blog.description
                          .replace(/!\[/g, '[')           // elimina el ! si va justo antes de [
                          .replace(/\[.*?\]/g, '')        // elimina todo lo que esté entre [ ]
                          .replace(/\(.*?\)/g, '')        // elimina todo lo que esté entre ( )
                          .replace(/[#_*~`>\\\-]/g, ''),  // elimina caracteres markdown comunes
                        140
                      )}
                    </p>
                    <div className='blogauthor flex gap-1 pt-1 border-t-[0.5px] border-gray-400'>
                      <div className="flex flex-col flex-left gap-05 py-3 ">
                        <div className="flex items-center gap-[2px]">
                          <svg  className="translate-y-[-5px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#7e7e7e" d="M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7z" stroke-width="0.4" stroke="#7e7e7e"/></svg>
                            <p className='text-[2rem] text leading-none'>{blog.readingTime} min</p> 
                          </div>
                        
                        <span>{new Date(blog.createdAt).toLocaleDateString('es-AR', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                    </div>
                </div>
              </div>
            })}
            </>
              
            }
          </div>

          <div className="blogpagination">
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previo
            </button>

            {pageNumbers
              .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
              .map(number => (
                <button 
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
            ))}

        <button 
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBlog >= publishedBlogs.length}
        >
          Siguiente
        </button>
      </div>



          </div>
         
        </div>
        
      </section>

      

    
    </>
  );
}
