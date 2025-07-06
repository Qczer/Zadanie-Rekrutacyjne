import { createContext } from "react";

import type { ProductsContextType } from "./ProductsContextType";

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export default ProductsContext