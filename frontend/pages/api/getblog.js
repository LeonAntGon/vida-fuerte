import { mongooseConnect } from "@/lib/mongoose";
import Blog from "@/models/blog";

export default async function handle(req, res) {
    const { method } = req;

    // 1. Envolvemos todo en try-catch para capturar errores de conexión
    try {
        await mongooseConnect();

        if (method === 'GET') {
            if (req.query?.id) {
                const blog = await Blog.findById(req.query.id);
                return res.json(blog);
            } 
            
            if (req.query?.blogcategory) {
                const blog = await Blog.find({ blogcategory: req.query.blogcategory });
                return res.json(blog.reverse());
            } 
            
            if (req.query?.tags) {
                const tag = await Blog.find({ tags: req.query.tags });
                return res.json(tag.reverse());
            } 
            
            if (req.query?.slug) {
                const url = await Blog.find({ slug: req.query.slug });
                return res.json(url.reverse());
            } 
            
            // Si no hay filtros, devuelve todos
            const blog = await Blog.find();
            return res.json(blog.reverse());
            
        } else {
            return res.status(405).json({ message: "Method Not allowed" });
        }
    } catch (error) {
        // Esto es vital: Imprimirá el error real en los Logs de Vercel
        console.error("❌ Error en la API getblog:", error);
        return res.status(500).json({ 
            message: "Error connecting to database", 
            error: error.message 
        });
    }
}