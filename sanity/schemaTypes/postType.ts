import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().min(5).max(50),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      initialValue: "musings",
      options: {
        list: [
          { title: "Musings", value: "musings" },
          { title: "Skincare", value: "skincare" },
          { title: "Fashion", value: "fashion" },
          { title: "Haircare", value: "haircare" },
          { title: "Exercise", value: "exercise" },
          { title: "Makeup", value: "makeup" },
        ],
      },
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
