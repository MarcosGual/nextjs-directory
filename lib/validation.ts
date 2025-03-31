import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  shortDesc: z.string().min(20).max(500),
  categories: z.array(z.string()).min(3, "Debes seleccionar al menos una categoría..."),
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
    }),
  description: z.string().min(20),
  genres: z.array(z.string()).min(1, "Debes agregar al menos un género..."),
});
