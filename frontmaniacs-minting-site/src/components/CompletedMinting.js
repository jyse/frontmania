import React from "react";

const CompletedMinting = ({ address }) => {
  const viewOpenSea = () => {
    // my contract: 0x3690221b229de9e4f6d95ccf9fbbf2c12e84c3f0
    const url = `https://testnets.opensea.io/assets/goerli/${address}/0`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div>All set! You NFT has been minted.</div>
      <div className="button" onClick={viewOpenSea}>
        VIEW OPENSEA
      </div>
    </div>
  );
};

export default CompletedMinting;
