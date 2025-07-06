import { useContext } from "react";

import ProductsContext from "./ProductsContext";

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error("useProduct must be used within a ProductsProvider");
    return context;
};