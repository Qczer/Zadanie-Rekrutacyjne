import { useContext } from "react";

import LikedContext from "./LikedContext";

export const useLikedProducts = () => {
    const context = useContext(LikedContext);
    if (!context) throw new Error("useProduct must be used within a ProductsProvider");
    return context;
};