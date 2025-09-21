import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(5, "Category must be at least 5 characters long"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d+)?$/, "Price must be a valid number"),
  images: z.string().url("Image must be a valid URL"),
});

export default productSchema;
