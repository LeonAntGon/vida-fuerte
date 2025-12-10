import Blog from '@/components/Blog';
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState} from "react";
import Loading from '@/components/Loading';
import { BsPostcard } from "react-icons/bs"; // Fix import
import Head from "next/head"; // Fix Head import

export default function Delete(){

    // login first
    const { data: session, status } = useSession();
    const router = useRouter();
    
    useEffect(() =>{
        // check if there's no active session and redirect to login page
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


    // blog edit functionality
    const { id } = router.query;
    
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if(!id){
            return;
        } else {
            axios.get('/api/blogapi?id=' + id).then((response) => {
                setProductInfo(response.data);
            })
        }
    },[id]);
    //cancel the delete and go back to the blog dashboard
    async function goback(){
        router.push("/")
    } 
    // delete the blog 
    async function deleteOneBlog(){
        await axios.delete('/api/blogapi?id=' + id);
        goback();
        
    }

    if(session){
        return <>
            <Head>
                <title>Eliminar Blog</title> {/* Fix title */}
            </Head>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Eliminar <span>{productInfo?.title}</span></h2>
                        <h3>Admin Panel</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard/> <span>/</span><span>Eliminar Blog</span>
                    </div>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                <svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 24 24"><path fill="#FF0000" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    <p className='cookieHeading'>Estás seguro crack?</p>
                    <p className="cookieDescription">Si eliminas el blog el efecto es permanente.</p>
                    <div className="buttonContainer">
                        <button onClick={deleteOneBlog} className="acceptButton">Eliminar</button>
                        <button onClick={goback} className="declineButton">Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    }
}
