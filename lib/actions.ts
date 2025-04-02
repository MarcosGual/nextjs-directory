"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createDescription = async (
  state: any,
  form: FormData,
  formValues: any
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => (key !== "description")),
  );

  const {categories, genre, shortDesc, releaseYear, description} = formValues;

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const game = {
      title,
      shortDesc,
      categories,
      image: link,
      genre,
      releaseYear,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      description,
    };

    console.log('game to save: ', game)

    const result = await writeClient.create({ _type: "game", ...game });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
