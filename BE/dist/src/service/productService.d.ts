declare class ProductService {
    private productRepository;
    private categoryRepository;
    constructor();
    getAllProductsFromDatabase: () => Promise<any>;
    saveProduct: (Product: any) => Promise<any>;
    private updateProduct;
    findById: (id: any) => Promise<any>;
    private deleteProduct;
    searchProduct: (name: any) => Promise<any>;
    priceRange: (value: any) => Promise<any>;
}
declare const _default: ProductService;
export default _default;
