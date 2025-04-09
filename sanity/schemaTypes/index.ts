import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { categoryType } from "./categoryType";
import { userType } from "./userType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, categoryType, userType],
};
export const schemaTypes = [postType, categoryType, userType];
