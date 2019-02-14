const Web3 = require("web3");
const Tx = require("ethereumjs-tx");

const CONRACT_ABI = require("../src/contracts/Campaign.json");

const MY_ADDRESS = "0xd1749fE1026F6c4BA3EC2B22609479Ba19fe3ebD";
const PRIVATE_KEY = Buffer.from(
  "6aad02f1da6c1438c6a7d0fe79fe70ab514db0cfa104bc7073f90c1210366909",
  "hex"
);
const CAMPAIGN_ADDRESS = "0xAAF017caF5A621D0f0deBE1dc9C0E188d3400D3d";

const [
  lat = 0,
  long = 0,
  temperature = 0,
  humidityAir = 0.0,
  humidityGround = false
] = process.argv.slice(2);

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
web3.eth.defaultAccount = MY_ADDRESS;
const campaignContract = web3.eth.contract(CONRACT_ABI).at(CAMPAIGN_ADDRESS);

console.log(
  "Submitting lat:",
  lat,
  "long:",
  long,
  "temperature:",
  temperature,
  "humidityAir:",
  humidityAir,
  "humidityGround:",
  humidityGround
);

web3.eth.getTransactionCount(MY_ADDRESS, (err, result) => {
  const nounce = result;

  const nounceHex = web3.toHex(nounce);
  const gasPrice = web3.eth.gasPrice;
  const gasPriceHex = web3.toHex(gasPrice);
  const gasLimitHex = web3.toHex(3000000);

  const rawTransaction = {
    from: MY_ADDRESS,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    gas: gasLimitHex,
    to: CAMPAIGN_ADDRESS,
    value: 0,
    data: campaignContract.saveData.getData(
      lat,
      long,
      temperature,
      humidityAir,
      humidityGround
    ),
    nonce: nounceHex
  };

  const transaction = new Tx(rawTransaction);
  transaction.sign(PRIVATE_KEY);

  console.log(transaction);

  const serializedTx = transaction.serialize();
  web3.eth.sendRawTransaction(
    "0x" + serializedTx.toString("hex"),
    (err, hash) => {
      if (err) {
        return console.error(err);
      }
      console.log("Successfully pushed to the chain!");
      console.log(hash);
    }
  );
});
