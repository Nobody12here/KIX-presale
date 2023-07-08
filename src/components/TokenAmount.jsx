import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const TokenAmount = ({tokenPrice,buyToken,contract}) => {
  const [tokenValue, setTokenValue] = useState(0);

  const handleChange = (event) => {
    setTokenValue(event.target.value);
    console.log(tokenValue)
  };

  return (
  
  <div style={{display:'flex',alignItems:'center',flexDirection:'column',paddingBottom:'12%',color:'white'}}>
    <h3 >1 KIX = {tokenPrice} ETH </h3>
    <TextField fullWidth InputLabelProps={{style: { color: '#fff' }}} style={{marginTop:15,marginLeft:10,width:'80%'}} id="tokens" label="Enter tokens to purchase" variant="filled" type="number" color='primary' onChange={handleChange}  value={tokenValue}/>
    <Typography variant="h6" style={{marginTop:10}}>You will pay {tokenValue*tokenPrice} ETH</Typography>
    <Button variant='contained' color="primary" style={{marginLeft:10,marginTop:10,width:'80%'}} onClick={()=>buyToken(contract,tokenValue,(tokenValue*tokenPrice)*10**18)} >Purchase Tokens</Button>
  </div>
  );
};

export {TokenAmount};
