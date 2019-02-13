/**
 * Maps a blockchain campaign
 * @param {Object} campaign The bc campaign
 * @returns {Object} The mapped campaign
 */
const mapCampaign = campaign => ({
  title: campaign[0],
  description: campaign[1],
  ratioWwf: campaign[2],
  scoreGoal: campaign[3],
  actions: campaign[4] //string array
});

/**
 * Fetches the campaigns from the blockchain
 * @param {Object} web3 The web3 object
 * @returns {Promise} The fetch promise
 */
const fetchCampaigns = web3 => dispatch => ({});
