// Frameworks
import React from "react";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

// Utils
import { useState, useEffect, useRef } from "react";

// Configs
import FIREBASE_CONFIG from "../firebaseConfig";

// Styles
import "./Home.css";

// Components
import Skeleton from "react-loading-skeleton";
import Project from "./Project";
import ReactMarkdown from "react-markdown";
import Like from "../components/Like";
import { Image, message } from "antd";
import { LinkedinOutlined, InstagramOutlined } from "@ant-design/icons";

// Pages
const API_PREFIX = "https://api.shadowhusky.tech";
const DANIEL_API = API_PREFIX + "/DANIEL-POSTS";
// import ModelPage  from './pages/Model';

const prefix = "dpw-home-";

var initialized;

var database;

function Home(props) {
  const { visible, onMainImgLoaded } = props;
  const [titleVisibility, setTitleVisibility] = useState(true);
  const [count, setCount] = useState(0);
  const [contents, updateContents] = useState(null);
  const mainRef = useRef(null);
  const onMainScroll = () => {
    const scrollTop = document.body?.scrollTop;
    const scrollTop_ = mainRef.current?.scrollTop;
    if (scrollTop_ === undefined || scrollTop === undefined) return;
    setTitleVisibility(scrollTop > 30 || scrollTop_ > 30 ? false : true);
  };

  const onConfirmLike = () => {
    var likeCountRef = database.ref("likes");
    likeCountRef
      .once("value")
      .then((snapshot) => {
        // Increase count
        const count = parseInt(snapshot.val()) + 1;
        setCount(count);
        database
          .ref("likes")
          .set(count)
          .catch((err) => {
            message.error(err.toString());
          });
      })
      .catch((err) => {
        message.error(err.toString());
      });
  };

  useEffect(() => {
    if (!initialized) {
      firebase.initializeApp(FIREBASE_CONFIG);
      firebase.analytics();
      database = firebase.database();

      // Fetch numebr of likes
      var likeCountRef = database.ref("likes");
      likeCountRef
        .once("value")
        .then((snapshot) => {
          // Increase count
          const count = parseInt(snapshot.val());
          setCount(count);
        })
        .catch((err) => {
          message.error(err.toString());
        });

      document.body.addEventListener("scroll", onMainScroll);
      mainRef.current.addEventListener("scroll", onMainScroll);
      initialized = true;
    }
  });

  useEffect(() => {
    const fetchContents = async () => {
      const banner = await (await fetch(DANIEL_API + "?type=banner")).json();
      const introduction = await (
        await fetch(DANIEL_API + "?type=introduction")
      ).json();
      let projects = await (await fetch(DANIEL_API + "?type=project")).json();
      console.log(projects);
      projects = projects.sort((a, b) => {
        return (a.index || 0) - (b.index || 0);
      });
      try {
        updateContents({
          banner: API_PREFIX + banner[0].images[0].url,
          introduction: introduction[0],
          projects: projects,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchContents();
  }, []);

  document.oncontextmenu = function () {
    return false;
  };
  return (
    <div
      ref={mainRef}
      className={`${prefix}container`}
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      {/* <ModelPage/> */}
      <div
        style={{ opacity: titleVisibility && visible ? "0.5" : "0" }}
        className={`${prefix}title`}
      >
        <Image
          src="https://gw.alicdn.com/tfs/TB13JZrgiDsXe8jSZR0XXXK6FXa-750-73.png"
          alt="Daniel Qu's Car Shop"
          preview={false}
          className={`${prefix}title-image`}
        ></Image>
      </div>
      <Image
        preview={false}
        className={`${prefix}image ` + (visible && `${prefix}image-animated`)}
        onLoad={onMainImgLoaded}
        src={contents?.banner ? contents.banner : require("./home.jpg")}
      ></Image>
      <div className={`${prefix}description-container`}>
        <div className={`${prefix}description`}>
          <h1>{contents?.introduction && contents.introduction.title}</h1>

          {contents?.introduction && (
            <ReactMarkdown>{contents.introduction.body}</ReactMarkdown>
          )}
        </div>
      </div>
      {contents?.projects &&
        visible &&
        contents.projects.map((project, index) => {
          return (
            <div key={`${prefix}container-key${index}`}>
              <Project content={project} />
            </div>
          );
        })}
      <Like count={count} onConfirmLike={onConfirmLike} />
      <footer className={`${prefix}connect-container`}>
        <a target="_blank" href="https://www.linkedin.com/in/daniel-qu">
          <LinkedinOutlined />
        </a>
        <a target="_blank" href="https://www.instagram.com/misaya_qu/">
          <InstagramOutlined />
        </a>
      </footer>
      <section className={`${prefix}developer-container`}>
        <h6> Page Powered by Richard with love :D</h6>
        <h6> Check source code for my details </h6>
      </section>
      {/* May use this format later
      <Tabs> 
        <TabPane tab="Project 1" key="project1">
         
        </TabPane>
        <TabPane tab="Project 2" key="project2">
          
        </TabPane>
      </Tabs> */}
    </div>
  );
}

export default Home;
