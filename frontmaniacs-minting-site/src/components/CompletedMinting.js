import React from "react";

const CompletedMinting = () => {
  const viewOpenSea = () => {
    // View your collection on Testnet OpenSea (www.testnets.opensea.io)
    const url = "https://testnets.opensea.io/collection/frontmania";
    window.open(url, "_blank");
  };

  return (
    <div className="minting-success">
      <div>All set! You NFT has been minted.</div>
      <div className="button" onClick={viewOpenSea}>
        VIEW OPENSEA
      </div>
    </div>
  );
};

export default CompletedMinting;
