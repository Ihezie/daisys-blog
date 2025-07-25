import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && (!defined($term) || title match $term) && (!defined($filter) || category->name match $filter)]|order(publishedAt desc){ _id, slug, title, publishedAt, category -> {name, tailwindColor}, image, body, "noOfComments": count(*[_type == "comment" && references(^._id)])}`
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
export const USER_BY_ID_QUERY = defineQuery(
  `*[_type == "user" && id == $id][0]{_id, name, avatar}`
);
export const COMMENTS_QUERY = defineQuery(
  `*[_type == "comment" && post._ref == $postId]|order(publishedAt desc){_id, publishedAt, user -> { _id, name, avatar}, post -> {_id}, body, likes, dislikes,
  "replies": *[_type == "reply" && references(^._id)]|order(publishedAt desc){_id, publishedAt, user -> { _id, name, avatar}, post -> {_id}, comment -> {_id}, body, likes, dislikes}}`
);
export const TOP_POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)]|order(count(*[_type == "comment" && references(^._id)]) desc){ _type, _id, slug, title, publishedAt, category -> {name, tailwindColor}, image, body, "noOfComments": count(*[_type == "comment" && references(^._id)])}[0...3]`
);
export const FAVOURITE_POSTS_QUERY = defineQuery(
  `*[_type == "user" && _id == $id][0]{favouritePosts[(!defined($term) || @->.title match $term)]-> { _id, slug, title, publishedAt, category -> {name, tailwindColor}, image, body, "noOfComments": count(*[_type == "comment" && references(^._id)])}}`
);
export const FAVOURITE_POSTS_IDS_QUERY = defineQuery(
  `*[_type == "user" && _id == $id][0]{favouritePosts[]-> {_id}}`
);