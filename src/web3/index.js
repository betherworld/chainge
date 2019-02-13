import Web3 from "web3";

let web3 = window.web3;
export let ready = false;

/*if (window.ethereum) {
  web3 = new Web3(ethereum);
  // Request account access if needed
  ethereum
    .enable()
    .then(() => {
      ready = true;
    })
    .catch(error => {
      // User denied account access...
      alert("We cannot do anything without account access :(");
    });
}
// Legacy dapp browsers...
else */ if (
  window.web3
) {
  web3 = new Web3(web3.currentProvider);
  ready = true;
}
// Non-dapp browsers...
else {
  window.alert("Please install MetaMask!");
}

export default web3;
