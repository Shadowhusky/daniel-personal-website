// Frameworks
import React from 'react';

// Utils
import { useEffect, useRef } from 'react'

// Styles
import "./Like.css";

// Components 
import { FireFilled } from '@ant-design/icons';

const prefix = 'ilike-';

var initialized;

function Like(props) {
  const { onConfirmLike, count } = props;
  const likeRef = useRef(null);
  useEffect(() => {
    if(initialized) return;
    let timer;
    const pressStart = () => {
      if(likeRef.current.liked) return;
      // Set a timer, user needs to press for a specicif time to confirm;
      timer = setTimeout(() => {
        likeRef.current.liked = true;
        likeRef.current.classList.add(`${prefix}main-like-visited`);
        likeRef.current.nextElementSibling.nextElementSibling.innerText = 'Thanks :D';
        // Trigger user event
        onConfirmLike();
      }, 600)
    }
    likeRef.current.addEventListener('mousedown', pressStart);
    likeRef.current.addEventListener('touchstart', pressStart);
    likeRef.current.addEventListener('mouseup', () => clearTimeout(timer));
    likeRef.current.addEventListener('touchend', () => clearTimeout(timer));
    initialized = true;
  })
  return (
    <div className={`${prefix}main-like-container`}>
      <FireFilled ref={likeRef} className={`${prefix}main-like`}/>
      <span>- {count} -</span>
      <span>Like this site</span>
    </div>
  )
}

export default Like;