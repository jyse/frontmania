import { useEffect, useState } from "react";
import "./App.css";
import StartMinting from "./components/StartMinting";
import InProgressMinting from "./components/InProgressMinting";
import CompletedMinting from "./components/CompletedMinting";
import Header from "./components/Header";
import bgVideo from "./assets/backgroundVideo.mp4";
import nftImage from "./assets/1.png";
import { ethers } from "ethers";
import abi from "./manual/abi.json";

// Step 1: Run the app

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [account, setAccount] = useState();
  const [contract, setContract] = useState();
  const [supply, setSupply] = useState(0);
  const [hash, setHash] = useState();
  const [tokenId, setTokenId] = useState(0);

  const mint = async () => {
    // Step 6: Write the mint function

    try {
      const requiredPayment = ethers.utils.parseEther("0.0001"); // 0.0001 ether
      console.log(contract, "what is contract?");
      const tx = await contract.mint(tokenId, 1, {
        value: requiredPayment
      });
      console.log(tx, "what is tx?");
      setTokenId(tokenId++);
      setInProgress(true);
      await tx.wait();
      setHash(tx.hash);
      console.log("NFT minted successfully!");
      setInProgress(false);
      setCompleted(true);
    } catch (error) {
      console.log("error");
    }
  };
  const getTotalSupply = async () => {
    // Step 5: Contract => getTotalSupply()
    const totalSupply = await contract.totalSupply();
    setSupply(totalSupply.toNumber());
  };

  // Step 5: Contract => getTotalSupply()
  useEffect(() => {
    if (contract) {
      getTotalSupply();
    }
  }, [contract]);

  const login = async () => {
    // Step 2: Connect wallet (check Metamask + accounts)
    if (typeof window.ethereum !== "undefined") {
      console.log("Yayy Metamask is installed");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const walletAccount = accounts[0];
      console.log(walletAccount, "🦊 Metamask account!");
      setAccount(walletAccount);

      // Step 4: Wire up contract (provider, signer, NFTContract)
      const contractAddress = "0x1c9636cf3b7F4089a00Db1ca364b6C5D5f510865";

      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc-mumbai.matic.today"
      );
      // const signer = provider.getSigner(walletAccount);
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

      const NFTContract = new ethers.Contract(
        contractAddress,
        ["function mint(uint256 id, uint256 amount) payable"],
        wallet
      );
      console.log(NFTContract, "📝 NFT Contract");
      setContract(NFTContract);
    }
  };

  const getState = () => {
    if (inProgress) {
      // Step 10: Pass in the transaction hash to InProgressMinting Component and check this component
      return <InProgressMinting hash={hash} />;
    }

    if (completed) {
      // Step 12: Check this component
      return <CompletedMinting />;
    }

    // Step 8: Pass mint as props
    return <StartMinting mint={mint} />;
  };

  return (
    <div className="pp">
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
              <div className="information-header-container">
                <h4 className="information-subheader">
                  1st Frontmania NFT collection:
                </h4>
                <h1 className="information-header">Frontmaniacs </h1>
              </div>
              <div className="information-interactions-container">
                <p> {supply} / 1000 minted </p>
                {/* // Step 3: Render a mint button conditionally */}
                {/* // Step 7: insert getState() */}
                {account ? (
                  getState()
                ) : (
                  <div className="button connect" onClick={login}>
                    Connect Wallet
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="footer">
            <h2>Mint a NFT from FRONTMANIACS now!</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
