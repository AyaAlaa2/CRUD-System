import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Input,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchProduct, fetchProducts, updateProduct } from "./service";
import { zodResolver } from "@hookform/resolvers/zod";

const AddModal = ({ open, handleClose, onAdd }) => {
  const updateSchema = z.object({
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: zodResolver(updateSchema) });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-xl font-semibold">
        Add New Product
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit((data) => onAdd(data))}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-5">
                <label className="flex items-center w-[18%]">Name:</label>
                <Input name="name" {...register("name")} fullWidth />
              </div>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-5 ">
                <label className="flex items-center w-[15%]">
                  Description:
                </label>
                <Input
                  name="description"
                  {...register("description")}
                  fullWidth
                  multiline
                  rows={3}
                />
              </div>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-5">
                <label className="flex items-center w-[18%]">Category:</label>
                <Input name="category" {...register("category")} fullWidth />
              </div>
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-5">
                <label className="flex items-center w-[18%]">Price:</label>
                <Input name="price" {...register("price")} fullWidth />
              </div>
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row items-center gap-5">
                <label className="flex items-center w-[19%]">Image URL:</label>
                <Input name="images" {...register("images")} fullWidth />
              </div>
              {errors.images && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button className="text-gray-600" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit((data) => onAdd(data))}
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
