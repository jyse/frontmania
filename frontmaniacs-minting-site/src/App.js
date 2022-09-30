import { useState, useEffect, useCallback } from "react";
import "./App.css";
import abi from "./contracts/contract.json";
import bgVideo from "./assets/background.mp4";
import nftVideo from "./assets/nftvideo.mp4";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState();
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [supply, setSupply] = useState(0);
  const [contract, setContract] = useState();

  const mint = async () => {
    const options = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.safeMint(1, options);
    console.log(transaction);
    setInProgress(true);

    // we are in progress
    await transaction.wait();
    setInProgress(false);
    setCompleted(true);
  };

  const getTotalSupply = useCallback(async () => {
    //get totalSupply of NFTs minted up until now (current supply actuallyt)
    const totalSupply = await contract.totalSupply();
    console.log(totalSupply, "what is totaly Suppy here?");
    setSupply(totalSupply.toNumber());
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getTotalSupply();
    }
  }, [contract, getTotalSupply]);

  const login = async () => {
    console.log("logging in");
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAccount = accounts[0];
      setAccount(walletAccount);
      const contractAddress = "0x3690221B229de9E4f6d95CCf9fBBf2c12E84C3F0";
      // CONNECT CONTRACT TO ETHERS

      // Connect to the network
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Signer
      const signer = provider.getSigner(walletAccount);

      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let NFTContract = new ethers.Contract(contractAddress, abi, signer);
      console.log(NFTContract, "what is in contract? 📝");

      setContract(NFTContract);
      getTotalSupply();
    }
  };

  const getState = () => {
    if (inProgress) {
      return <InProgressMinting />;
    }

    if (completed) {
      return <CompletedMinting />;
    }

    return <StartMinting mint={mint} />;
  };

  return (
    <div className="app">
      <video className="bg-video" loop autoPlay muted>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="card">
        <div className="main">
          <div className="nft-image">
            <video className="nft-video" loop autoPlay muted>
              <source src={nftVideo} type="video/mp4" />
            </video>
          </div>
          <div className="information">
            <h2>YOOOO:INTO THE METAVERSE</h2>
            <p>{supply} minted / 200</p>
            {account ? (
              getState()
            ) : (
              <div className="button" onClick={login}>
                <h3>CONNECT WALLET</h3>
              </div>
            )}
          </div>
        </div>
        <div className="footer">MINTING NOW</div>
      </div>
    </div>
  );
}

export default App;
