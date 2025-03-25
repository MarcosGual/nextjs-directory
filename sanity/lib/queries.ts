import { defineQuery } from "next-sanity";

export const GAMES_QUERY = defineQuery(`*[_type == "game" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, slug, image, bio
  },
    views, 
    likes,
    description,
    categories,
    rating,
    image
}`);