import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const game = defineType({
    name: 'game',
    title: 'Game',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: "title"
            }
        }),
        defineField({
            name: 'author',
            type: 'reference',
            to: { type: 'author' }
        }),
        defineField({
            name: 'views',
            type: 'number'
        }),
        defineField({
            name: 'likes',
            type: 'number'
        }),
        defineField({
            name: 'rating',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(5).error('Por favor ingrese un valor entre 0 y 5...')
        }),
        defineField({
            name: 'description',
            type: 'text'
        }),
        defineField({
            name: 'releaseYear',
            type: 'number',
            validation: (Rule) => Rule.min(1950).max(2400).error('Por favor ingrese un año válido de lanzamiento...')
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags", // Permite ingresar valores como etiquetas
            },
        }),
        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'genre',
            type: 'string',
            validation: (Rule) => Rule.min(3).max(20).required().error('Por favor ingrese un género...')
        }),
    ]
})