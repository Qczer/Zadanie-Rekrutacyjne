import { createContext } from "react";

import type { LikedContextType } from "./LikedContextType";

const LikedContext = createContext<LikedContextType | undefined>(undefined);

export default LikedContext