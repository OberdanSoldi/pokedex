import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import "./App.css";
import TabPanel from "./components/TabPanel";
import PokeBar from "./components/pokeBar";

import { MongoClient } from 'mongodb';

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
      numero = pokemon.toString().toLowerCase();
    } else {
      numero = Math.round(Math.random() * (151 - 1) + 1);
    }
    const pokeurl = `https://pokeapi.co/api/v2/pokemon/${numero}`;
    const uri = "mongodb+srv://oberdan:oberdan@cluster0.xtc4c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    fetch(pokeurl)
      .then(response => response.json())
      .then(data => {
        setPokemon(data);
        client.connect(err => {
          const collection = client.db("pokemon").collection("pokemon");
          collection.insertOne(data, (err, res) => {
            if (err) throw err;
            console.log("1 document inserted");
            client.close();
          });
          // perform actions on the collection object
          client.close();
});
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
    <div class="parteCima">
      <img class="pokeSprite" id="sprite" src={pokemon?.sprites.front_default} alt={pokemon?.name} />
    </div>
    <div class="parteBaixo">
      <div class="pokeName" id="pokes">{`Name: ${pokemon?.name}`}</div>

      <div class="pokeAlturaPeso">
        <span class="pokePeso">{`Weight: ${convertWeightOrHeight(pokemon?.weight)} KG`}</span>
        <span class="pokeAltura">{`Height: ${convertWeightOrHeight(pokemon?.height)} M`}</span>
      </div>  

      <form class="pokeForm" onSubmit={handleSubmit}>
        <input placeholder="id or name" class="pokeEntrada" type="search" id="poke" />
        {/* <input class="pokeBotao" type="submit" value="Pesquisar" id="teste" /> */}
      </form>
      <button class="pokeBotao" onClick={handlePokeData}>Gerar aleatório</button>
        <div class="pokeTab">
        <Tabs
          value={tab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
          centered
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
      </div>
    </div>      
    </Box>
  );
};

export default App;
