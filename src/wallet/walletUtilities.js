import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Web3 from "web3"
import { ethers } from "ethers" ;

import { handleAuth  } from './WalletConnect';

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, 
      options: {
        infuraId: "2DblxUByzOnOipHg8YnNNi3Z3lO", 
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

export const handleConnectWallet = async function connectWallet({setAccount,setWeb3modal,setProvider, setProviderexp}) {
    var provider = await web3modal.connect()

    await provider.enable();
    var web3 = new Web3(provider)
    const acc = await web3.eth.getAccounts(); 

    var provider2 =  new ethers.providers.Web3Provider(provider);

    
    handleAuth(web3,provider2);
    
    setAccount(acc[0]);
    setWeb3modal(web3modal); 
    setProvider(provider);
    setProviderexp(provider);
};