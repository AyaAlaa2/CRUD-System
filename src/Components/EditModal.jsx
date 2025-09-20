import React, { useCallback, useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchProduct } from "./service";

export default function EditModal({ open, handleClose, onSave, id }) {
  const updateSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    category: z.string().min(5, "Category must be at least 5 characters long"),
    price: z.coerce
      .number({ invalid_type_error: "Price must be a number" })
      .positive("Price must be greater than 0"),
    images: z.string().url("Image must be a valid URL"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur", resolver: zodResolver(updateSchema) });

  const handleProduct = useCallback(async () => {
    const currentProduct = await fetchProduct(id);
    reset(currentProduct);
  }, [id, reset]);

  useEffect(() => {
    handleProduct();
  }, [handleProduct]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-xl font-semibold">Edit Product</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit((data) => onSave(id, data))}>
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
                <Input
                  type="number"
                  name="price"
                  {...register("price")}
                  fullWidth
                />
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
          onClick={handleSubmit((data) => onSave(id, data))}
          variant="contained"
          className="bg-blue-600 hover:bg-blue-700"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
