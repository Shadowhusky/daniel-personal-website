import React from 'react';
import 'antd/dist/antd.css';
import { Carousel, Image } from 'antd';
import './Project.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
const prefix = 'dpw-'; //Daniel personal website

function Project(props) {
  const { content } = props;
  const carouselRef = React.createRef();
  const onChangeSlide = action => {
    if(action === 'previous') carouselRef.current.prev();
    else carouselRef.current.next();
  };
  if(content.imgList && typeof(content.imgList[0]) === "number" ) {
    const count = content.imgList[0],
          type = content.imgList[1];
    content.imgList = [];
    for(let i=0; i<count; i++) {
      content.imgList.push(`IMG${i + 1}.${type}`);
    }
  }
  return (
    <div className={`${prefix}project-container`}>
      <h2 className={`${prefix}project-title`}>
        {content.head}
      </h2>
      <section className={`${prefix}carousel-container`}>
      <LeftOutlined onClick={() => onChangeSlide('previous')}  height="100" width="100" className={`${prefix}slides-button`} />
        <Carousel autoplay autoplaySpeed="60" ref={carouselRef} className={`${prefix}carousel`} draggable>
          {
             content.imgList.map( (item, index) => {
              return  <div className={`${prefix}images-container`} key={`${prefix}images--container-${index}-${parseInt(Math.random(10000))}`}>
              <Image
                  key={`${prefix}images-${index}-${parseInt(Math.random(10000))}`}
                  className={`${prefix}images`}
                  src={require(`../Projects/${content.key}/${item}`)}
              />
            </div>
            } )
          }
        </Carousel>
        <RightOutlined onClick={() => onChangeSlide('next')} height="100" width="100" className={`${prefix}slides-button`} />
      </section>
      <div className={`${prefix}text-field`}>
          <h1>
            {content.title}
          </h1>
          {
            content.desc.map( item => {
              return <p>{item}</p>
            })
          }
      </div>
    </div>
  );
}

export default Project;