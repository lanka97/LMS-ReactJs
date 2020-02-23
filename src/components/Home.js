import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fade } from 'react-slideshow-image';

import firstImg from '../images/1.jpg';
import secondImg from '../images/2.jpg';
import thirdImg from '../images/3.jpg';


export class Home extends React.Component {
  render() {
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
              <img src={firstImg} width={'100%'} height={550} mode='fit' alt="One" />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={secondImg} width={'100%'} height={550} mode='fit' alt="Two" />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img src={thirdImg} width={'100%'} height={550} mode='fit' alt="Three" />
            </div>
          </div>
        </Fade>

        <div className="row">
          <div className="col-4">
            <img
              src="http://courseweb.sliit.lk/pluginfile.php/2/course/section/2/your-path-to-greadness-starts-here.png"
              alt="" width="100%" height="100%" className="img-responsive" />
          </div>
          <div className="col-8">
            <div className="spotlight spotlight-v2">
              <p> We are a leading non-state degree awarding institute approved by the University Grants
                  Commission (UGC) under the Universities Act. We are also members of the Association of
                  Commonwealth Universities (ACU), as well as the International Association of Universities (IAU),
                  and the first Sri Lankan institute to be accredited by the Institution&nbsp;of
                  Engineering &amp; Technology, UK.
                    </p>
              <p>We are proud to be listed as a leading and formidable awarding institute authorised and approved
                  by the University Grants Commission (UGC) under the Universities Act, and the International
                  Association of Universities (IAU). Furthermore, not only are we the first Sri Lankan institute
                  to be accredited by the Institution&nbsp;of Engineering &amp; Technology (IET.), UK, our IT
                  degrees are also in turn accredited by the Engineering Council, UK.
                    </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

}

export default Home;