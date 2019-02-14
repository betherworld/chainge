const Web3 = require("web3");

const CONRACT_ABI = require("../src/contracts/Campaign.json");

const MY_ADDRESS = "ADDRESS_THAT_SENDS_TRANSACTION";
const PRIVATE_KEY = Buffer.from("YOUR_PRIVATE_KEY", "hex");
const CAMPAIGN_ADDRESS = "0x5af03731729017244c417792239fff9260a8f21c";

const args = process.argv.slice(2);
const campaignContract = web3.eth.contract(CONRACT_ABI).at(CAMPAIGN_ADDRESS);
const web3 = new web3(new web3.providers.HttpProvider("http://10.5.94.0:7545"));

campaignContract.getGatherersToken.call(account, (err, voteTokens) => {
  if (err) {
    return dispatch(fetchAccountAction(err, false));
  }

  dispatch(fetchAccountAction(false, false, account, parseInt(voteTokens)));
});
