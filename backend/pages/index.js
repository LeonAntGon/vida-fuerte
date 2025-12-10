import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
// Update the imports order
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
  // Register Chart.js components before any other logic
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const { data: session, status } = useSession()
  const router = useRouter();
  
  // Move state declarations before any other logic
  const [blogsData, setBlogsData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  

  // check if there's no active session and redirect to login page
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
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/blogapi');
        const data = await res.json();
        setBlogsData(data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    })();
  }, []);

  // Fix the data processing useEffect
  useEffect(() => {
    if (blogsData.length > 0) {
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
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
        borderWidth: 1
      }));

      setChartData({ labels, datasets });
    }
  }, [blogsData]);

  if(session){
    return (
      <>
      
        <Head>
          <title>Panel de Admin</title>
          <meta name="description" content="admin dashboard next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      
      <div className="dashboard">
        {/*Title dashboard*/}

        <div className="titledashboard flex flex-sb">
          <div data-aos="fade-right">
            <h2>Panel del <span>Blog</span></h2>
            <h3>PANEL DE ADMINISTRADOR</h3>
          </div>
          <div className="breadcrumb" data-aos="fade-left">
            <IoHome/> <span>/</span><span>Panel</span>
          </div>
        </div>

        {/* dashboard four cards */}
        <div className="topfourcards flex flex-sb">
          <div className="four_card" data-aos="fade-right" >
            <h2>Blogs totales</h2>
            <span>{blogsData.filter(ab => ab.status === "publish").length}</span>
          </div>
          <div className="four_card" data-aos="fade-right">
            <h2>Temas totales</h2>
            <span>4</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>Etiquetas totales</h2>
            <span>5</span>
          </div>
          <div className="four_card" data-aos="fade-left">
            <h2>Borradores totales</h2>
            <span>{blogsData.filter(ab => ab.status === "draft").length}</span>
          </div>
        </div>

        {/* year overview */}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview"  data-aos="fade-up">
            <div className="flex flex-sb">
              <h3>Year overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-center">10 / 365 <br/> <span>Total publicado</span></h3>
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
                    <td>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Html, Css & JavaScript</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>NextJs - React</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Database</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>Deployment</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
      </>
    );
  }
  
}
