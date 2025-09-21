import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Button, CardMedia, ButtonGroup } from "@mui/material";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  addProduct,
} from "./service";
import EditModal from "./EditModal";
import AddButton from "./AddButton";

export default function Cards() {
  const [cards, setCards] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(0);

  // Fetch Data
  const loadProducts = async () => {
    const products = await fetchProducts();
    setCards(products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete Data
  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  // Save update product
  const handleSave = async (id, data) => {
    await updateProduct(id, data);
    loadProducts();
    setOpenEditModal(false);
  };

  // generate new id for new Product
  const newIDGenerate = async () => {
    const Product = await fetchProducts();
    return String(Number(Product[Product.length - 1].id) + 1);
  };

  // Add new Product
  const handleAdd = async (data) => {
    const id = await newIDGenerate();
    await addProduct(id, data);
    loadProducts();
    setOpenAddModal(false);
  };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center w-full py-[160px] gap-5">
      <AddButton
        open={openAddModal}
        setOpen={setOpenAddModal}
        handleAdd={handleAdd}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              minHeight: "580px",
              width: "350px",
              position: "relative",
              transition: "all 0.3s",
              boxShadow: "1px 1px 15px 1px rgba(202, 202, 202, 1)",
            }}
          >
            <CardMedia
              sx={{ height: 340 }}
              image={card.images}
              title="green iguana"
            />
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                {card.name}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ py: 1 }}
              >
                {card.category}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ py: 1 }}>
                {card.description.length > 40
                  ? card.description.slice(0, 40) + " ..."
                  : card.description}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "primary.main",
                  mb: 2,
                }}
              >
                {card.price} $
              </Typography>
              <ButtonGroup
                variant="contained"
                aria-label="Basic button group"
                sx={{
                  display: "flex",
                  gap: 2,
                  boxShadow: "none",
                }}
              >
                <Button
                  sx={{ width: "50%" }}
                  color="success"
                  onClick={() => {
                    setCurrentProduct(card.id);
                    setOpenEditModal(!openEditModal);
                  }}
                >
                  Edit
                </Button>
                <Button
                  sx={{ width: "50%" }}
                  color="error"
                  onClick={() => handleDelete(card.id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        ))}
      </Box>
      {openEditModal && (
        <EditModal
          open={openEditModal}
          handleClose={() => setOpenEditModal(false)}
          id={currentProduct}
          onSave={handleSave}
        />
      )}
    </div>
  );
}