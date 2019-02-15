pragma solidity ^0.5.0;

contract Campaign {
    
    // parameters of a campaign
    string public title;
    string public country;
    string public description;
    uint public goalScore;
    uint public ratioProject;
    address payable owner;
    uint paymentBaseUnit;
    
    uint totalBalance;
    uint precision = 10000;
    address sensorAccount;

    uint achievedScore;

    // duration of the individual stages of a campaign
    uint public startTimeDonations;
    uint public runTimeDonations;
    uint public startTimeCampaign;
    uint public runTimeCampaign; 
    uint public startTimeVoting;
    uint public runTimeVoting; 
    
    // object that definies a community project
    struct CommunityProject {
        string title;
        string description;
        uint voteCount;
        address payable account;
    }

    CommunityProject[] public communityProjects;

    function getCommunityProjectsLength() external view returns (uint){
        return communityProjects.length;
    }
    
    // how much money has each donor donated?
    mapping (address => uint) donorsAmount;
    mapping (uint => address) idDonor;
    address[] donors;
    uint[] donorsShare;
    
    // how many tokens has each gatherer earned?
    mapping (address => uint) gatherersToken;

    function getGatherersToken(address addr) external view returns (uint){
        return gatherersToken[addr];
    }
    address[] gatherers;
    
    // booleans indicating the stage the campaign is currently in
    bool public donationInProgress;
    bool public campaignInProgress;
    bool public votingInProgress;
        
    constructor() public {
        owner = msg.sender;

        _createCampaign();
        _createAllCommunityProjects();
        _createInitialActions();

        donationInProgress = true;
        startTimeDonations = now;
    }
    
    // creates a sample campaign. parameters could be sent by a web interface in a final version
    function _createCampaign() internal {
        title = "Save the Bisons!";
        description = "This is a sample Campaign to demonstrate the power of blockchain technology.";
        country = "Romania";
        goalScore = 1;
        ratioProject = 60;
        paymentBaseUnit = 10 finney;

        runTimeDonations = 30 seconds;
        runTimeCampaign = 30 seconds;
        runTimeVoting = 30 seconds;
    }
    
    // creates two sample community projects. parameters could be sent by a web interface in a final version
    function _createAllCommunityProjects() internal {
        addCommunityProject(
            "Schools 4 Everybody", 
            "Eductation is extremely important. We want to make it available to all the children in our village.",
            0x0fb4256f2dF60eab5788a0e413C7C30b3AfB5333
        );
        
        addCommunityProject(
            "Build a Wall", 
            "I want a big, beautiful wall. It will be the best wall. And the Bulgarians will pay for it.",
            0x0fb4256f2dF60eab5788a0e413C7C30b3AfB5333
        );
    }

    // creates three sample actions. parameters could be sent by a web interface in a final version
    function _createInitialActions() internal {
        Action memory action1 = Action(
            "Take a picture of a bison", 
            "You can use your smartphone, but a camera would be better.",
            4,
            false,
            0,
            false,
            "",
            0x0fb4256f2dF60eab5788a0e413C7C30b3AfB5333
        );
        actions.push(action1);

        Action memory action2 = Action(
            "Repair a sensor", 
            "Make sure to bring your hammer - shouldn't take more than five minutes.",
            2,
            false,
            0,
            false,
            "",
            0x0fb4256f2dF60eab5788a0e413C7C30b3AfB5333
        );
        actions.push(action2);

        Action memory action3 = Action(
            "Look for traces in the streambed", 
            "We're expecting to see wolf or bear traces - take a picture to prove that you were there.",
            1,
            false,
            0,
            false,
            "",
            0x0fb4256f2dF60eab5788a0e413C7C30b3AfB5333
        );
        actions.push(action3);
    }
    
    // default function that processes donations, which are sent to the contract
    function() external payable {
        require(donationInProgress, "donation not in progress");
        if(donorsAmount[msg.sender] == 0) {
            donors.push(msg.sender);
        }
        donorsAmount[msg.sender] += msg.value;
    }
    
    // forwards a share of the funds to the campaign initiator and starts the campaign
    function startCampaign() external {
        require(donationInProgress, "donation not in progress");
        require(now >= startTimeDonations + runTimeDonations, "too soon, donations time not yet up.");

        _calculateDonorsShare();
        startTimeCampaign = now;
        donationInProgress = false;
        campaignInProgress = true;

        uint forOwner = (address(this).balance / 100) * ratioProject;
        owner.transfer(forOwner);        
    }
    
    // calculates the share of each donor, in case the impact goals are not met
    // and the money needs to be returned
    function _calculateDonorsShare() internal {
        totalBalance = address(this).balance;
        for(uint i = 0; i < donors.length; i++) {
            address donorAddress = donors[i];
            uint donation = donorsAmount[donorAddress];
            uint share = (donation * precision) / totalBalance;
            donorsShare.push(share);
        }
    }
    
    // if the impact goals are not met, the remaining funds are sent back
    // to the donors proportional to their original investment.
    function _refund() internal {
        uint totalRefund = address(this).balance;
        for(uint i = 0; i < donors.length; i++) {
            uint refundAmount = (totalRefund / precision) * donorsShare[i];
            address payable donorAddress = address(uint160(donors[i]));
            donorAddress.transfer(refundAmount);
        }
        //in case there are some (very small funds) remaining, send it to the owner
        owner.transfer(address(this).balance);
    } 
    
    // when campaign stage is over, this function checks the completion of the impact goals
    // and proceeds accordingly
    function startVoting() external {
        require(campaignInProgress, "campaign not in progress");
        require(now >= startTimeCampaign + runTimeCampaign, "too soon, campaign time not yet up");
        if(_impactGoalsAchieved() == false) {
            _refund();
        } else {
            startTimeVoting = now;
            campaignInProgress = false;
            votingInProgress = true;
        }
    }
    
    // terminates the voting phase and triggers the payout to community projects
    function endVoting() external {
        require(votingInProgress, "voting not in progress");
        require(now >= startTimeVoting + runTimeVoting, "too soon, voting time not yet up");
        votingInProgress = false;
        //pay out according to tokens invested
        payout();
    }


    /// * VOTING *

    uint voteCountTotal;

    event votedEvent (
        uint indexed communityProjectId
    );

    // voting for community projects
    function vote(uint _communityProjectId, uint _voteCount) public {
        // check if voting is in progress
        require(votingInProgress, "Voting not in progress");

        // require that they haven sufficient votingTokens
        /* msg.sender: address of the function caller */
        require(gatherersToken[msg.sender] >= _voteCount, "The sender doesn't have enough tokens!");

        // require a valid CommunityProject
        require(_communityProjectId >= 0 && _communityProjectId < communityProjects.length, "The given CommunityProject id is invalid!");

        // reduce votingToken count 
        gatherersToken[msg.sender] -= _voteCount;

        // update CommunityProject vote Count
        communityProjects[_communityProjectId].voteCount += _voteCount;

        voteCountTotal += _voteCount;

        //trigger vote event
        emit votedEvent(_communityProjectId);
    }
    
    // releases fund to community projects proportionally to the voting tokens received
    function payout() private{
        for(uint i = 0; i < communityProjects.length; i++) {
            CommunityProject memory communityProject = communityProjects[i];
            uint votesReceived = communityProject.voteCount;
            uint share = (votesReceived * precision) / voteCountTotal;
            uint payOutAmount = (voteCountTotal / precision) * share;
            communityProject.account.transfer(payOutAmount);
        }
    }
    
    // adds a community project to the array
    function addCommunityProject(string memory _name, string memory _description, address payable _account) private {
        communityProjects.push(CommunityProject(_name, _description, 0, _account));
    }



    // ***** SENSORS *******
    
    // the contract owner is able to set the addresses of the sensor modules that are allowed to send data
    function setSensorAccount(address _sensorAccount) public {
        require(msg.sender == owner, "you are not the owner of the contract");
        sensorAccount = _sensorAccount;
    }
    
    // object that stores that available sensor data
    struct Data {
        uint lat;
        uint long;
        uint temperature;
        uint humidityAir;
        bool humidityGround;
    }

    Data[] dataPoints;

    // receives sensor data and stores it in the blockchain
    function saveData(uint lat, uint long, uint temperature, uint humidityAir, bool humidityGround) external {
        require(msg.sender == sensorAccount, "You're now allowed to send data!");
        dataPoints.push(Data(lat, long, temperature, humidityAir, humidityGround));
    }
    
    //check, whether impactGoals were achieved
    function _impactGoalsAchieved() internal returns (bool) {
        return achievedScore >= goalScore;
    }



    // ***** actions *****
    
    // action that data gatherers can take
    // 'done' indicates, whether somebody claims to have completed that action
    // 'proofing type indicates, how an action can be verified
    // 'verified' indicates, whether the completion of a certain action was already verified
    struct Action{
        string title;
        string description;
        uint reward;
        bool done;
        uint proofingType;
        bool verified;
        string submissionData;
        address payable user;
    }
    Action[] public actions;
    function getActionsLength() external view returns (uint) {
        return actions.length;
    }
    
    // contract owner can define actions, which award ether / tokens to citizens
    function createAction(string memory _actionTitle, string memory _actionDescription, uint _actionReward, uint _actionProovingType) public{
        require(msg.sender == owner, "only campaign owner is allowed to create actions");
        require(address(this).balance > 0, "no balance");
        actions.push(Action(_actionTitle, _actionDescription, _actionReward, false, _actionProovingType, false, "", address(0)));
    }
    
    // citizens claim that they fulfilled an action and send data to prove it
    function submitAction(uint _actionId, string memory _actionSubmissionData) public {
        require(actions[_actionId].done == false, "action is already done by other user");
        actions[_actionId].user = msg.sender;
        actions[_actionId].submissionData = _actionSubmissionData;
        actions[_actionId].done = true;

        //Automatically verifies all the submissions. Needs to be adjusted in a final version
        //verifySubmission(_actionId);
    }
    
    // each type of action has a different type of verification (social, statistical, etc.). this is a sample function
    function _checkSubmissionType0(uint _actionId) internal returns (bool){
        return true;
    }
    
    // checks, whether citizens actually fulfilled the action they claim to have done
    function verifySubmission(uint _actionId) public{
        require(_actionId < actions.length, "there is no action with this id");
        require(actions[_actionId].done == true, "action is not done yet");
        require(actions[_actionId].verified == false, "action is already verified");
        uint actionType = actions[_actionId].proofingType;
        bool verificationSuccessful;

        if(actionType == 0) {
            verificationSuccessful = _checkSubmissionType0(_actionId);
        }
        //Additional actionTypes

        if(verificationSuccessful) {
            actions[_actionId].verified = true;
            _getReward(_actionId);
        } else {
            actions[_actionId].done = false;
        }
    }
    
    // voting tokens and Ether are rewarded for verified actions proportionally to its complexity
    function _getReward(uint _actionId) internal {
        Action memory action = actions[_actionId];
        gatherersToken[action.user] += action.reward;
        action.user.transfer(action.reward * paymentBaseUnit);
    }


    // ***** DEBUGGING *****

    function getTokens(address addr, uint num) public{
        gatherersToken[addr] += num;
    }

    function testFunction() public returns (bool) {
        return true;
    }

    function setTokens(address addr, uint num) public{
        gatherersToken[addr] += num;
    }

    function setScore(uint _score) external {
        achievedScore = _score;
    }

} 
