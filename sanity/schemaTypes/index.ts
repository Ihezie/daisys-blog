import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { categoryType } from "./categoryType";
import { userType } from "./userType";
import { commentType } from "./commentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, categoryType, userType, commentType],
};
export const schemaTypes = [postType, categoryType, userType, commentType];
