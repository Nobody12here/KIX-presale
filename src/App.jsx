import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Header, TokenAmount,Timer } from './components/';
import contractABI from './contracts/contractABI.json';
import connectToWeb3 from './components/Web3';
import './App.css';

const contractAddress = "0xb9995c8e3409d9720f9ad22d886dba39964fa5ba";

function App() {
  const [accounts, setAccounts] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(null);
  const [contract,SetContract]=useState("")
  const [isConnected,setIsConnected]=useState(false)

  useEffect( () => {
  async function fetchContract() {
    if (isConnected) {

      web3 = new Web3(window.ethereum);

      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const startTime = await contract.methods.startTimestamp().call();
      const endTime = await contract.methods.endTimestamp().call();
      const tokenPrice = (await contract.methods.tokenPrice().call()) / 10 ** 18
      
      setTokenPrice(tokenPrice);
      setAccounts(await web3.eth.getAccounts());
      SetContract(contract);
      setStartTime(startTime);
      setEndTime(endTime);
      }
    }
    fetchContract();
  }, [isConnected]);
  async function buyTokens(contract,tokenAmount,price) {
  try {
    const tx = await contract.methods
      .purchaseTokens(tokenAmount)
      .send({ from: accounts[0],value:price });
    console.log(tx);

  } catch (e) {
    console.log(e.message);
  }
}
  return (
      <div>
          <Header setIsConnected={setIsConnected}/>
          <div className="main-content" >
            <Timer endTime={endTime}/>
            <TokenAmount contract={contract} buyToken={buyTokens} tokenPrice={tokenPrice}/>
          </div>
      </div>
  );
}

export default App;
