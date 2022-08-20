import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3"


var account = null
var contract = null

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "2DblxUByzOnOipHg8YnNNi3Z3lO", // required
        rpc: {
          80001: "https://polygon-mumbai.infura.io/v3/9f59f26af4144269a44b8ce1c426d028"
          },
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

// export default async function connectWallet() {
//     var provider = await web3modal.connect()

//     await provider.enable();
//     var web3 = new Web3(provider)

//     await window.ethereum.send('eth_requestAccounts')
//     var accounts = await web3.eth.getAccounts()
//     account = accounts[0]
//     document.getElementById('wallet-address').textContent = account; 
//     //contract = new web3.eth.Contract(ABI, ADDRESS);
// };

export default async function connectWallet() {
    console.log("yes")
    var provider = await web3modal.connect()

    await provider.enable();
    var web3 = new Web3(provider)

    // Subscribe to accounts change
    provider.on("accountsChanged", function (accounts) {
      console.log(accounts);
    });
    // Subscribe to chainId change
    provider.on("chainChanged", function (chainId) {
      console.log(chainId);
    });
    // Subscribe to session disconnection
    provider.on("disconnect", function (code, reason) {
      console.log(code, reason);
    });
    const account = web3.eth.accounts.currentProvider.accounts[0] 
    
    
};