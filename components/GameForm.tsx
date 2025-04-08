"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from 'sonner';
import { createDescription } from "@/lib/actions";
import { useRouter } from "next/navigation";

const categoriesList: string[] = ['PS', 'PS1', 'PS2', 'PS3', 'PC', 'NES', 'SNES', 'N64', 'GB', 'GBA', 'NS', 'XBOX']

const formInitialState = { error: '', status: 'INITIAL' }

const GameForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        shortDesc: formData.get("shortDescription") as string,
        releaseYear: Number(formData.get("release")) as number,
        categories: selectedCategories as string[],
        description,
        genre: genres,
        link: formData.get('link') as string,
      }

      await formSchema.parseAsync(formValues);

      console.log('formulario:', formValues)

      const result = await createDescription(prevState, formData, formValues);

      console.log('status', result)

      if (result.status == "SUCCESS") {
        toast.success("Juego Guardado", {
          description: "El juego ha sido creado exitosamente...",
          style: { backgroundColor: '#3da008', borderColor: 'white', color: 'white' },
          icon: '✅',
          closeButton: true
        })

        if (router) router.push(`/game/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Error", {
          description: "Por favor chequear inputs e intentar nuevamente...",
          style: { backgroundColor: '#e35747', borderColor: 'white', color: 'white' },
          icon: '❌',
          closeButton: true
        })

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
    } finally {

    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, formInitialState);

  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    const updatedCategories = selectedCategories.filter((cat) => cat !== category);
    setSelectedCategories(updatedCategories);
  };

  const addGenre = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault(); // Evita el envío del formulario
      setGenres([...genres, inputValue.trim()]); // Agrega el nuevo género
      setInputValue(""); // Limpia el input
    }
  };

  const removeGenre = (genreToRemove: string) => {
    setGenres(genres.filter((genre) => genre !== genreToRemove));
  };

  return (
    <form action={formAction} className="game-form">
      <div>
        <label htmlFor="title" className="game-form_label">Título</label>
        <Input id="title" name="title" className="game-form_input" required placeholder="Título del Juego" />

        {errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="shortDescription" className="game-form_label">Descripción Corta</label>
        <Textarea id="shortDescription" name="shortDescription" className="game-form_textarea" required placeholder="Descripción corta" />

        {errors.shortDescription && <p>{errors.shortDescription}</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        <label htmlFor="categories" className="game-form_label">Categorías</label>
        <select
          onChange={(e) => addCategory(e.target.value)}
          className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300 bg-white w-full"
          defaultValue=""
          name="categories"
          id="categories"
        >
          <option value="" disabled>Seleccioná una categoría</option>
          {categoriesList.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <div className="flex flex-wrap gap-2 mt-3 w-full">
          {selectedCategories.map((category) => (
            <div key={category} className="flex items-center bg-black text-white text-sm font-semibold px-3 py-1 rounded-full">
              {category}
              <button
                onClick={() => removeCategory(category)}
                className="ml-2 text-white font-bold hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        {errors.categories && <p>{errors.categories}</p>}
      </div>
      <div>
        <label htmlFor="link" className="game-form_label">URL de la Imagen</label>
        <Input id="link" name="link" className="game-form_input" required placeholder="https://www.link-de-la-imagen.com" />

        {errors.link && <p>{errors.link}</p>}
      </div>
      <div>
        <label htmlFor="release" className="game-form_label">Año de Publicación</label>
        <Input id="release" name="release" className="game-form_input" type="number" required placeholder="1999" />

        {errors.release && <p>{errors.release}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="description" className="game-form_label">Descripción</label>
        <MDEditor
          value={description}
          onChange={(value) => setDescription(value as string)}
          // id="description"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden', marginTop: 5 }}
          textareaProps={{
            name: "description",
            placeholder: "Describí el juego que estás agregando...",
            autoCapitalize: "none",
            autoComplete: "off",
            spellCheck: false,
            id: "description"
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          autoCapitalize="off"
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label className="game-form_label" htmlFor="genres">Géneros</label>
        <Input type="text"
          name="genres"
          id="genres"
          className="game-form_input w-full"
          placeholder="Escribí un género y presioná Enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addGenre} />
        <div className="mt-3 flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre}
              className="bg-gray-200 text-black px-3 py-1 rounded-lg flex items-center space-x-2"
            >
              {genre}
              <button
                type="button"
                className="ml-2 text-red-500 font-bold"
                onClick={() => removeGenre(genre)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.genres && <p>{errors.genres}</p>}
      </div>

      <Button type="submit" className="game-form_btn" disabled={isPending}>
        {isPending ? "Enviando..." : "Agregar Juego"}
        <Send className="size-6 ml-2" />
      </Button>

    </form>
  );
};

export default GameForm;
