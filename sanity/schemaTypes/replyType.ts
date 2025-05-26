import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "reply",
  title: "Reply",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});
