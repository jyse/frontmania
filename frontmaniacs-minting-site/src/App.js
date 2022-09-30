import { useState, useEffect } from "react";
import "./App.css";
import abi from "./contracts/contract.json";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import { ethers } from "ethers";
import Header from "./components/Header";
import bgVideo from "./assets/backgroundVideo.mp4";
import nftImage from "./assets/NFT05.png";

function App() {
  const [account, setAccount] = useState();
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [supply, setSupply] = useState(0);
  const [contract, setContract] = useState();
  const [hash, setHash] = useState("");

  const mint = async () => {
    console.log("minting");
    const options = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.safeMint(1, options);
    console.log(transaction, "transaction here ");
    setHash(transaction.hash);

    //We are in progress
    setInProgress(true);
    await transaction.wait();

    //We are done
    setInProgress(false);
    setCompleted(true);
  };

  useEffect(() => {
    if (contract) {
      getTotalSupply();
    }
  }, [contract]);

  const getTotalSupply = async () => {
    //get totalSupply of NFTs minted up until now (current supply actuallyt)
    const totalSupply = await contract.totalSupply();
    setSupply(totalSupply.toNumber());
  };

  const login = async () => {
    console.log("logging in");
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const walletAccount = accounts[0];
      setAccount(walletAccount);
      const contractAddress = "0x2d8e7ecCF431fD546FC85cE802848E74E6aE3171";
      // CONNECT CONTRACT TO ETHERS

      // Connect to the network
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Signer
      const signer = provider.getSigner(walletAccount);

      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      let NFTContract = new ethers.Contract(contractAddress, abi, signer);

      setContract(NFTContract);
      getTotalSupply();
    }
  };

  const getState = () => {
    if (inProgress) {
      return <InProgressMinting hash={hash} />;
    }

    if (completed) {
      return <CompletedMinting />;
    }

    return <StartMinting mint={mint} />;
  };

  return (
    <div className="app">
      <Header />
      <div className="hero">
        <video className="bg-video" loop autoPlay muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="card">
          <div className="main">
            <div className="nft-section">
              <img className="nft-image" src={nftImage} alt="image" />
            </div>
            <div className="information">
              <h2> 1st Frontmania NFT Collection:Frontmaniacs </h2>
              <p>{supply} minted / 200</p>
              {account ? (
                getState()
              ) : (
                <div className="connect-button" onClick={login}>
                  <h3>CONNECT WALLET</h3>
                </div>
              )}
            </div>
          </div>
          <div className="footer">MINTING NOW</div>
        </div>
      </div>
    </div>
  );
}

export default App;
