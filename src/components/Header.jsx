import React, { useState } from "react";
import connectToWeb3 from "./Web3";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Header = ({ setIsConnected }) => {
  const [account, setAccount] = useState("");
  return (
    <AppBar position="static">
      <Toolbar style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#2a2c2e" }}>
        <Box display="flex" alignItems="center">
          <h2 style={{ marginLeft: "8px", color: "white" }}>
            KairanX pre-sale
          </h2>
        </Box>

        <Box display="flex" alignItems="center">
          <h5 style={{ marginRight: "10px", color: "white" }}>{account}</h5>

          <Button
            color="primary"
            variant="contained"
            onClick={async () => {
              const web3 = await connectToWeb3(setIsConnected, setAccount);
            }}
          >
            <b>Connect Wallet</b>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
