import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
import { IoMoonSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { HiBars2 } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";
import { LuSun } from "react-icons/lu";
import { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";

export default function Header(){
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navLinks = [
    { href: "/", label: "Inicio" },
    { 
      label: "Temas",
      items: [
        { href: "/topics/rutinas", label: "Rutinas de Ejercicio" },
        { href: "/topics/equipamiento", label: "Equipamiento de Gym" },
        { href: "/topics/suplementos", label: "Suplementos" },
        { href: "/topics/nutricion-y-dietas", label: "Nutrición" },
        { href: "/topics/libros-y-conocimiento", label: "Libros y Guías" },
        { href: "/topics/vida-saludable", label: "Estilo de Vida Saludable" },
      ]
    },
    { href: "/sobre-nosotros", label: "Sobre Nosotros" },
  ]

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }
  //MY CODE IS BELOW

    //searchbar open and close function
    const [searchOpen, setSearchOpen] = useState(false)

    // for open searchbar
    const openSearch = () => {
        setSearchOpen(!searchOpen)
    }
    // for close searchbar
    const closeSearch = () => {
        setSearchOpen(false)
    }

    // asidebar for mobile devide
    const [aside, setAside] = useState(false)

    const asideOpen = () => {
        setAside(true);
    }

    const asideClose = () => {
        setAside(false);
    }
    // for close asidebar menu when click on link also
    const handleLinkClick = () => {
        setAside(false); 
    }

    // Dark mode on off
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // check local storage for darkmode preference on initial load
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode); 
    }, []);

    useEffect(() => {
        // aply dark mode styles when darkmode state changes
       if (darkMode) {
          document.body.classList.add("dark");
          localStorage.setItem("darkMode", "true");
       } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
       }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode); // toggle dark mode state
    };

    // search data fetch
    const { alldata, loading } = useFetchData('/api/getblog');

    // filtering publish blogs
    const publishedBlogs = alldata.filter( ab => ab.status === "publish")

    const [searchQuery, setSearchQuery] = useState('');
    // filtering based on search query, search data from title
    const filteredBlogs = searchQuery.trim() === '' ? publishedBlogs : publishedBlogs.filter
    (blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    function truncateText(text, maxLength = 120) {
        if (!text || typeof text !== 'string') return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
      }
      
    return <>
    <nav className={`background_primary fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-sm "
            : "bg-background/95 backdrop-blur-md shadow-md "
        }`}>
          
        <div className="container header">
            <div className="logo">
                <Link href="/" className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl group shrink-0">
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dumbbell-icon lucide-dumbbell"><path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/></svg>
              </div>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                Vida <span className="text-primary">Fuerte</span>
              </span>
            </Link>
            </div>
        
            <div className="searchbar">
                <IoSearchSharp/>
                <input onClick={openSearch} type="search" 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Qué te interesa saber?"/>
            </div>

            <div className="nav_list_dark">
                <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navLinks.map((link) => (
                'items' in link ? (
                  <div key={link.label} className="relative group">
                    <button className="px-4 xl:px-5 py-2 text-base xl:text-lg font-medium text-muted-foreground text-primary-hover transition-all duration-300 flex items-center gap-1.5 group
                    group-hover:text-orange-400 cursor-default">
                      <span>{link.label}</span>
                      <div className="w-4 h-4 xl:w-5 xl:h-5 transition-transform duration-300 group-hover:rotate-180 " >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                      
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                      <div className="background_primary backdrop-blur-md border border-gray-400 rounded-xl shadow-2xl py-3 min-w-[240px] xl:min-w-[260px]
                      ">
                        {link.items.map((item, idx) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-5 py-3 text-sm xl:text-base text-muted-foreground hover:text-[#f97316] hover:bg-[#f97316]/5 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl border-b border-gray-300/30 last:border-b-0"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 xl:px-5 py-2 text-base xl:text-lg font-medium text-muted-foreground text transition-all duration-300 hover:text-orange-400"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4" />
                  </Link>
                )
              ))}
            </div>
                {/* for mobile device */}
                <div className="navlist_mobile_ul">
                    
                    <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp/> : <LuSun/>}</button>
                    <button onClick={openSearch}><IoSearch/></button>
                    {/*<button onClick={asideOpen}><HiBars2/></button>*/}
                </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-gray-600 rounded-lg transition-all duration-200 active:scale-95"
                  aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> 
                  : <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
                  }
              </button>
                <div className="darkmode">
                    <label className="switch">
                        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode}/>
                        <span className="slider_header"></span>
                    </label>
                </div>


            </div>
        </div>
        <div className={`search_click ${searchOpen ? 'open' : ''}`}>
            <div className="searchab_input">
                <IoSearchSharp/>
                <input type="search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Que te interesa saber?"/>
            </div>
            <div className="search_data text-center">
                <div className="blog">
                    {loading ? <div className="wh_100 flex flex-center mt-2 pb-5">
                        <div className="loader"></div>
                    </div> : <>
                        {searchQuery ? <>
                        {filteredBlogs.slice(0, 3).map((blog) => {
                            return <Link className="blog" key={blog._id} onClick={closeSearch} href={`/blog/${blog.slug}`}>
                                <div className="bloginfo">
                                    <div><h3>{blog.slug}</h3></div>
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
                                </div>
                                
                            </Link>
                        })}
                    </> : <div>No hay resultados de busqueda</div>}
                    </>}
                </div>
            </div>
            <div className="exit_search" onClick={closeSearch}>
                <div><FaXmark/></div>
                <h4>ESC</h4>
            </div>

            {/* mobile navlist */}
        </div>
        {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-[104px] right-0 left-0 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4.5rem)] overflow-y-auto background_primary border-b border-border shadow-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
              <div className="flex flex-col items-stretch justify-center
              gap-1">
                {navLinks.map((link, index) => (
                  'items' in link ? (
                    <div key={link.label} className="border-b border-border/30 last:border-b-0">
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="w-full flex items-center justify-between px-4 py-4 sm:py-5 text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-primary-hover hover:bg-gray-600 rounded-lg transition-all duration-200
                        text"
                        style={{
                          animationDelay: `${index * 50}ms`,
                          animationFillMode: "backwards",
                        }}
                      >
                        {link.label}
                         <svg 
                          className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ${
                            openDropdown === link.label ? 'rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                        
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openDropdown === link.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-4 sm:pl-6 pb-2">
                          {link.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-3 sm:py-4 text-base sm:text-lg md:text-xl text-muted-foreground text-primary-hover hover:bg-gray-600/80 rounded-lg transition-all duration-200
                              text"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-4 sm:py-5 text-xl sm:text-2xl md:text-3xl font-bold text-foreground text-primary-hover hover:bg-gray-600 rounded-lg transition-all duration-200 active:scale-98 border-b border-border/30 last:border-b-0
                      text"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "backwards",
                      }}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                <div
                  className="px-4 pt-6 pb-2 animate-in slide-in-from-top-4 duration-300"
                  style={{ animationDelay: "250ms" }}
                >
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
    
    <div className="h-[114px]" />
    </>
}