import { createContext } from "react";
import type { TagsContextType } from "../Types/Types";
import { defaultTags } from "./default/tagDefault";

const tagsContext = createContext<TagsContextType>(defaultTags);

export default tagsContext;