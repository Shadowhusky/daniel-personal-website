import React from 'react';
import { useState } from 'react'
import './App.css';
import { Image } from 'antd';
import Project from './pages/Project';
import {
  LinkedinOutlined,
  FacebookOutlined,
  InstagramOutlined
} from '@ant-design/icons';

const prefix = 'dpw-';

// const { TabPane } = Tabs;

function App() {
  const [titleVisibility, setTitleVisibility] = useState(true);
  const myRef = React.createRef();
  const onMainScroll = () => {
    const scrollTop = document.body?.scrollTop;
    setTitleVisibility(scrollTop > 30 ? false : true);
  }
  document.body.addEventListener('scroll', onMainScroll);
  return (
    <div ref={myRef}  className={`${prefix}main-container`}>
      <div style={{opacity: titleVisibility ? "0.5" : "0"}} className={`${prefix}main-title`}>
        <Image 
          src="https://gw.alicdn.com/tfs/TB13JZrgiDsXe8jSZR0XXXK6FXa-750-73.png"
          alt="Daniel Qu's Car Shop"
          className={`${prefix}main-title-image`}>
        </Image>
      </div>
      <Image
        preview={false}
        className={`${prefix}main-image`}
        src="https://gw.alicdn.com/tfs/TB1AMlDTVT7gK0jSZFpXXaTkpXa-1920-1015.png"
      >
      </Image>
      <div  className={`${prefix}main-description-container`}>
        <div  className={`${prefix}main-description`}>
          <span> DISCOVER </span>
          <h1>
            THE EXEMPLARY GRAND TOURER
          </h1>
          <p>
            Standard-bearer for an all-new generation of cars, DB11 is the most powerful and efficient ‘DB’ production model in Aston Martin’s history. Available as a Coupe with the 5.2-liter twin-turbocharged V12 or the 4.0-liter twin-turbocharged V8 engine, DB11 takes our grand touring heritage to unprecedented heights.
          </p>
          <p>
            DB11 AMR is the new flagship of the DB11 range, boasting greater power, increased performance, enhanced driving dynamics and a more characterful exhaust note.          
          </p>
          <p>
            The DB11 Volante completes the family; offering an equally stunning, open-topped GT experience.          
          </p>
        </div>
      </div>
      <Project content={project_content_1}/> 
      <Project content={project_content_2}/> 
      <Project content={project_content_3}/>
      <section className={`${prefix}main-connect-container`}> 
      <a href=".">
        <LinkedinOutlined />
      </a>
      <a href=".">
        <FacebookOutlined />
      </a>
      <a href=".">
        <InstagramOutlined />
      </a>
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

export default App;

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

