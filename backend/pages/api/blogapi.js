import { mongooseconnect } from "@/lib/mongoose";
import Blog from "@/models/blog";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const { method } = req;

    
    await mongooseconnect();

    
    const session = await getServerSession(req, res, authOptions);

    
    if (method !== 'GET' && !session) {
        return res.status(401).json({ error: "No autorizado. Debes iniciar sesión." });
    }

    if (method === 'POST') {
        const { title, slug, description, blogcategory, tags, status, readingTime } = req.body;

        if (!title || !slug || !description || !blogcategory || !tags || !status || !readingTime) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const blogDoc = await Blog.create({
            title, slug, description, blogcategory, tags, status, readingTime
        });

        res.json(blogDoc);
    }


    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Blog.findById(req.query.id));
        } else {
            res.json((await Blog.find()).reverse());
        }
    }


    if (method === 'PUT') {
        const { _id, title, slug, description, blogcategory, tags, status, readingTime } = req.body;

        if (!title || !slug || !description || !blogcategory || !tags || !status || !readingTime) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        await Blog.updateOne({ _id }, {
            title, slug, description, blogcategory, tags, status, readingTime
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Blog.deleteOne({ _id: req.query?.id });
            res.json(true);
        }
    }
}