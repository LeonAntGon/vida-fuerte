import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function CategoryPage(){
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // page number
    const [perPage] = useState(3); // tres blogs por página
    const [blog, setBlog] = useState([])
    const router = useRouter();

    const { category } = router.query;

    useEffect(() => {
        const fetchBlogdata = async () => {
            try {
                const res = await axios.get(`/api/getblog?blogcategory=${category}`)
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching blog data ', error);
                setLoading(false)
            }
        }

        //fetch blog data only if catagory exists
        if(category){
            fetchBlogdata();
        } else {
            //router.push('/400');
        }

    }, [category]);

    //function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const publishedBlogs = blog.filter(ab => ab.status === 'publish');

    // Luego hacer la paginación con los blogs filtrados
    const indexOfLastBlog = currentPage * perPage;
    const indexOfFirstBlog = indexOfLastBlog - perPage;
    const currentBlogs = publishedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    

    const allblog = blog.length;

    const pageNumbers = [];
    for(let i = 1; i < Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

        // Primero filtrar los blogs publicados
    

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
    
    const totalArticulos = currentBlogs?.filter(blog => blog.blogcategory)?.length || 0;


    return <>
      <div className="blogpage">
        <div className="category_slug">
            <div className="container">
                <div className="category_title">
                    <div className="flex items-center flex-wrap flex-col gap-1">
                    <h1>{loading ? "Loading..." : category}</h1>

                    <span>
                        {loading ? "Total de artículos: 0" : `Total de artículos: ${totalArticulos}`}
                    </span>
                    </div>
                </div>
                
                <div className="category_blogs mt-3">
                    {loading ? <>
                    <div className="wh-100 flex flex-center mt-2 pb-5">
                        <div className="loader"></div>
                    </div>
                    </> : <>

                    {currentBlogs.map((item) => {
                     //in the markdown content first image show here
                        const firstImageUrl = extractFirstImageUrl(item.description);
                        return <div className='cate_blog' key={item._id}>
                
                        {/*If not image in markdown show no image */}
                        <Link href={`/blog/${item.slug}`}>
                            <img src={firstImageUrl || "https://cdn.pixabay.com/photo/2015/03/25/13/04/page-not-found-688965_1280.png"} alt={blog.title} />
                        </Link>
                
                        <div className="bloginfo mt-2">
                        <Link href={`/tag/${item.tags[0]}`}>
                            <div className="blogtag">{item.tags[0]}</div>
                        </Link>
                        <Link href={`/blog/${item.slug}`}><h3>{item.title}</h3></Link>
                        <p>
                            {truncateText(
                                item.description
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
                                <p className='text-[2rem] text leading-none'>{item.readingTime} min</p> 
                            </div>
                        <span>{new Date(item.createdAt).toLocaleDateString('es-AR', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>

                    </div>

                        </div>
                      </div>
                    })}

                    </>}

                </div>
                <div className="blogpagination">
                        <div className="blogpagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(
                              number => (
                                <button key={number} onClick={() => paginate(number)} className={currentPage === number? 
                                  'active' : ''}>{number}</button>
                              ))}
                              <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastBlog >= publishedBlogs.length}>Next</button>
                        </div>
          
                </div>
            </div>

        </div>
      </div>
    </>
}