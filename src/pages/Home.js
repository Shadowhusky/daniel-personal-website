// Frameworks
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

// Utils
import { useState, useEffect, useRef } from 'react'

// Configs
import FIREBASE_CONFIG from "../firebaseConfig";

// Styles
import "./Home.css";

// Components 
import Like from '../components/Like';
import { Image, message } from 'antd';
import {
  LinkedinOutlined,
  InstagramOutlined
} from '@ant-design/icons';

// Pages 
import Project from './Project';
import StartUp from './StartUp';
// import ModelPage  from './pages/Model';

const prefix = 'dpw-home-';

var initialized;

var database;

function Home() {
  const [titleVisibility, setTitleVisibility] = useState(true);
  const [count, setCount] = useState(0);
  const mainRef = useRef(null);
  const onMainScroll = () => {
    const scrollTop = document.body?.scrollTop;
    const scrollTop_ = mainRef.current?.scrollTop;
    if(scrollTop_ === undefined || scrollTop === undefined) return;
    setTitleVisibility( (scrollTop > 30 || scrollTop_ > 30) ? false : true);
  }

  const onConfirmLike = () => {
    var likeCountRef = database.ref('likes');
    likeCountRef.once('value').then( snapshot => {
       // Increase count
       const count = parseInt(snapshot.val()) + 1;
       setCount(count);
       database.ref('likes').set(count).catch(err => {
        message.error(err.toString());
        });;
    }).catch(err => {
        message.error(err.toString());
    });
  };

  useEffect(() => {
    if(initialized) return;

    firebase.initializeApp(FIREBASE_CONFIG);
    firebase.analytics();
    database = firebase.database();

    // Fetch numebr of likes
    var likeCountRef = database.ref('likes');
    likeCountRef.once('value').then( snapshot => {
      // Increase count
      const count = parseInt(snapshot.val());
      setCount(count);
    }).catch(err => {
        message.error(err.toString());
    });

    document.body.addEventListener('scroll', onMainScroll);
    mainRef.current.addEventListener('scroll', onMainScroll);
    initialized = true;
  })

  document.oncontextmenu = function() {return false;};
  return (
    <div ref={mainRef}  className={`${prefix}container`}>
      {/* <ModelPage/> */}
      <div style={{opacity: titleVisibility ? "0.5" : "0"}} className={`${prefix}title`}>
        <Image 
          src="https://gw.alicdn.com/tfs/TB13JZrgiDsXe8jSZR0XXXK6FXa-750-73.png"
          alt="Daniel Qu's Car Shop"
          className={`${prefix}title-image`}>
        </Image>
      </div>
      <Image
        preview={false}
        className={`${prefix}image`}
        src={require('./home.jpg')}
      >
      </Image>
      <div className={`${prefix}description-container`}>
        <div  className={`${prefix}description`}>
          <h1>
            DESIGNING FOR THE ULTIMATE
          </h1>
          <p>
            With the passion for sport cars since young, I always have the dream to design and build my own sport car. Everything starts at the age of 3, when my dad showed me the game Need for Speed, it was the ‘Hot Pursuit 2’, and my dad let me play the game before I go to kindergarten every day. After all these year growing up with car games, I become an engineer studying in University of Cambridge. This gets me closer to my dream. 
          </p>
          <p>
            In the 2020 summer, I very rarely went outside due to the covid-19 and I started to officially design a car. Although I am a huge fan of JDM, I still appreciate the design of European sport cars. Also, I am a stylist so I do want my car to be good looking instead of chasing pure aero performance. I have sketched portraits for many years as a hobby and this allows me to show my ideas on the paper clearly. I have also see CAD engineers at Lotus using CATIA and I realize this is a very widely used CAD software in automotive industry. Therefore, I brought video courses and started to learn it. After hundreds of hours of learning, I think I have the skills I need to make my 2D design into 3D in CATIA.          
          </p>
          <p>
            And I did it. The model seems a bit default, the curvatures are not smooth and windows are bumpy. The rendering in CATIA is not as good as SolidWorks, so I learnt to use Keyshot to render and produce simple demos of my car.          
          </p>
          <p>
            The following are my designs and results of ANSYS CFX for rear wings design. Have a look!
          </p>
        </div>
      </div>
      <Project content={project_content_1}/> 
      <Project content={project_content_2}/> 
      <Project content={project_content_3}/>
      <Like count={count} onConfirmLike={onConfirmLike} />
      <footer className={`${prefix}connect-container`}> 
      <a href="https://www.linkedin.com/in/daniel-qu">
        <LinkedinOutlined />
      </a>
      <a href="https://www.instagram.com/misaya_qu/">
        <InstagramOutlined />
      </a>
      </footer>
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

const imageList_1 = [
  "IMG5.jpg",
  "IMG6.jpg",
  "IMG7.jpg",
  "IMG8.jpg",
  "IMG9.jpg",
  "IMG10.jpg",
  "IMG1.png",
  "IMG2.png",
  "IMG3.png",
  "IMG4.png"
]

const imageList_2 = [21, 'jpg'];

const imageList_3 = [7, 'png'];

const project_content_1 = {
  head: "Project 1",
  key: "Project1",
  title: "First Attempt",
  desc: [
    `My very first attempt to design, cad and render a sport car. After my work experience at Lotus, especially during the time Richard Hill led me to do the wind tunnel test, I have gained ideas of some key factors that need to be considered when designing the exterior of the car that aims to go faster and achieve better control. I have designed sufficiently large air intake area at the front for high and low temperature radiators to function well. The air is also directed towards the sides, where the air passes through a small area throttle to accelerate the exit air. The high speed air blade then combines with the air flow around the wheel house and acts as a wall to prevent the flow from entering the wheel house to create extra drag and turbulence. For the hood design, the air at the front also goes all the way up through the exit at the hood. This design lowers the drag and increases front down force. The side of the car have a large through curvature to minimize turbulence. As far as I understand, mixing of air with different velocities causes irreversibility in entropy terms, and this produces turbulence that causes extra drag. The air intake at the side is for combustion in the engine. For the rear of the car, diffusers and rear wings are the must. The better I treat the air, the better performance my car would have. The air around the rotating rear wheels will be directed towards the rear and not staying in the wheel house. At the central part of the rear, air exits are designed to evacuate air in the engine room. I did read a lot of papers about rim design, but I would say I am a stylist and I choose the best looking rim for my car. 
    `
  ],
  imgList: imageList_1
}

const project_content_2 = {
  head: "Project 2",
  key: "Project2",
  title: "Second car",
  desc: [
    `This is my second car design. I used some of the technologies I used on my last car, the hood design, air blade at the front wheel houses, etc. For this car, the side curvature is optimized for less drag. The chasm at my first car’s side will certainly cause suction of air and increase drag. The position for air intake to the engine is also changed for maximum front projection area. Large diffusers and rear wings are mounted to the car to create large down force. Splitting air flows in to sections restricts the air to have laminar flow than turbulent. Although I forget to design rear view mirror for both of my car, this time I designed place for hanging number plate :p `
  ],
  imgList: imageList_2
}

const project_content_3 = {
  head: "ANSYS CFX",
  key: "Project3",
  title: "ANSYS CFX",
  desc: [
    `From my work experience at Lotus and paper about rim design I have read, I understand CFD is a very very useful tool when developing a car or other parts. I downloaded FloEFD for CATIA and didn’t find out how to do the analysis. One day, when watching YouTube video about Volkswagen IDR, one of the sponsor was ANSYS and I have only heard of CAE in ANSYS before. Soon I find out ANSYS also do CFD simulation and I downloaded and learnt it. 

    I started with my car model and had errors for some reasons and I cannot work out why it didn’t work. Then I build some simple 3D geometries as input and that worked out fine. The pictures are two of my rear wing designs that I did CFD simulations on. I also calculated the Coefficient of Drag and down force that each rear wing would generate.
    
    In the future, I will try to make my third car design able to run a CFD simulation and record the coefficient of drag and modify later to achieve better aero performance.
    `
  ],
  imgList: imageList_3
}

