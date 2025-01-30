import { ProductTypes } from "../types/product.types";
import Product from "./product.model";

const ProductServices = {
  createProduct: async (
    productData: ProductTypes,
    imagePath: string,
    images: string[]
  ) => {
    try {
      const exists = await Product.findOne({ name: productData.name });
      if (exists) {
        return {
          error: "Product already exists",
        };
      }
      const product_ = await Product.create({
        ...productData,
        image: `${process.env.DEFAULT_URL}/products/download/${imagePath}`,
        images: Array.from(
          images ?? [],
          (image) => `${process.env.DEFAULT_URL}/products/download/${image}`
        ),
      });

      return {
        ...product_.toJSON(),
        message: "Product successfully created",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  getProducts: async () => {
    try {
      const products = await Product.find({});

      return products;
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  deleteProduct: async (productId: string) => {
    try {
      await Product.findByIdAndDelete(productId);

      return {
        message: "Product successfully deleted",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  update: async (productData: ProductTypes, productId: string) => {
    try {
      await Product.findByIdAndUpdate(productId, productData);

      return {
        message: "Product successfully updated",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default ProductServices;
