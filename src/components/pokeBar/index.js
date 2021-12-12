import React from "react";

import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const PokeBar = ({ name, value }) => {

  const color = "#dddddd", hex = "#7bc89a";

  if (typeof value === "undefined") {
    value = 0;
  } else if (typeof value === "number" && value < 0) {
    // throw new Error(
    //   "Invalid value prop -- please use a number more than or equal to 0."
    // );
  } else if (typeof value === "number" && value > 100) {
    // throw new Error(
    //   "Invalid value prop -- please use a number less than or equal to 100."
    // );
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 5,
    width: "100%",
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: color ,
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: hex 
    },
  }));

  const WhiteTextTypography = styled(Typography)(({ theme }) => ({
    color: "#000"
  }));

  //abreviate pokemon state name

  const abreviatePokeStatName = (name) => {
    switch (name) {
        case "hp": return "HP";
        case "attack": return "Atk";
        case "defense": return "Def";
        case "special-attack": return "Sp.Atk";
        case "special-defense": return "Sp.Def";
        case "speed": return "Spd";
        default: return name;
    }
}

  
  const nameStyle = {
    width: "60px",
    color: "#ffffff",
  }

  const barStyle = {
    display: "flex",
  }

  const barValue = (value) => {
    return Math.round((100 / 255) * value);
  }

  return (
    <div style={barStyle}>
        <span style={nameStyle}>
            {abreviatePokeStatName(name)}:
        </span>
        <Box position="relative" display="inline-flex" style={{ width: "90%" }}>
        <BorderLinearProgress
            color={hex ? undefined : color}
            variant="determinate"
            value={barValue(value)}
        />
        <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <WhiteTextTypography variant="body2">{`${value}`}</WhiteTextTypography>
        </Box>
        </Box>
    </div>
  );
};

export default PokeBar;