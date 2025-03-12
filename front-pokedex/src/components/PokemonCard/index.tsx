import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Mapeamento de cores para cada tipo de Pokémon
const typeColors: { [key: string]: string } = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({ name, image, types }: PokemonCardProps) {
  return (
    <Card sx={{ maxWidth: 345, textAlign: "center", padding: 1 }}>
      {/* Imagem do Pokémon */}
      <CardMedia
        component="img"
        sx={{
          height: 180,
          objectFit: "contain",
          padding: "10px",
          backgroundColor: "#f8f8f8",
        }}
        image={image}
        title={name}
      />

      <CardContent>
        {/* Nome do Pokémon */}
        <Typography gutterBottom variant="h5" component="div">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>

        {/* Tipos do Pokémon */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1 }}>
          {types.map((type) => (
            <Box
              key={type}
              sx={{
                backgroundColor: typeColors[type] || "#ddd",
                color: "#fff",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textTransform: "uppercase",
                minWidth: "60px",
                textAlign: "center",
              }}
            >
              {type}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
