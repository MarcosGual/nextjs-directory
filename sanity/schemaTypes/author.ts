import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'id',
            type: 'number'
        }),
        defineField({
            name: 'name',
            type: 'string'
        }),
        defineField({
            name: 'username',
            type: 'string'
        }),
        defineField({
            name: 'email',
            type: 'string'
        }),
        defineField({
            name: 'image',
            type: 'string'
        }),
        defineField({
            name: 'bio',
            type: 'string'
        }),
        defineField({
            name: "likedGames",
            title: "Liked Games",
            type: "array",
            of: [
                {
                  type: "object",
                  fields: [
                    { name: "game", title: "Game", type: "reference", to: [{ type: "game" }] },
                    { name: "likedAt", title: "Liked At", type: "datetime" },
                  ],
                },
              ],
          },)
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
})