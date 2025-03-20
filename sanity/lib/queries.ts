import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && (!defined($term) || title match $term) && (!defined($filter) || category->name match $filter)]|order(publishedAt desc){ _id, slug, title, publishedAt, category -> {name, tailwindColor}, image, body }`
);
export const CATEGORY_NAMES_QUERY = defineQuery(
  `*[_type == "category" && defined(_id)]{_id, name}`
);
export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && defined(_id)]{_id, name, animatedIcon, tailwindColor, image}`
);
export const CAROUSEL_POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){ _type, _id, slug, title, publishedAt, category -> {name, tailwindColor}, image, body }[0...5]`
);
export const SINGLE_POST_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && $slug == slug.current]{_id, title, publishedAt, category -> {name, tailwindColor}, image, body}[0]`
);
