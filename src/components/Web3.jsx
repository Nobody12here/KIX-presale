import Web3 from 'web3';

async function connectToWeb3(setIsConnected,setAccount) {
  if(window.ethereum) {
      const addresses = await window.ethereum.request({method:"eth_requestAccounts"})
      const web3 = new Web3(window.ethereum)
      setAccount(addresses[0])
      setIsConnected(true)
      return web3;
    }
  else {
    alert("Please install Metamask")
  }
}

export default connectToWeb3;
