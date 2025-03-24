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
            to: {type: 'author'}
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
            name: 'description',
            type: 'text'
        }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule) => Rule.min(1).max(20).required().error('Por favor ingrese la categoría...')
        }),
        defineField({
            name: 'image',
            type: 'string',
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'genre',
            type: 'string',
            validation: (Rule) => Rule.min(3).max(20).required().error('Por favor ingrese un género...')
        }),
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
})