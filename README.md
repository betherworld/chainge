Preserving nature and limiting human impact on the environment belong to the most important global challenges of today. However, the planet can not be saved in one day: Environmental campaigns oftentimes fail not due to limited funds, but because short-term rewards are limited and because it is hard to measure the impact. Using blockchain technology, we propose a system that incentives citizens to not only preserve the environment they live in, but to actively participate as data gatherers and support individual campaigns. Donations are processed in a complete decentralized way and donors therefore have complete transparency of where their money is going. Additionally, they are reimbursed, in case their donations do not have the desired impact.

This is a project submission for the 2019 BETH "Blockchain School for Sustainability" hackathon. It was built for the "Wild AI" challenge by WWF and uses the Ethereum network. The current version is a functional (but admittedly hacky) prototype that runs on the XXX testnet.

The following students from ETH Zurich contributed to the project: Nico Hauser, David Rode, David Schmid, Ben Spöttling, Patrick Züst.

# Overview

![1550128728832](assets/1550128728832.png)

![1550128804700](assets/1550128804700.png)

Environmental campaigns are most successful, if they are supported by locacl citizens. Chainge campaigns thus allocate only a certain part of the campaign's total budget to environmental preservation measures. The rest goes towards rewarding citizens for their participation and supporting local communal initiatives, if the previously defined impact goals are met. This is checked by sensors that constantly monitor different environmental factors and secured by modern blockchain technology. Each campaign consists of three stages:

Immediately after the smart contract is submitted to the blockchain, the donation period starts. Donors can read information about the campaign on its website and donate Ether to support the cause. After a certain period of time, the campaign itselfs is initiated. Citizens now have the opportunity to complete actions that are created by the campaign initator. They then get rewarded with Ether and a special voting token. Sensors are monitoring all the changes of environmental factors and save those values in an immutable blockchain. At the end of a campaign, it is automatically checked, whether the impact goals were met. If that is not the case, the remaining funds are returned to the donors proportionally to their initial investment. However, if the community was able to improve the environmental factors, the voting phase starts: Active gatherer can allocate their voting tokens towards different community initiatives and the remaining funds are split among those projects in regards to the token distribution.

Terminologoy

# Features

## Donors

- Information about a campaign and specific impact goals are displayed on the website. Those details are stored in a blockchain and it is hence impossible to change them retrospectively.

- Donors can make an Ether donation to the Campaign, if they are convinced of the specific parameters and impact goals. The funds are then stored in a decentralized smart contract and can therefore only be used for their intended purpose. This can easily be verified by donors as well as regulators - there is no need to trust a middleman.

- A previously defined split of the donations is automatically sent to the initiator of the campaign. It is however not possible to claim any other donations.

- In case the campaign goals are not met, the remaining funds are reimbursed automatically to the donors. This is a reassurance for them, but also an incentive for the citizens and the project initiator.

### Further development

- Donors could be allowed to explicitly state, how much of their money should go towards the environmental campaign and how much towards the community project. 

- With the data gathered during a campaign, it is possible to automatically generate regular updates for donors.
  

## Community 

- The local community is incentivized to participate in data-collection and nature-preservation actions, as they are awarded voting tokens for every successful action. This ultimately benefits the community and is hence a short-term reward for environmental actions.

- If the impact goals are met, active community members can participate in a vote about the allocation of the remaining funds. They can distribute their tokens to different projects according to their preferences.

- The Smart Contract automatically transfers the funds to the community projects proportionally to the allocated voting tokens.

- Blockchain technology is keeping track of every action and awarded token. Fraud and shadow economy are effectively prevented.

### Further development



## Gatherer


## Ecosystem


# Technology


# Setup


# Thoughts on Scalability and Security
