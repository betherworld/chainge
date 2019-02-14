Preserving nature and limiting human impact on the environment belong to the most important global challenges of today. However, the planet can not be saved in one day: Environmental campaigns oftentimes fail not due to limited funds, but because short-term rewards are limited and because it is hard to measure the impact. Using blockchain technology, we propose a system that incentives citizens to not only preserve the environment they live in, but to actively participate as data gatherers and support individual campaigns. Donations are processed in a complete decentralized way and donors therefore have complete transparency of where their money is going. Additionally, they are reimbursed, in case their donations do not have the desired impact.

This is a project submission for the 2019 BETH "Blockchain School for Sustainability" hackathon. It was built for the "Wild AI" challenge by WWF and uses the Ethereum network. The current version is a functional (but admittedly hacky) prototype that runs on the XXX testnet.

The following students from ETH Zurich contributed to the project: Nico Hauser, David Rode, David Schmid, Ben Spöttling, Patrick Züst.

# Overview

![1550128728832](assets/1550128728832.png)

![1550128804700](assets/1550128804700.png)

Environmental campaigns are most successful, if they are supported by locacl citizens. Chainge campaigns thus allocate only a certain part of the campaign's total budget to environmental preservation measures. The rest goes towards rewarding citizens for their participation and supporting local communal initiatives, if the previously defined impact goals are met. This is checked by sensors that constantly monitor different environmental factors and secured by modern blockchain technology. Each campaign consists of three stages:

Immediately after the smart contract is submitted to the blockchain, the donation period starts. Donors can read information about the campaign on its website and donate Ether to support the cause. After a certain period of time, the campaign is initiated. Citizens now have the opportunity to complete actions that are created by the campaign initiator. They then get rewarded with Ether and a special voting token. Sensors are monitoring all the changes of environmental factors and save those values in an immutable blockchain. At the end of a campaign, it is automatically checked, whether the impact goals were met. If that is not the case, the remaining funds are returned to the donors proportionally to their initial investment. However, if the community was able to improve the environmental factors, the voting phase starts: Active gatherer can allocate their voting tokens towards different community initiatives and the remaining funds are split among those projects in regards to the token distribution.

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

- If the impact goals are met, active community members can participate in a vote about the allocation of the remaining funds. They can distribute their tokens to different projects according to their preferences. Tokens can not be traded to prevent fraudulent use.

- The smart contract automatically transfers the funds to the community projects proportionally to the allocated voting tokens. Neither the campaign initiator nor the donors can interfere in this process. 

- Blockchain technology is keeping track of every action and awarded token. Fraud and hacks are effectively prevented.

### Further development

- Community projects can currently only be initiated by the contract owner. In a future version, it might also be possible for community members to propose new projects, while the campaign is running. To prevent abuse, it would be necessary to verify those projects - either centrally by the campaign initiator or alternatively by the community members and/or the campaign donors.

## Gatherer

- The project initiator is able to define positive actions that the citizens can take to support the campaign. Each action automatically rewards a predefined amount of voting tokens and Ether to the citizen after successful completion.

### Further development

- Data submitted by gatherers is not processed or stored, as we are only working with test data.

- There is currently no verification system in place to check the submitted actions. This check could be performed either by the campaign initiator or (preferably) by other community members. This would demand a reputation score system: The trustworthiness of citizens decreases, if they consciously make false claims or if they verify claims that turn out to be false.

- Certain actions can be verified automatically by using technologies like image recognition and statistical analysis.

- The reward for certain actions could be set by an auction system, where citizens make bids for actions. This would lead to rewards that are more appropriate than if they are set by the campaign initiators.

## Ecosystem

- Sensors are sending data in regular intervals to the blockchain, where they are stored decentralized. The data is immutable and manipulations such that the impact goals are purposely not achieved are therefore not possible. 

# Technology


# Setup


# Thoughts on Scalability and Security
