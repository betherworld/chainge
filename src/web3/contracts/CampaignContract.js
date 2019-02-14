import web3 from "../index";
import ContractAbi from "../../contracts/Campaign.json";

const CAMPAIGN_ADDRESS = process.env.CAMPAIGN_ADDRESS;

export const campaignContract = web3.eth
  .contract(ContractAbi)
  .at(CAMPAIGN_ADDRESS);
