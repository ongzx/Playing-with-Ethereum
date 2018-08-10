pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    constructor() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    function random() public view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        address thisAddress = this;
        uint balance = thisAddress.balance;
        players[index].transfer(balance);
        players = new address[](0);
        // this.balance is the total amount of ether in this contract
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _; // the rest of the code of the 'tagged' function will be replaced here
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
}