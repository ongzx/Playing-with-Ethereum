# Playing around with Ethereum

> Smart contract is just marketing-speak for code that you can run on a blockchain.

# General
- there are many different ethereum network
- node is just any machine running ethereum client
- anyone can run a node just by install ethereum client
- each node will contain a full copy of the blockchain
- blockchain is a database that stores record of every transaction that take place
- transaction will take some time due to verification (mining)
- deployment of contract cost money
- a contract can create another contract
- querying the blockchain can be done from public node, meaning no Metamask/Mist is required

# Architecture
- Server role diminished
- updating/writing of data should not go through server anymore
- server should not save or contains user public/private keys
- client will have to be more intelligent, as writing to blockchain will be done in client

# Solidity
- 'msg' global variable (anytime a function run in a contract, always available)
..* msg.data -> the data field of transaction
..* msg.gas -> amount of available gas for current function invocation
..* msg.sender -> address of initiator
..* msg.value -> amount of ether(in wei) that was sent along
- **cannot transfer nested array through web3 to JS (e.g. colors=['red','blue','yellow'] will not work)**
- **cant generate random number like JS**
- there are a few options available to the address (e.g. transfer, ...)
- this.balance is the total amount of ether available in the current contract
- 'modifier' can be use for shared function
- every transaction is going to cost some gas (e.g, if transfer 2 ether to another address, the new amount will receive is slightly less than 2 ether)

# Storage vs Memory
- * storage and memory are referring to 2 separate topic (where contract stores data or how solidity variables store values)
... storage: holds data between function call (e.g variables, like computer hard drive)
... memory: temporary place to store data (e.g function arguments, like computer RAM)
... int[] storage myArray = numbers; (point to the same storage, changing value will affect the one in storage)
... int[] memory myArray = numbers; (point to a new copy in memory)

# Data Structure
- bool (true or false)
- int / uint (signed and unsigned integer)
- fixed / ufixed 
- address (20 bytes value of Ethereum address)
- fixed array (e.g. int[3] --> [1,2,3], unchanging length)
- dynamic array (e.g. int[] --> [1,2,3], size can change over time)
- mapping (collection of key value pairs, e.g. javascript object)
- struct (collection of key value pairs that can have different type)
```
struct Car {
    string make;
    string model;
    uint value;
}
```

# Mapping vs Array
- Array (linear time search)
- Mapping (constant time search)
... mapping(address => bool) public approvers; //default value will be false
... * Keys are not stored in Mappings (e.g. not able to get the keys like Javascript Object.keys)
... 'key' -> hashing function -> return index -> retrieve the value based on index
... values are not iterable, not able to loop inside Mapping, can only lookup value through mapping['key']
... all values exist in Mapping, if mapping['notexist'] will return **empty string** instead of undefined

# Metamask
- browser wallet (e.g. keychain that hold your keys)
- one account address throughout all network (main, ropsten, rinkedby...)
- public and private key are for authentication of fund transfering
- once the Metamask is installed, it will automatically inject web3 to any page of the browser

# Web3.js
- a collection of libraries which allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection.
- all calls through web3 return a promise (.then...)
- call() or send()

# Deployment
- contract source -> Solidity compiler -> produce ABI and bytecode -> bytecode will be deploy to network
- Truffle (https://truffleframework.com/) for contract creation, local test and deployment (still early, will break, not stable yet)

# ERC-20
- standard describing Ethereum tokens
- cryptocurrency built on the Ethereum blockchain

# Questions
- more nodes better? faster?
- now that we depends on Metamask on browser as provider. What happen if user doesn't have Metamask installed? What is the Metamask role? Is there any alternative?
- do we have to copy the address and abi everytime we deploy a contract to create local contract instance?
- what can we do to optimize the long time during transaction?
- when is the new block created in Ethereum?
- what is the relationship between contracts and blockchain?
- is the chain linear? how to visualize it?
- what is an instance of the contract? how to visualize in the context of ethereum blockchain?
- what happen when you deploy or delete a contract in Remix?
- how to decide the amount of gas when deploying contract? Is there any recommended amount?
- who maintain the testnet? 
- where the code physically resides in the blockchain?
- will my locally deploy contract be found in the rinkedby network? Once deployed, can I take it down?

# References
- https://hackernoon.com/ethereums-erc-20-tokens-explained-simply-88f5f8a7ae90