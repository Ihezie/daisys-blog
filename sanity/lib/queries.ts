import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && (!defined($term) || title match $term) && (!defined($filter) || category->name match $filter)]|order(publishedAt desc){ _id, title, publishedAt, category -> {name}, image, body }`
);
export const CATEGORY_NAMES_QUERY = defineQuery(
  `*[_type == "category" && defined(_id)]{_id, name}`
);
export const CATEGORIES_QUERY = defineQuery(
  `*[_type == "category" && defined(_id)]{_id, name, animatedIcon, tailwindColor, image}`
);
