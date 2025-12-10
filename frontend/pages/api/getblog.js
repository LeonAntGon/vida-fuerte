import { mongooseConnect } from "@/lib/mongoose";
import Blog from "@/models/blog";

export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();

    if(method === 'GET') {
        if (req.query?.id) {
        const blog = await Blog.findById(req.query.id);
        res.json(blog);

        } else if (req.query?.blogcategory){
            // fetch blogs by blogcategory
            const blog = await Blog.find({blogcategory: req.query.blogcategory});
            res.json(blog.reverse());
        } else if (req.query?.tags){
            // fetch blogs by tags
            const tag = await Blog.find({tags: req.query.tags});
            res.json(tag.reverse());
        } else if (req.query?.slug){
            // fetch blogs by slug
            const url = await Blog.find({slug: req.query.slug});
            res.json(url.reverse());
        } else {
            // fetch all blogs
            const blog = await Blog.find();
            res.json(blog.reverse());
            
        }
    } else {
        res.status(405).json({ message: "Method Not allowed"});
    }
}