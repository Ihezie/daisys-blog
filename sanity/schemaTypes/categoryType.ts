import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "animatedIcon",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tailwindColor",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
