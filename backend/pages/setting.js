import Loading from "@/components/Loading";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router"; 
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Setting(){
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() =>{
        // check if there's no active session and redirect to login page
        if(!session){
          router.push('/login')
        }
      },[session, router]);

    if(status == "loading") {
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading/>
            <h1>Loading...</h1>
        </div>
    }

    async function logOut(){
        await router.push('/login')
        await signOut();
      }

    if (session) {
        return <>
        <div className="settingpage">

        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>Panel del <span>Configuracionse</span></h2>
            <h3>PANEL DE ADMINISTRADOR</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <IoSettingsOutline/> <span>/</span><span>Configuración</span>
          </div>
        </div>

        <div className="profilesettings">
            <div className="leftprofile_details flex" data-aos="fade-up">
                {/* una imagen de un coder */}
                <div className="w-100">
                    <div className=" flex flex-sb flex-left mt-2">
                        <h2>Perfil:</h2>
                        <h3>Acá ira info del perfil</h3>
                    </div>
                    <div className="flex flex-sb mt-2">
                        <h3>Número:</h3>
                        <input type="text" defaultValue={+543813380751}/>
                    </div>

                    <div className="mt-2">
                        <input type="email" defaultValue="leonarddevweb@gmail.com"/>
                    </div>
                    <div className="flex flex-center w-100 mt-2">
                        <button>Guardar</button>

                    </div>
              
                </div>

            </div>

            <div className="rightlogoutsec" data-aos="fade-up">
                <div className="topaccoutnbox">
                    <h2>Mi cuenta <MdOutlineAccountCircle/></h2>
                    <hr />

                    <div className="flex flex-sb mt-1">
                        <h3>Cuenta activa <br /> <span>Email</span></h3>
                        <button onClick={logOut}>Cerrar session</button>

                    </div>
                </div>
            </div>
        </div>

        </div>
        </>
    }

    return <>

    </>
}