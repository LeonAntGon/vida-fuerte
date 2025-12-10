import { mongooseconnect } from "@/lib/mongoose";
import Blog from "@/models/blog";

export default async function handle(req, res){

    //if authenticated, connect to Mongodb
    await mongooseconnect();

    const { method } = req;

    //data send or post data
    if(method === 'POST'){
        const { title, slug, description, blogcategory, tags, status, readingTime } = req.body;

        if(!title || !slug || !description || !blogcategory || !tags || !status || !readingTime) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        } //esto lo sugirió eleditor

        const blogDoc = await Blog.create({
            title, slug, description, blogcategory, tags, status, readingTime
        })

        res.json(blogDoc)
    }

    //fetch or get data
    if(method === 'GET'){
        if(req.query?.id){
            res.json(await Blog.findById(req.query.id));
        } else {
            res.json((await Blog.find()).reverse())
        }
    }

    //update
    if(method === 'PUT'){
        const { _id, title, slug, description, blogcategory, tags, status, readingTime } = req.body;

        if(!title || !slug || !description || !blogcategory || !tags || !status || !readingTime) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        } // sugerido por la ai

        await Blog.updateOne({_id}, {
            title, slug, description, blogcategory, tags, status, readingTime
        });

        res.json(true);
    }

    //delete one blog
    if(method === 'DELETE'){
        if(req.query?.id){
            await Blog.deleteOne({ _id: req.query?.id});
            res.json(true); 
        }
    }
}