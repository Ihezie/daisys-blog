import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { categoryType } from "./categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, categoryType],
};
export const schemaTypes = [postType, postType];
