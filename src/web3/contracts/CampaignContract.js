import web3 from "../web3";

export const CampaignContract = new web3.eth.Contract(
  JsonCampaignContract,
  "ADDRESS_ON_BLOCKCHAIN"
);
