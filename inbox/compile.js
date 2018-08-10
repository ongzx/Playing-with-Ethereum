const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// because currently we only have 1 contract, so we can just export only the required contract "Inbox"
module.exports = solc.compile(source, 1).contracts[':Inbox'];