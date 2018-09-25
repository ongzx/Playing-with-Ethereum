const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');

// remove the entire build directory
fs.removeSync(buildPath); 

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts; // will contain Campaign and CampaignFactory contract

// create the build directory
fs.ensureDirSync(buildPath);
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') +'.json'), // to remove the : in front of contract name
        output[contract] // actual content of the contract
    )
}
