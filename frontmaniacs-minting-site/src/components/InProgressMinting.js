import React from "react";
import ReactLoading from "react-loading";

const InProgressMinting = ({ hash }) => {
  const checkEtherscan = () => {
    const url = "https://goerli.etherscan.io/tx/" + hash;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div>Your NFT is being minted. Please wait.</div>
      <ReactLoading type="bubbles" color="#fff" />
      <div className="button" onClick={checkEtherscan}>
        CHECK ETHERSCAN HELLO
      </div>
    </div>
  );
};

export default InProgressMinting;
