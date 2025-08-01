import { defineField, defineType } from "sanity";

export const replyType = defineType({
  name: "reply",
  title: "Reply",
  type: "document",
  readOnly: true,
  fields: [
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "user",
      type: "reference",
      to: { type: "user" },
    }),
    defineField({
      name: "post",
      type: "reference",
      to: { type: "post" },
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "likes",
      type: "array",
      validation: (rule) => rule.unique(),
      of: [{ type: "reference", to: { type: "user" } }],
      initialValue: [],
    }),
    defineField({
      name: "dislikes",
      type: "array",
      validation: (rule) => rule.unique(),
      of: [{ type: "reference", to: { type: "user" } }],
      initialValue: [],
    }),
    defineField({
      name: "comment",
      type: "reference",
      to: { type: "comment" },
    }),
  ],
});
