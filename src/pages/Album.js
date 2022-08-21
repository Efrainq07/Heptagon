import React,{useState,useEffect} from "react";
import { useLocation } from "react-router";
import "./Album.css";
import { getAlbumContent } from "../media/albumData";
import Opensea from "../images/opensea.png";
import { ClockCircleOutlined } from "@ant-design/icons";


const Album = ({ setCurrentContent }) => {
  const { state: albumDetails } = useLocation();
  const [content, setAlbumContent] = useState();

  useEffect(() => {
      getAlbumContent(albumDetails.publicationId).then((content) => {
        setAlbumContent(content)
        });
  }, []);


  return (
    <>
      <div className="albumContent">
        <div className="topBan">
          <img
            src={albumDetails.image}
            alt="albumcover"
            className="albumCover"
          ></img>
          <div className="albumDeets">
            <div>ALBUM</div>
            <div className="title">{albumDetails.title}</div>
            <div>
              {content && content.length} Songs
            </div>
          </div>
        </div>
        <div className="topBan">
          <div className="playButton" onClick={() => setCurrentContent(content)}>
            PLAY
          </div>
          <div
            className="openButton"
          >
            OpenSea
            <img src={Opensea} className="openLogo" />
          </div>
        </div>
        <div className="tableHeader">
          <div className="numberHeader">#</div>
          <div className="titleHeader">TITLE</div>
          <div className="numberHeader">
            <ClockCircleOutlined />
          </div>
        </div>
        {content &&
          content.map((song, i) => {
            return (
              <>
                <div className="tableContent">
                  <div className="numberHeader">{i + 1}</div>
                  <div
                    className="titleHeader"
                    style={{ color: "rgb(205, 203, 203)" }}
                  >
                    {song.title}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Album;
