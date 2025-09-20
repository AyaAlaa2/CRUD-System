import React from "react";
import "./App.css";
import Cards from "./Components/Cards";
import { Container } from "@mui/material";
import Header from "./Components/Header";

function App() {
  return (
    <div className="bg-gray-300/30">
      <Header />
      <Container>
        <Cards />
      </Container>
    </div>
  );
}

export default App;
