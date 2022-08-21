import React from 'react';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Album from './pages/Album';
import './App.css';
import './bonsai.min.css';
import { Link } from "react-router-dom";
import Player from "./components/AudioPlayer";
import { Layout } from "antd";
import Spotify from "./images/heptagon.png";
import { SearchOutlined, DownCircleOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


const { Content, Sider, Footer, Header } = Layout;



const items = [
  { label: 'item 1', key: 'item-1' }, 
  { label: 'item 2', key: 'item-2' }, 
];



const App = () => {

  const [nftAlbum, setNftAlbum] = useState();
  const [mode, setMode] = useState('horizontal');
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
                <div className="searchBar">
                <span> Search </span>
                <SearchOutlined style={{ fontSize: "30px" }} />
                </div>
              </Menu.Item>
              <Menu.Item>
                <Link to="/">
                <p style={{ color: "#1DB954" }}> Home </p>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/">
                <p style={{ color: "#1DB954" }}> Your Music </p>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/">
                <p style={{ color: "#1DB954" }}> Recently Played </p>
                </Link>    
              </Menu.Item>
              <Menu.Item>
                <div className="install">
                  <span> Install App </span>
                  <DownCircleOutlined style={{ fontSize: "30px" }} />
                </div>
              </Menu.Item>           
            </Menu>

          </Header>
          
          
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
