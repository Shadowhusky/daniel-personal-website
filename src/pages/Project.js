import React from "react";
import "antd/dist/antd.css";
import { Carousel, Image } from "antd";
import "./Project.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Components
import ReactMarkdown from "react-markdown";

const API_PREFIX = "https://api.shadowhusky.tech";

const prefix = "dpw-project-";

function Project(props) {
  const { content } = props;
  if (!content) return <div />;
  const carouselRef = React.createRef();
  const onChangeSlide = (action) => {
    if (action === "previous") carouselRef.current.prev();
    else carouselRef.current.next();
  };
  if (content.imgList && typeof content.imgList[0] === "number") {
    const count = content.imgList[0],
      type = content.imgList[1];
    content.imgList = [];
    for (let i = 0; i < count; i++) {
      content.imgList.push(`IMG${i + 1}.${type}`);
    }
  }
  return (
    <div className={`${prefix}container`}>
      <h2 className={`${prefix}title`}>{content.project_name}</h2>
      <section className={`${prefix}carousel-container`}>
        <LeftOutlined
          onClick={() => onChangeSlide("previous")}
          height="100"
          width="100"
          className={`${prefix}slides-button`}
        />
        <Carousel
          autoplay
          autoplaySpeed="60"
          ref={carouselRef}
          className={`${prefix}carousel`}
          draggable
        >
          {content.images?.map((item, i) => {
            return (
              <div
                className={`${prefix}images-container`}
                key={`${prefix}images-container-${i}`}
              >
                <Image
                  key={`${prefix}images-${i}`}
                  className={`${prefix}images`}
                  src={API_PREFIX + item.url}
                />
              </div>
            );
          })}
        </Carousel>
        <RightOutlined
          onClick={() => onChangeSlide("next")}
          height="100"
          width="100"
          className={`${prefix}slides-button`}
        />
      </section>
      <div className={`${prefix}text-field`}>
        <h1>{content.title}</h1>
        <span>click on picture to view full size</span>
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Project;
