"use client";

import { useActionState, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";

const categoriesList: string[] = ['PS', 'PS1', 'PS2', 'PS3', 'PC', 'NES', 'SNES', 'N64', 'GB', 'GBA', 'NS', 'XBOX']
const genresList: string[] = ['horror', 'survival-horror']

const formInitialState = { error: '', status: 'INITIAL' }

const GameForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        shortDesc: formData.get("shortDesc") as string,
        categories: selectedCategories as string[],
        description: formData.get('description') as string,
        genres,
        link: formData.get('link') as string,
      }

      await formSchema.parseAsync(formValues);

      // const result = await createIdea(prevState, formData, description);

      console.log(formValues)

      // if (result.status == "SUCCESS") {
      //   toast({
      //     title: "Success",
      //     description: "Your startup pitch has been created successfully",
      //   });

      //   router.push(`/startup/${result._id}`);
      // }

      // return result;
    } catch (error) {
      error instanceof Error ? console.log('Error en formulario - ' + error.message) : console.log('Error en formulario');
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
    <form action={() => { }} className="game-form">
      <div>
        <label htmlFor="title" className="game-form_label">Título</label>
        <Input id="title" name="title" className="game-form_input" required placeholder="Título del Juego" />

        {errors.title && <p>{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="shortDescription" className="game-form_label">Descripción Corta</label>
        <Textarea id="shortDesc" name="shortDesc" className="game-form_textarea" required placeholder="Descripción corta" />

        {errors.shortDesc && <p>{errors.shortDesc}</p>}
      </div>
      {/* <div>
        <label htmlFor="categories" className="game-form_label">Categorías</label>
        <Input id="categories" name="categories" className="game-form_input" required placeholder="Categorías (PS, PS2, DC, GBA, ETC)" />

        {errors.categories && <p>{errors.categories}</p>}
      </div> */}
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
        <div className="flex flex-wrap gap-2 mt-3">
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
      </div>
      <div>
        <label htmlFor="link" className="game-form_label">URL de la Imagen</label>
        <Input id="link" name="link" className="game-form_input" required placeholder="https://www.link-de-la-imagen.com" />

        {errors.link && <p>{errors.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="description" className="game-form_label">Descripción</label>
        {/* <Textarea id="description" name="description" className="game-form_textarea" required placeholder="Descripción" /> */}
        <MDEditor
          value={description}
          onChange={(value) => setDescription(value as string)}
          id="description"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden', marginTop: 5 }}
          textareaProps={{
            placeholder: "Describí el juego que estás agregando...",
            autoCapitalize: "none",
            autoComplete: "off",
            spellCheck: false,
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
          autoCapitalize="off"
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label className="game-form_label">Géneros</label>
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
      </div>

      <Button type="submit" className="game-form_btn" disabled={isPending}>
        {isPending ? "Enviando..." : "Agregar Juego"}
        <Send className="size-6 ml-2" />
      </Button>

    </form>
  );
};

export default GameForm;
