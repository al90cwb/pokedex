import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

export default function PokemonCard({
  name,
  image,
  types,
}: PokemonCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {types.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}
