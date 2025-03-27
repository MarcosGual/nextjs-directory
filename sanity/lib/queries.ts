import { defineQuery } from "next-sanity";

export const GAMES_QUERY = defineQuery(`
    *[_type == "game" && defined(slug.current) && 
      (!defined($search) || 
      title match $search || 
      categories[] match $search || 
      author->name match $search)
    ] | order(_createdAt desc) {
      _id, 
      title, 
      slug,
      _createdAt,
      author -> {
        _id, name, image, bio
      }, 
      views,
      likes,
      rating,
      description,
      categories,
      image
    }
  `);

export const STARTUP_BY_ID_QUERY = `
  *[_type == "game" && _id == $id][0]{
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  },
    views, 
    likes,
    description,
    categories,
    rating,
    image,
    genre
}`