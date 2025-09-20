import React, { useState } from "react";
import { Button } from "@mui/material";
import AddModal from "./AddModal";
import { addProduct } from "./service";

const AddButton = ({ open, setOpen, handleAdd }) => {
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "40%" }}
        color="success"
        onClick={() => setOpen(!open)}
      >
        Add Product
      </Button>

      {open && (
        <AddModal open={open} handleClose={handleClose} onAdd={handleAdd} />
      )}
    </>
  );
};

export default AddButton;
