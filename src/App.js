import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Album from './pages/Album';
import './App.css';
import './bonsai.css';
import { Link } from "react-router-dom";
import Player from "./components/AudioPlayer";
import { Layout, Menu } from "antd";
import Spotify from "./images/heptagon.png";
import { SearchOutlined, DownCircleOutlined } from "@ant-design/icons";


import Button from 'antd/lib/button';
import {handleConnectWallet} from './wallet/walletUtilities';
import {Tag} from "antd"
import { albumSongsQuery } from './graphql-api/APIQueries';

const { Content, Sider, Footer, Header } = Layout;



const items = [
  { label: 'item 1', key: 'item-1' }, 
  { label: 'item 2', key: 'item-2' }, 
];



const App = () => {
  let navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState();

  const [account, setAccount] = useState(undefined);
  const [web3modal, setWeb3modal] = useState();
  const [provider, setProvider] = useState();
  const [web3,setWeb3] = useState();
  const [mode, setMode] = useState('horizontal');
  const [providerexp, setProviderexp] = useState();
  const [Connectionexp, setConnectionexp] = useState();
  return (
    <>
      <Layout>
        <Layout>
          <Header height={300} className="topBar">
            
            <Menu mode={mode}>
              <Menu.Item disabled="false">
                <img src={Spotify} alt="Logo" className="logo"></img>
              </Menu.Item>
              <Menu.Item>
                <div class="vertical-center" className="searchBar">
                  <input type="text" placeholder="SEARCH" aria-label="Search"></input>
                </div>
              </Menu.Item>
              <Menu.Item>
                  <button id="home" class="grey" onClick={()=>{navigate("./")}}>HOME</button>
                  <button class="grey" onClick={()=>{navigate("./")}}>YOUR MUSIC</button>
                  <button class="grey" onClick={()=>{navigate("./")}} >RECENTLY PLAYED</button>
                  <button class="grey" onClick={()=>{ window.location.href='https://play.google.com/store/apps' }} >DOWNLOAD APP</button>
                  {account?
              <button class="grey" onClick={async ()=>{
                await web3modal.clearCachedProvider();
                setAccount(undefined);
                setProvider();
              }}>DISCONNECT</button>
              :
                  <button class="grey" onClick={
                () => {
                handleConnectWallet({
                  setAccount,
                  setWeb3modal,
                  setProvider,
                  setProviderexp
                })
                }}>CONNECT WALLET</button>
              }
              </Menu.Item>        
            </Menu>
          </Header>
          
          
          
          <Content className="contentWindow">
          <h1 class="leyenda">HEPTAGON, DECENTRALIZED MUSIC</h1>
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
