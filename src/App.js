import React from 'react';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Album from './pages/Album';
import './App.css';
import { Link } from "react-router-dom";
import Player from "./components/AudioPlayer";
import { Layout } from "antd";
import Spotify from "./images/Spotify.png";
import { SearchOutlined, DownCircleOutlined } from "@ant-design/icons";

import Button from 'antd/lib/button';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3"
import {createClient} from 'urql'
import { ethers } from "ethers" ;
import { handleAuth  } from './wallet/WalletConnect';

const { Content, Sider, Footer } = Layout;

const App = () => {
  const [account, setaccount] = useState("undefined");
  const [nftAlbum, setNftAlbum] = useState();
  const [connection, setConnection] = useState();
  const [provider, setProvider] = useState();
  const [provider2, setProvider2] = useState();

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
  const handleConnectWallet = async function connectWallet() {
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

    const acc = await web3.eth.getAccounts(); 

    var provider2 =  new ethers.providers.Web3Provider(provider);
    setaccount(acc[0])
    setConnection(web3)
    setProvider(provider2)
};

  return (
    <>
      <Layout>
        <Layout>
          <Sider width={300} className="sideBar">
            <Button type="primary" onClick={(handleConnectWallet)}>
               Connect Wallet and {account}
            </Button>
             { {account} =="undefined"?  "": {account}[0]  }

             <Button type='primary' onClick={()=> {handleAuth(connection,provider)} } > Autenticate men </Button>
            <div className="searchBar">
              <span> Search </span>
              <SearchOutlined style={{ fontSize: "30px" }} />
            </div>
            <Link to="/">
            <p style={{ color: "#1DB954" }}> Home </p>
            </Link>
            <p> Your Music </p>
            <div className="recentPlayed">
              <p className="recentTitle">RECENTLY PLAYED</p>
              <div className="install">
                <span> Install App </span>
                <DownCircleOutlined style={{ fontSize: "30px" }} />
              </div>
            </div>
          </Sider>
          <Content className="contentWindow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album" element={<Album setNftAlbum={setNftAlbum}/>} />
          </Routes>
          </Content>
        </Layout>
        <Footer className="footer">
          {nftAlbum &&
          <Player
            url={nftAlbum}
          />
          }
        </Footer>
      </Layout>
    </>
  );
}


export default App;
