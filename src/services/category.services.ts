import Category from "../models/category.model";
import { CategoryTypes } from "../types/product.types";

const CategoryServices = {
  create: async (categoryData: CategoryTypes, imagePath: string) => {
    try {
      const { name } = categoryData;
      const exists = await Category.findOne({ name });
      if (exists) {
        return {
          error: "Category name already exists",
        };
      }

      const category = await Category.create({
        name,
        image: `${process.env.DEFAULT_URL}/categories/download/${imagePath}`,
      });

      return {
        ...category.toJSON(),
        message: "Category successfully created",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  getCategories: async () => {
    try {
      const categories = await Category.find({});

      return categories;
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  deleteCategory: async (categoryId: string) => {
    try {
      await Category.findByIdAndDelete(categoryId);

      return {
        message: "Category successfully deleted",
      };
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
  singleCategory: async (categoryId: string) => {
    try {
      const category = await Category.findById(categoryId)
        .populate(["products"])
        .exec();

      return category;
    } catch (error) {
      return {
        error: (error as Error).message,
      };
    }
  },
};

export default CategoryServices;
