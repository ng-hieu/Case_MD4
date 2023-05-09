import { Request, Response } from "express";
declare class ProductController {
    private productService;
    private categoryService;
    private userService;
    constructor();
    getAllProducts: (req: Request, res: Response) => Promise<void>;
    createProduct: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
    searchProducts: (req: Request, res: Response) => Promise<void>;
}
declare const _default: ProductController;
export default _default;
