import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "titleEn", type: "string", title: "TitleEn" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
  ],
});


