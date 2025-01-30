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
};

export default CategoryServices;
