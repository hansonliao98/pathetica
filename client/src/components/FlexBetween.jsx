import { Box } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";

const FlexBetween = styled(Box)({
  //reusing Css as a component
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
