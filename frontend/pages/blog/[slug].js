import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

export default function blogPage(){

    const router = useRouter()
    const {slug} = router.query;

    const [blog, setBlog] = useState(['']);
    const [loading, setLoading] = useState(true)

    // estado para la imagen hero y tiempo de lectura
    const [heroImage, setHeroImage] = useState('');
    const [readingTime, setReadingTime] = useState(1);

    useEffect(() => {
        if(slug){
            axios.get(`/api/getblog?slug=${slug}`).then(res =>{
                const alldata = res.data;
                setBlog(alldata);
                setLoading(false)
            }).catch( error => {
                console.error("error fetching blog", error)
            })
        }
    },[slug])

    // Extraer primera imagen y calcular tiempo de lectura
    useEffect(() => {
        if(!loading && blog && blog[0]?.description){
            const md = blog[0].description;

            // Buscar la primera imagen en markdown
            const imgMatch = md.match(/!\[[^\]]*\]\(([^)]+)\)/);
            if(imgMatch && imgMatch[1]){
                const url = imgMatch[1].trim();
                setHeroImage(url);
            } else {
                setHeroImage('');
            }

            // Calcular tiempo lectura
            const simplified = md
                .replace(/[`~*_>#+=-]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            const words = simplified ? simplified.split(' ').length : 0;
            const minutes = Math.max(1, Math.round(words / 200));
            setReadingTime(minutes);
        }
    }, [loading, blog]);

    // markdown code highlighter
    const Code = ({node,inline, className, children, ...props}) => {
        const match = /language-(\w+)/.exec(className || '');

        const [copied, setCopied] = useState();
        const handleCopy = () =>{
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000)
        };

        if(inline){
            return <code>{children}</code>
        } else if (match){
            return (
                <div style={{ position: 'relative'}}>
                    <SyntaxHighlighter 
                        language={match[1]}
                        PreTag="pre"
                        {...props}
                        codeTagProps={{ style: {padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap'}}}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>

                    <button style={{
                        position: 'absolute', top: '0', right: '0', zIndex: '1',
                        background: '#3d3d3d', color: '#fff', padding: '10px'
                    }} onClick={handleCopy}>
                        {copied ? 'Copiado' : 'Copiar codigo'}
                    </button>
                </div>
            )
        } else {
            return(
                <code className="md-post-code" {...props}>
                    {children}
                </code>
            )
        }
    }

    // 🔥 NUEVO: filtrar la heroImage (si es de Dropbox) del markdown
    let filteredMarkdown = blog[0]?.description || "";

    if (heroImage && heroImage.includes("dropbox.com")) {
        // elimina solo esa imagen exacta del contenido del markdown
        const escaped = heroImage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`!\\[[^\\]]*\\]\\(${escaped}\\)`, "g");
        filteredMarkdown = filteredMarkdown.replace(regex, "");
    }

    return <>
    <div className="slugpage">
        
            {/* HERO */}
            {!loading && heroImage ? (
                <div
                    className="w-full overflow-hidden relative h-[60vh] max-h-[602px] bg-center bg-cover bg-no-repeat"
                    style={{ backgroundImage: `url("${heroImage}")` }}
                >
                    <div className="absolute inset-0 bg-black/25"></div>
                    <div className="container">
                    <div className="absolute left-6 bottom-6 z-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md max-w-xl">
                            {blog && blog[0]?.title}
                        </h1>
                        <div className="mt-2 inline-flex items-center gap-3 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm text-white text-sm drop-shadow-sm">

                            <div className="flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2" stroke-width="0.1" stroke="#fff"/><path fill="#fff" fill-rule="evenodd" d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827q.39.03.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238q.35-.046.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71q-.034.255-.058.539h18.336q-.024-.284-.058-.54c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z" clip-rule="evenodd" stroke-width="0.1" stroke="#fff"/></svg>
                                <span>
                                    {blog && blog[0]?.createdAt && new Date(blog[0].createdAt).toLocaleDateString('es-AR',
                                        {month: 'short', day: 'numeric', year: 'numeric'})}
                                </span>
                            </div>

                            <span className="h-4 border-l border-white/40"></span>
                            <div className="flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M12 7.333C12 5.5 10.5 4 8.667 4H2v12h6.708C12 16 12 19.334 12 19.334m0-12C12 5.5 13.5 4 15.333 4H22v12h-6.667C12 16 12 19.334 12 19.334m0-12v12m1.875 1.124A2.58 2.58 0 0 1 16.167 19H21m-10.875 1.458A2.54 2.54 0 0 0 7.833 19H3"/></svg>
                                <span>{readingTime} min lectura</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ) : null}

            <div className="pb-5">
                <div className="mt-3">
                    {loading ? (
                        <div className="wh-100 flex flex-center mt-3">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        
                        <div className="container">
                            <div className="w-100 blogcontent">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: Code,
                                    }}
                                >
                                    {filteredMarkdown}
                                </ReactMarkdown>
                            </div>
                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    
    </>
}
