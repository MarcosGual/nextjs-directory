import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3, 'El título debe ser de al menos 3 caracteres').max(100, 'El título debe tener como máximo 100 caracteres'),
  shortDescription: z.string().min(10, 'La descripción debe tener al menos 10 caracteres').max(500, 'La descripción puede tener un máximo de 500 caracteres'),
  categories: z.array(z.string()).min(1, 'Debe haber al menos una categoría...'),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }, 'Link de imagen inválido...'),
  description: z.string().min(20, 'La descripción mínima debe contener al menos 20 caracteres...'),
  genres: z.array(z.string()).min(1, 'Debe haber al menos un género...'),
});
