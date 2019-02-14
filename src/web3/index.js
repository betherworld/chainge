require("web3");

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    ethereum.enable().catch(() => {
      alert("cannot work without access!");
    });
  } catch (error) {
    // User denied account access...
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  window.web3 = new Web3(web3.currentProvider);
}
// Non-dapp browsers...
else {
  alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

export default window.web3;
