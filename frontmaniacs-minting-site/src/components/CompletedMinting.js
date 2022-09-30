import React from "react";

const CompletedMinting = ({ address }) => {
  const viewOpenSea = () => {
    const url =
      "https://testnets.opensea.io/collection/web3builders-eg7du07ybm";
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
