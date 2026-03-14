import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import Head from "next/head";
import { useState } from "react";
// Importamos tu modelo y conexión a BD para usarlos en getServerSideProps
import Blog from "@/models/blog";
import { mongooseconnect } from "@/lib/mongoose";

// --- Componente CodeBlock ---
const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(String(children));
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    if (inline) {
        return <code {...props}>{children}</code>;
    } else if (match) {
        return (
            <div style={{ position: "relative" }}>
                <SyntaxHighlighter
                    language={match[1]}
                    PreTag="pre"
                    {...props}
                    codeTagProps={{
                        style: {
                            padding: "0",
                            borderRadius: "5px",
                            overflowX: "auto",
                            whiteSpace: "pre-wrap",
                        },
                    }}
                >
                    {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>

                <button
                    style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        zIndex: "1",
                        background: "#3d3d3d",
                        color: "#fff",
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: "0 5px 0 5px",
                        cursor: "pointer",
                        fontSize: "12px"
                    }}
                    onClick={handleCopy}
                >
                    {copied ? "Copiado" : "Copiar código"}
                </button>
            </div>
        );
    } else {
        return (
            <code className="md-post-code" {...props}>
                {children}
            </code>
        );
    }
};


// --- Componente Principal ---
// Ahora recibe los datos como props directamente desde el servidor
export default function BlogPage({ blogData, heroImage, ogImageUrl, readingTime, filteredMarkdown }) {
    
    if (!blogData) {
        return <div className="wh-100 flex flex-center mt-3"><h1>Post no encontrado</h1></div>;
    }

    return (
        <>
            <Head>
                <title>{blogData.title ? `${blogData.title} | Vida Fuerte` : "Vida Fuerte"}</title>
                <meta property="og:title" content={blogData.title || "Vida Fuerte Blog"} />
                <meta property="og:description" content={blogData.description?.substring(0, 150) + "..."} />
                
                {/* Aquí está la magia del SEO: la imagen cruda lista para los bots */}
                {ogImageUrl && (
                    <meta property="og:image" content={ogImageUrl} />
                )}    
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <div className="slugpage">
                {/* HERO */}
                {heroImage ? (
                    <div
                        className="w-full overflow-hidden relative h-[60vh] max-h-[602px] bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url("${heroImage}")` }}
                    >
                        <div className="absolute inset-0 bg-black/25"></div>
                        <div className="container">
                            <div className="absolute left-6 bottom-6 z-10">
                                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md max-w-xl">
                                    {blogData.title}
                                </h1>
                                <div className="mt-2 inline-flex items-center gap-3 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm text-white text-sm drop-shadow-sm">
                                    <div className="flex gap-1">
                                        {/* Icono Calendario */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <path fill="#fff" d="M17 14a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2" strokeWidth="0.1" stroke="#fff" />
                                            <path fill="#fff" fillRule="evenodd" d="M7 1.75a.75.75 0 0 1 .75.75v.763c.662-.013 1.391-.013 2.193-.013h4.113c.803 0 1.532 0 2.194.013V2.5a.75.75 0 0 1 1.5 0v.827q.39.03.739.076c1.172.158 2.121.49 2.87 1.238c.748.749 1.08 1.698 1.238 2.87c.153 1.14.153 2.595.153 4.433v2.112c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.945c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-2.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238q.35-.046.739-.076V2.5A.75.75 0 0 1 7 1.75M5.71 4.89c-1.005.135-1.585.389-2.008.812S3.025 6.705 2.89 7.71q-.034.255-.058.539h18.336q-.024-.284-.058-.54c-.135-1.005-.389-1.585-.812-2.008s-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-4c-1.907 0-3.261.002-4.29.14M2.75 12c0-.854 0-1.597.013-2.25h18.474c.013.653.013 1.396.013 2.25v2c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008s-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-4c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289z" clipRule="evenodd" strokeWidth="0.1" stroke="#fff" />
                                        </svg>
                                        <span>
                                            {blogData.createdAt &&
                                                new Date(blogData.createdAt).toLocaleDateString("es-AR", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                        </span>
                                    </div>

                                    <span className="h-4 border-l border-white/40"></span>
                                    <div className="flex gap-1">
                                        {/* Icono Reloj */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M12 7.333C12 5.5 10.5 4 8.667 4H2v12h6.708C12 16 12 19.334 12 19.334m0-12C12 5.5 13.5 4 15.333 4H22v12h-6.667C12 16 12 19.334 12 19.334m0-12v12m1.875 1.124A2.58 2.58 0 0 1 16.167 19H21m-10.875 1.458A2.54 2.54 0 0 0 7.833 19H3" />
                                        </svg>
                                        <span>{readingTime} min lectura</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}

                <div className="pb-5">
                    <div className="mt-3">
                        <div className="container">
                            <div className="w-100 blogcontent">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code: CodeBlock,
                                    }}
                                >
                                    {filteredMarkdown}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// --- LÓGICA DE SERVIDOR (SEO OPTIMIZADO) ---
export async function getServerSideProps(context) {
    const { slug } = context.query;

    try {
        await mongooseconnect();
        // Buscamos el blog por su slug en la BD
        const blogDoc = await Blog.findOne({ slug });

        if (!blogDoc) {
            return { notFound: true };
        }

        // Convertimos el documento de Mongoose a un objeto de JS plano
        const blogData = JSON.parse(JSON.stringify(blogDoc));
        const md = blogData.description || "";

        let heroImage = "";
        let ogImageUrl = "";
        let readingTime = 1;
        let filteredMarkdown = md;

        // 1. Extraemos la primera imagen
        const imgMatch = md.match(/!\[[^\]]*\]\(([^)]+)\)/);
        if (imgMatch && imgMatch[1]) {
            heroImage = imgMatch[1].trim();
            ogImageUrl = heroImage;

            // 2. Si es de Dropbox, la limpiamos para las etiquetas Open Graph
            if (ogImageUrl.includes("dropbox.com")) {
                ogImageUrl = ogImageUrl
                    .replace("www.dropbox.com", "dl.dropboxusercontent.com")
                    .replace("&dl=1", "")
                    .replace("?dl=1", "");
            }

            // 3. Removemos la imagen del contenido para que no salga repetida abajo del Hero
            const escaped = heroImage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(`!\\[[^\\]]*\\]\\(${escaped}\\)`, "g");
            filteredMarkdown = filteredMarkdown.replace(regex, "");
        }

        // 4. Calculamos el tiempo de lectura
        const simplified = md
            .replace(/[`~*_>#+=-]/g, "")
            .replace(/\s+/g, " ")
            .trim();
        const words = simplified ? simplified.split(" ").length : 0;
        readingTime = Math.max(1, Math.round(words / 200));

        // Retornamos los datos pre-calculados al componente
        return {
            props: {
                blogData,
                heroImage,
                ogImageUrl,
                readingTime,
                filteredMarkdown
            }
        };

    } catch (error) {
        console.error("Error fetching data on server:", error);
        return { notFound: true };
    }
}