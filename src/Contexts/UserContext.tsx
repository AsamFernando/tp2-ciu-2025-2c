import { createContext } from "react";
import type { UserContextType } from "../Types/Types";
import { defaultUser } from "./default/userDefault";

const userContext = createContext<UserContextType>(defaultUser);

export default userContext;