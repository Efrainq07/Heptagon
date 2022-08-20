import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3"


var account = null
var contract = null

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "2DblxUByzOnOipHg8YnNNi3Z3lO" // required
      }
    }
  };

const web3modal = new Web3Modal(
    {
        network : "mumbai",
        theme : "dark",
        cacheProvider : true,
        providerOptions
    }
);

export default async function connectWallet() {
    var provider = await web3modal.connect()

    var web3 = new Web3(provider)

    await window.ethereum.send('eth_requestAccounts')
    var accounts = await web3.eth.getAccounts()
    account = accounts[0]
    document.getElementById('wallet-address').textContent = account; 
    //contract = new web3.eth.Contract(ABI, ADDRESS);
};