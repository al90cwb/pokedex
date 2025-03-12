import { Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import { useEffect, useState } from "react";

interface PokemonDetail {
  name: string;
  image: string;
  types: string[];
}

function Home() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((res) => {
        const results = res.data.results;
        Promise.all(
          results.map((pokemon: { name: string; url: string }) => axios.get(pokemon.url))
        )
          .then((responses) => {
            const details = responses.map((response) => {
              const data = response.data;
              const image =
                data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
              const types = data.types.map((t: any) => t.type.name);
              return {
                name: data.name,
                image,
                types,
              };
            });
            setPokemons(details);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPokemons();
  }, []);

  // Filtramos os Pokémon pelo nome
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                <PokemonCard name={pokemon.name} image={pokemon.image} types={pokemon.types} />
              </Grid>
            ))
          ) : (
            <p style={{ textAlign: "center", width: "100%" }}>Nenhum Pokémon encontrado</p>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
