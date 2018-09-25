pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender); // create new contract that gets deploy to blockchain
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // resides in memory, notice there is no variable for a single Request
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; // needed due to not able to iterate approvals mapping to get count
        mapping(address => bool) approvals; // reference type, dont need to initialize
    } // its just a definition, not an instance, just like address... type
    
    Request[] public requests;
    address public manager;
    uint public minimumContributon;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContributon = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContributon);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) 
        public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        }); // create in memory
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index]; // make sure use storage because we want to modify the one on top
        require(approvers[msg.sender]); // make sure the user has contributed
        require(!request.approvals[msg.sender]); // make sure user has not voted
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    } 
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);
        
        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
}