require('dotenv').config()
var zmq = require("zeromq"),
sock = zmq.socket("push");
const ethers = require('ethers')


const provider = new ethers.providers.InfuraProvider('mainnet',process.env.INFURA_KEY)

sock.bindSync("tcp://127.0.0.1:3000");
console.log("Producer bound to port 3000");

const filter = {
	topics: [
		'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
	]
}

provider.on(filter,(event)=>{
  //console.log(JSON.stringify(event))
  sock.send(JSON.stringify(event));
});
