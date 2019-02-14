import { campaignContract } from "../web3/contracts/CampaignContract";
import { promiseify } from "../utilities/promise";

/**
 * Maps the campaign
 * @param {Object} campaign The campaign object
 * @returns {Object} The mapped object
 */
const mapCampaign = ({
  title,
  country,
  description,
  goalScore,
  ratioProject,
  startTimeDonations,
  runTimeDonations,
  startTimeCampaign,
  runTimeCampaign,
  startTimeVoting,
  runTimeVoting,
  donationInProgress,
  campaignInProgress,
  votingInProgress
}) => ({
  title,
  country,
  description,
  goalScore: parseInt(goalScore),
  ratioProject: parseInt(ratioProject),
  startTimeDonations: parseInt(startTimeDonations),
  runTimeDonations: parseInt(runTimeDonations),
  startTimeCampaign: parseInt(startTimeCampaign),
  runTimeCampaign: parseInt(runTimeCampaign),
  startTimeVoting: parseInt(startTimeVoting),
  runTimeVoting: parseInt(runTimeVoting),
  donationInProgress,
  campaignInProgress,
  votingInProgress
});

/**
 * Creates a fetch campaign action
 * @param {Error} error The potential error object
 * @param {boolean} isFetching Whether we are currently fetching
 * @param {Object} campaign The campaign object
 * @returns {Object} The redux action
 */
const fetchCampaignAction = (error, isFetching, campaign) => ({
  type: "FETCH_CAMPAIGN",
  campaign
});

/**
 * Fetches the campaign
 * @returns {Promise} The fetch promise
 */
export const fetchCampaign = () => dispatch => {
  dispatch(fetchCampaignAction(false, true));

  return Promise.all([
    promiseify(campaignContract.title.call)(),
    promiseify(campaignContract.country.call)(),
    promiseify(campaignContract.description.call)(),
    promiseify(campaignContract.goalScore.call)(),
    promiseify(campaignContract.ratioProject.call)(),
    promiseify(campaignContract.startTimeDonations.call)(),
    promiseify(campaignContract.runTimeDonations.call)(),
    promiseify(campaignContract.startTimeCampaign.call)(),
    promiseify(campaignContract.runTimeCampaign.call)(),
    promiseify(campaignContract.startTimeVoting.call)(),
    promiseify(campaignContract.runTimeVoting.call)(),
    promiseify(campaignContract.donationInProgress.call)(),
    promiseify(campaignContract.campaignInProgress.call)(),
    promiseify(campaignContract.votingInProgress.call)()
  ])
    .then(
      ([
        title,
        country,
        description,
        goalScore,
        ratioProject,
        startTimeDonations,
        runTimeDonations,
        startTimeCampaign,
        runTimeCampaign,
        startTimeVoting,
        runTimeVoting,
        donationInProgress,
        campaignInProgress,
        votingInProgress
      ]) => {
        dispatch(
          fetchCampaignAction(
            false,
            false,
            mapCampaign({
              title,
              country,
              description,
              goalScore,
              ratioProject,
              startTimeDonations,
              runTimeDonations,
              startTimeCampaign,
              runTimeCampaign,
              startTimeVoting,
              runTimeVoting,
              donationInProgress,
              campaignInProgress,
              votingInProgress
            })
          )
        );
      }
    )
    .catch(err => {
      return dispatch(fetchCampaignAction(err, false));
    });
};
