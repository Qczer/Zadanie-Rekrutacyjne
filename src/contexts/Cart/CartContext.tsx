import { createContext } from "react";

import type { CartContextType } from "./CartContextType";

const CartContext = createContext<CartContextType | undefined>(undefined);

export default CartContext