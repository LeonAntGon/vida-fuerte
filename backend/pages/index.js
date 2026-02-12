import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Estados
  const [blogsData, setBlogsData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Opciones de la gráfica
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs creados mensualmente por año',
      },
    }
  };

  useEffect(() =>{
    if (status === "unauthenticated") {
      router.push('/login');
    }
  },[status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;

    (async () => {
      try {
        const res = await fetch('/api/blogapi');
        if (!res.ok) {
          console.error("Error fetching blogapi:", res.status);
          return;
        }
        const data = await res.json();
        setBlogsData(data || []);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    })();
  }, [status]);

  // Lógica para la Gráfica
  useEffect(() => {
    if (!blogsData || blogsData.length === 0) {
      setChartData({
        labels: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
        datasets: []
      });
      return;
    }

    const monthlydata = blogsData
      .filter(dat => dat.status === "publish")
      .reduce((acc, blog) => {
        const year = new Date(blog.createdAt).getFullYear();
        const month = new Date(blog.updatedAt).getMonth();
        acc[year] = acc[year] || Array(12).fill(0);
        acc[year][month]++;
        return acc;
      }, {});

    const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
      "Octubre", "Noviembre", "Diciembre"];

    const years = Object.keys(monthlydata);
    const datasets = years.map(year => ({
      label: year,
      data: monthlydata[year] || Array(12).fill(0),
      backgroundColor: `rgba(${Math.floor(Math.random() * 155 + 80)}, ${Math.floor(Math.random() * 155 + 80)}, ${Math.floor(Math.random() * 155 + 80)}, 0.5)`,
      borderColor: `rgba(${Math.floor(Math.random() * 155 + 80)}, ${Math.floor(Math.random() * 155 + 80)}, ${Math.floor(Math.random() * 155 + 80)}, 1)`,
      borderWidth: 1
    }));

    setChartData({ labels, datasets });
  }, [blogsData]);


  // --- LÓGICA NUEVA PARA CATEGORÍAS Y TAGS ---
  
  // 1. Filtrar solo los publicados (igual que en blogs.js)
  const publishedBlogs = blogsData.filter(ab => ab.status === 'publish');

  // 2. Extraer todas las categorías de los blogs publicados
  // Asumimos que blog.blogcategory es un array ['React', 'Nextjs']. Si es string, el código se adapta.
  const allCategories = publishedBlogs.flatMap(blog => blog.blogcategory || []);
  
  // 3. Obtener categorías únicas (para el contador total)
  const uniqueCategories = [...new Set(allCategories)];

  // 4. Extraer todos los tags
  const allTags = publishedBlogs.flatMap(blog => blog.tags || []);
  const uniqueTags = [...new Set(allTags)];

  // 5. Contar cuántos blogs hay por cada categoría (para la tabla)
  // Esto crea un objeto tipo: { "NextJs": 5, "React": 3 }
  const categoryCounts = allCategories.reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // -------------------------------------------


  if(status === "loading") {
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading/>
        <h1>Loading...</h1>
      </div>
    );
  }

  if(!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Panel de Admin</title>
        <meta name="description" content="admin dashboard next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>Panel del <span>Blog</span></h2>
            <h3>PANEL DE ADMINISTRADOR</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <IoHome/> <span>/</span><span>Panel</span>
          </div>
        </div>

        {/* Top Four Cards */}
        <div className="topfourcards flex flex-sb">
          <div className="four_card" data-aos="fade-right" >
            <h2>Blogs totales</h2>
            <span>{publishedBlogs.length}</span>
          </div>
          <div className="four_card" data-aos="fade-right">
            <h2>Temas totales</h2>
            {/* Usamos el length de las categorías únicas */}
            <span>{uniqueCategories.length}</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>Etiquetas totales</h2>
             {/* Usamos el length de los tags únicos */}
            <span>{uniqueTags.length}</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>Borradores totales</h2>
            <span>{blogsData.filter(ab => ab.status === "draft").length}</span>
          </div>
        </div>

        {/* Year Overview & Categories Table */}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview"  data-aos="fade-up">
            <div className="flex flex-sb">
              <h3>Resumen Anual</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-center">{publishedBlogs.length} / 365 <br/> <span>Total publicado</span></h3>
            </div>

            <Bar data={chartData} options={options} />
          </div>

          <div className="right_salescont" data-aos="fade-up">
            <div>
              <h3>Blogs por categoría</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td>Tema</td>
                    <td>Cantidad</td>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapeamos el objeto de conteos */}
                  {Object.keys(categoryCounts).length > 0 ? (
                    Object.entries(categoryCounts).map(([categoryName, count]) => (
                      <tr key={categoryName}>
                        <td>{categoryName}</td>
                        <td>{count}</td>
                      </tr>
                    ))
                  ) : (
                     <tr>
                        <td colSpan={2}>No hay categorías aún</td>
                     </tr>
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}