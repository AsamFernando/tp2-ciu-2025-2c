import { useState } from "react";
import {TagsContext} from "../../Contexts";
import type {Props, TagType} from "../../Types/Types";

const TagsProvider = ({ children }: Props) => {
    const [tags, setTags] = useState<TagType[]>([]);
    return (
        <TagsContext.Provider value={{tags, setTags}}>
            {children}
        </TagsContext.Provider>
    );
};
export default TagsProvider;