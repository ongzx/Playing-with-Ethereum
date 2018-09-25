const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "hand dinosaur weasel wet attack manage text album bless apple danger rocket",
  "https://rinkeby.infura.io/v3/71653e602141422296dbca840b188372"
);
const web3 = new Web3(provider);

const deploy = async () => {
  // mnemonics can use to generate many accounts
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({
      data: "0x" + compiledFactory.bytecode,
      arguments: ["hello world"]
    })
    .send({
      from: accounts[0],
      gas: "1000000"
    });

  console.log("Contract deployed to", result.options.address);
};

deploy();
