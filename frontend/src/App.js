import { useState } from "react";
import { ethers } from "ethers";
import { GUNI } from "../../src/abi/GuniArb.json";
import { legos } from "@studydefi/money-legos";
import './App.css';
import { use } from "chai";
import { DAI } from "@makerdao/dai-plugin-mcd";

const GUNIAddress = "0xf30cE3B3564D0D12b1B240013299c7f12Fd5bd0f";

function App() {
  const[userAccount, setUserAccount] = useState('')
  const[amount, setAmount] = useState(0)
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts'});
  }
  async function getBalance() {
    if(typeof window.ethereum !== 'undefined'){
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})// one account
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(legos.erc20.dai.address, legos.erc20.dai.abi, provider)
      const balance = await contract.balanceOf(account);

    }
  }

  async function investDai() {
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contract = new ethers.Contract(legos.erc20.dai.address, legos.erc20.dai.abi, signer)
      const transation = await contract.transfer(GUNIAddress, amount);
      await transation.wait();

    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick = {getBalance}> fetch Dai balance</button>
        <button onClick = {investDai}> send dai </button>
        <input
          onChange={e => setAmount(e.target.value)}
          placeholder = "Amount"
        />
      </header>
    </div>
  );
}

export default App;
