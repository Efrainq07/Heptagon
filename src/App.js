import React from 'react';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Album from './pages/Album';
import './App.css';
import { Link } from "react-router-dom";
import Player from "./components/AudioPlayer";
import { Layout } from "antd";
import { SearchOutlined, DownCircleOutlined } from "@ant-design/icons";

import Button from 'antd/lib/button';
import {handleConnectWallet} from './wallet/walletUtilities';
import {Tag} from "antd"
import { albumSongsQuery } from './graphql-api/APIQueries';

const { Content, Sider, Footer } = Layout;

const App = () => {
  const [currentContent, setCurrentContent] = useState();

  const [account, setAccount] = useState(undefined);
  const [web3modal, setWeb3modal] = useState();
  const [provider, setProvider] = useState();


  return (
    <>
      <Layout>
        <Layout>
          <Sider width={300} className="sideBar">

            {
              account?
              <>
                <Tag color="success">Connected to {account}</Tag>
                <Button type="primary" onClick={async ()=>{
                  await web3modal.clearCachedProvider();
                  setAccount(undefined);
                  setProvider();
                }}>
                  Disconnect  
                </Button>
              </>:
              <>
              <Button type="primary" onClick={
                () => {
                handleConnectWallet({
                  setAccount,
                  setWeb3modal,
                  setProvider
                })
                }}>
                 Connect Wallet
              </Button>
              <Button type="primary" onClick={()=>{albumSongsQuery("0x440c-0x03")}}>
                GraphQl
              </Button>  
              </>
            }           
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
            <Route path="/album" element={<Album setCurrentContent={setCurrentContent}/>} />
          </Routes>
          </Content>
        </Layout>
        <Footer className="footer">
          {currentContent &&
          <Player
            content={currentContent}
          />
          }
        </Footer>
      </Layout>
    </>
  );
}


export default App;
