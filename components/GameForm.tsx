"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

interface errors {
  title: string,
  desc: string
}

const GameForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");

  const isPending = false;

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
      <div>
        <label htmlFor="categories" className="game-form_label">Categorías</label>
        <Input id="categories" name="categories" className="game-form_input" required placeholder="Categorías (PS, PS2, DC, GBA, ETC)" />

        {errors.categories && <p>{errors.categories}</p>}
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
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder: "Describí el juego que estás agregando..."
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <Button type="submit" className="game-form_btn" disabled={isPending}>
        {isPending ? "Enviando..." : "Agregar Juego"}
        <Send className="size-6 ml-2" />
      </Button>

    </form>
  );
};

export default GameForm;
