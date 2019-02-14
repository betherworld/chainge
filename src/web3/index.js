import Web3 from "web3";

let web3 = window.web3;

if (window.web3) {
  web3 = window.web3;
} else {
  window.alert("Please install MetaMask!");
}

export default web3;
