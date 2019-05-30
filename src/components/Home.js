import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade } from 'react-slideshow-image';

import firstImg from '../images/1.jpg';
import secondImg from '../images/2.jpg';
import thirdImg from '../images/3.jpg';


export class Home extends React.Component{
  render(){
    const fadeProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true
    }
  return (
    <div>
      <Fade {...fadeProperties}>
      <div className="each-fade">
        <div className="image-container">
          <img src={firstImg} width={'100%' } height={550} mode='fit' alt = "One" />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={secondImg} width={'100%' } height={550} mode='fit' alt = "Two" />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container">
          <img src={thirdImg} width={'100%' } height={550} mode='fit' alt = "Three" />
        </div>
      </div>
    </Fade> 
  </div>
  );
}
}

export default Home;
