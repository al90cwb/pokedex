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

  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((res) => {
        const results = res.data.results; // array com { name, url }
        // Faz uma requisição para cada Pokémon para pegar seus detalhes
        Promise.all(
          results.map((pokemon: { name: string; url: string }) =>
            axios.get(pokemon.url)
          )
        )
          .then((responses) => {
            const details = responses.map((response) => {
              const data = response.data;
              // Tenta pegar a imagem da arte oficial; se não existir, usa o sprite padrão
              const image =
                data.sprites.other["official-artwork"].front_default ||
                data.sprites.front_default;
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

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {pokemons.map((pokemon) => (
            <Grid item xs={3} key={pokemon.name}>
              <PokemonCard
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
