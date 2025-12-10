import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BsPostcard } from "react-icons/bs";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import useFetchData from "@/hooks/useFetchData";
import DataLoading from "@/components/Dataloading";

export default function blogs(){

    // pagination
    const [currentPage, setCurrentPage ] = useState(1); // Changed from 4 to 1
    const [searchQuery, setSearchQuery] = useState('');
    // blogs per page - how many you want to show per page
    const [perpage] = useState(4);

    //fetch blogs form api endpoint with hooks
    const { alldata, loading } = useFetchData('/api/blogapi');

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // First filter published blogs
    const publishedBlogs = alldata.filter(ab => ab.status === 'publish');
    

    const allblog = publishedBlogs.length;
    
    //search function
    // First filter, then paginate
    const filteredBlog = searchQuery.trim() === '' ? publishedBlogs : publishedBlogs.filter(blog => blog.title
        .toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Calculate pagination for filtered blogs
    const indexOfFirstBlog = (currentPage - 1) * perpage;
    const indexOfLastBlog = currentPage * perpage;
    const currentFilteredBlogs = filteredBlog.slice(indexOfFirstBlog, indexOfLastBlog);

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(filteredBlog.length / perpage); i++){
        pageNumbers.push(i);
    }

    const { data: session, status } = useSession();
    const router = useRouter();
    
    useEffect(() =>{
        if(!session){
          router.push('/login')
        }
    },[session, router]);

    

    if(status === "loading") {
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading/>
            <h1>Loading</h1>
        </div>
    }
    if(session) {
        return <>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div data-aos="fade-right">
                        <h2>Todos los Blogs <span>Publicados</span></h2>
                        <h3>Panel de Admin</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-left">
                        <BsPostcard/> <span>/</span><span>Blogs</span>
                    </div>
                    </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-1" data-aos="fade-up">
                        <h2>Buscar Blogs:</h2>
                        <input type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar por titulo"/>
                    </div>

                    <table className="table table-styling" data-aos="fade-up">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Título</th>
                                <th>Slug</th>
                                <th>Editar / Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                        {loading ?
                            <>
                            <tr>
                                <td>
                                    <DataLoading/>
                                </td>
                            </tr>
                            </> : <>
                            {filteredBlog.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center">No hay Blogs publicados</td>
                                </tr>
                            ): (
                                currentFilteredBlogs.map((blog, index) => (
                                    <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><h1>{blog.title}</h1></td>
                                        <td><pre>{blog.slug}</pre></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={'/blogs/edit/' + blog._id}><button title="edit"><FaEdit/></button></Link>
                                                <Link href={'/blogs/delete/' + blog._id}><button title="delete"><RiDeleteBin6Fill/></button></Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </>
                            }
                        </tbody>
                    </table>
                
                    {filteredBlog.length > perpage && (
                        <div className="blogpagination">
                            <button 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            
                            {pageNumbers.map(number => (
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
                                disabled={currentPage === pageNumbers.length}
                            >
                                Siguiente
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>

    }
    
}