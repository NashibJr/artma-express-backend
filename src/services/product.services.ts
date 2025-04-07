import { ProductTypes } from "../types/product.types";
import Product from "../models/product.model";

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
      const products = await Product.find({}).populate([
        "category",
        "uploader",
      ]);

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
  update: async (
    productData: ProductTypes,
    productId: string,
    imagePath: string,
    images: string[]
  ) => {
    try {
      await Product.findByIdAndUpdate(productId, {
        ...productData,
        image:
          imagePath &&
          `${process.env.DEFAULT_URL}/products/download/${imagePath}`,
        images:
          images &&
          Array.from(
            images ?? [],
            (image) => `${process.env.DEFAULT_URL}/products/download/${image}`
          ),
      });

      return {
        message: "Product successfully updated",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  getSingleProduct: async (productId: string) => {
    try {
      return Product.findById(productId).populate(["category", "uploader"]);
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  categoryProducts: async (category: string) => {
    try {
      const products = await Product.find({ category });

      return products;
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default ProductServices;
