# Playing around with Ethereum

# General
- there are many different ethereum network
- node is just any machine running ethereum client
- anyone can run a node just by install ethereum client
- each node will contain a full copy of the blockchain
- blockchain is a database that stores record of every transaction that take place
- transaction will take some time due to verification (mining)

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

# Metamask
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

# Questions
- more nodes better? faster?
- now that we depends on Metamask on browser as provider. What happen if user doesn't have Metamask installed?
- do we have to copy the address and abi everytime we deploy a contract to create local contract instance?
- what can we do to optimize the long time during transaction?
