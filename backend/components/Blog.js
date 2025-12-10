import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/router";
import MarkdownEditor from "react-markdown-editor-lite";
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'

// ----------------------
// FUNCION DE TIEMPO DE LECTURA
// ----------------------
function calculateReadingTime(text, wpm = 200) {
  if (!text) return "1";

  let cleaned = text.replace(/```[\s\S]*?```/g, " ");
  cleaned = cleaned.replace(/`[^`]*`/g, " ");
  cleaned = cleaned.replace(/!\[.*?\]\(.*?\)/g, " ");
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  cleaned = cleaned.replace(/<[^>]*>/g, " ");
  cleaned = cleaned.replace(/\s+/g, " ").trim();

  if (!cleaned) return "1";

  const words = cleaned.split(" ").filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));

  return String(minutes);
}

export default function Blog(
  {
    _id,
    title: existingTitle,
    slug: existingSlug,
    blogcategory: existingBlogcategory,
    description: existingDescription,
    tags: existingTags,
    status: existingStatus,
    readingTime: existingReadingTime,
  }
) {

  const [redirect, setRedirect] = useState(false)
  const router = useRouter()

  const [title, setTitle] = useState(existingTitle || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
  const [description, setDescription] = useState(existingDescription || '');
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || '');
  const [readingTime, setReadingTime] = useState(existingReadingTime || '');

  async function createProduct(ev) {
    ev.preventDefault();

    const data = { title, slug, description, blogcategory, tags, status, readingTime };

    if (_id) {
      await axios.put('/api/blogapi', { ...data, _id })
    } else {
      await axios.post('/api/blogapi', data)
    }

    setRedirect(true)
  }

  if (redirect) {
    router.push('/')
    return null;
  }

  // Slug automático
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, '-');
    setSlug(newSlug);
  }

  return (
    <>

      <form onSubmit={createProduct} className="addWebsiteform">

        {/* blog title */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Titulo</label>
          <input type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingresa un titulo" />
        </div>

        {/* blog slug */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug</label>
          <input type="text"
            id="slug"
            value={slug}
            onChange={handleSlugChange}
            placeholder="Ingresa la url del Slug" required />
        </div>

        {/* blog category */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Category</label>
          <select name="category"
            id="category"
            value={blogcategory}
            onChange={(e) => setBlogcategory(Array.from(e.target.selectedOptions,
              option => option.value))}
            multiple>
            <option value="rutinas">Rutinas y entrenamientos</option>  
            <option value="equipamiento">Máquinas y equipamiento</option>
            <option value="suplementos">Suplementos</option>
            <option value="nutricion-y-dietas">Nutrición y dietas</option>
            <option value="libros-y-conocimiento">Libros y conocimiento</option>
            <option value="vida-saludable">Vida saludable</option>
          </select>
        </div>

        {/* markdown description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">Contenido del Blog</label>
          <MarkdownEditor

            value={description}

            onChange={(ev) => {
              setDescription(ev.text);

              // CALCULAR TIEMPO DE LECTURA AUTOMÁTICO
              const minutes = calculateReadingTime(ev.text);
              setReadingTime(minutes); // ← string
            }}

            style={{ width: '100%', height: '400px' }}

            renderHTML={text => {
              return (
                <ReactMarkdown>{text}</ReactMarkdown>
              );
            }}

          />
        </div>

        {/* tags */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Etiquetas</label>
          <select name="tags"
            id="tags"
            value={tags}
            onChange={(e) => setTags(Array.from(e.target.selectedOptions,
              option => option.value))}
            multiple>
            <option value="rutinas">Rutinas</option>
            <option value="maquinas">Máquinas</option>
            <option value="equipamiento">Equipamiento</option>
            <option value="suplementos">Suplementos</option>
            <option value="nutricion">Nutrición</option>
            <option value="dietas">Dietas</option>
            <option value="libros">Libros</option>
            <option value="vida-saludable">Vida saludable</option>
          </select>
        </div>

        {/* Status */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Estado</label>
          <select name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value="">No seleccionado</option>
            <option value="draft">Borrador</option>
            <option value="publish">Publicado</option>
          </select>
        </div>

        {/* Reading time */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="readingTime">Tiempo en minutos de lectura</label>
          <input
            type="text"
            name="readingTime"
            id="readingTime"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            readOnly
          />
        </div>

        {/* Guardar */}
        <div className="w-100 mb-2">
          <button type="submit" className="w-100 addwebbtn flex-center">GUARDAR BLOG</button>
        </div>

      </form>
    </>
  )
}
