import React from "react";
import openSeaLogo from "../assets/openSeaLogo.svg";

const CompletedMinting = () => {
  const viewOpenSea = () => {
    // Step 13: View your collection on Testnet OpenSea
    const url = "https://testnets.opensea.io/collection/frontmaniacs-ultimate";

    // Step 14: In case you DON'T SEE your collection on Testnet OpenSea
    const nftURL =
      "https://testnets.opensea.io/assets/goerli/<contractAddress>/0";

    window.open(url, "_blank");
  };

  return (
    <div className="minting-success">
      <div>All set! You NFT has been minted.</div>
      <div className="button open-sea" onClick={viewOpenSea}>
        VIEW AT
        <img className="openSeaLogo" src={openSeaLogo} alt="logo" />
        OPENSEA
      </div>
    </div>
  );
};

export default CompletedMinting;
