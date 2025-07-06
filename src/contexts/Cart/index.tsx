import { useContext } from "react";

import CartContext from "./CartContext";

export const useCartProducts = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useProduct must be used within a ProductsProvider");
    return context;
};