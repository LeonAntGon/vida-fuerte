import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import {  MdOutlineAddPhotoAlternate } from "react-icons/md";
import Blog from "@/components/Blog";

export default function Addblog(){
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() =>{
            if(!session){
            router.push('/login')
        }
    }, [session, router]);

    if(status === 'loading') {
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading/>
            <h1>Cargando...</h1>
        </div>
    }

    

    if(session){
        return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                    <div  data-aos="fade-left">
                        <h2>Agregar <span>Blogs</span></h2>
                        <h3>Panel de Admin</h3>
                    </div>
                    <div className="breadcrumb" data-aos="fade-right">
                        <MdOutlineAddPhotoAlternate/> <span>/</span><span>Agregar Blog</span>
                    </div>
                </div>
            </div>

            <div className="blogsadd">
                <Blog/>                 
            </div>
    </>
    }
    
}