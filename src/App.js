import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import "./App.css";
import TabPanel from "./components/TabPanel";
import PokeBar from "./components/pokeBar";

const App = () => {
  const [tab, setTab] = React.useState("one");
  const [pokemon, setPokemon] = useState(null);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    handlePokeData(1);
  }, []);

  const handlePokeData = pokemon => {
    let numero;
    if (typeof pokemon == "number" || typeof pokemon == "string") {
      numero = pokemon;
    } else {
      numero = Math.round(Math.random() * (151 - 1) + 1);
    }
    const pokeurl = `https://pokeapi.co/api/v2/pokemon/${numero}`;
    fetch(pokeurl)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    let nome = e.target.elements.poke.value;
    e.target.elements.poke.value = "";
    handlePokeData(nome);
  };

  const convertWeightOrHeight = value => {
    return value / 10;
  };

  const pokeStats = pokemon?.stats;
  const pokeAbilities = pokemon?.abilities;
  const pokeTypes = pokemon?.types;

  console.log(pokemon);

  return (
    <Box sx={{ width: "100%" }}>
      <img id="sprite" src={pokemon?.sprites.front_default} alt={pokemon?.name} />

      <div id="pokes">{`Nome: ${pokemon?.name}`}</div>
      <div id="peso">{`Peso: ${convertWeightOrHeight(pokemon?.weight)} KG`}</div>
      <div id="tamanho">{`Tamanho: ${convertWeightOrHeight(pokemon?.height)} M`}</div>

      <form onSubmit={handleSubmit}>
        <input type="search" id="poke" />
        <input type="submit" value="Pesquisar" id="teste" sx={{ borderRadius: '50%' }} />
      </form>

      <button onClick={handlePokeData}>Gerar aleatório</button>
      <Tabs
        value={tab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Stats" />
        <Tab value="two" label="Abilities" />
        <Tab value="three" label="Types" />
      </Tabs>

      <Box>
        <TabPanel value={tab} index={"one"}>
          <div className="pokeStats">
            {pokeStats?.map((stat, index) => {
              return <PokeBar key={index} name={stat.stat.name} value={stat.base_stat} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value={tab} index={"two"}>
          <div className="pokeAbilities">
            {pokeAbilities?.map((abilities, index) => {
              return <Chip color="success" key={index} label={abilities.ability.name} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value={tab} index={"three"}>
          <div className="pokeTypes">
            {pokeTypes?.map((types, index) => {
              return <Chip color="success" key={index} label={types.type.name} />;
            })}
          </div>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default App;
