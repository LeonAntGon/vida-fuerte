// Cambiar de require a import
import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const BlogSchema = new Schema({
    title: {type: String},
    slug: {type: String, required: true},
    description: {type: String},
    blogcategory: [{type: String}],
    tags: [{type: String}],
    status: {type: String},
    readingTime: {type: String},
},
    { timestamps: true }
);

// Exportar como default
export default models.Blog || model('Blog', BlogSchema, 'blogtest');