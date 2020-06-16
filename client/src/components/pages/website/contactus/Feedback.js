import React, { useState, Fragment } from "react";
import clientPicture1 from "../../../../images/clientPicture1.jpg";
import clientPicture2 from "../../../../images/clientPicture2.jpg";
import clientPicture3 from "../../../../images/clientPicture3.jpg";
import clientPicture4 from "../../../../images/clientPicture4.jpg";
import clientPicture5 from "../../../../images/clientPicture5.jpg";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
const Feedback = () => {
  return (
    <Fragment>
      <div className='feedbackgrid container' style={{ height: "25rem" }}>
        <div className='text-center py-3 my-3'>
          <h2>
            Our <span className='lead text-primary'> Success </span> <br />
            Stories
          </h2>
        </div>
        <div>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}>
            <span style={{ paddingLeft: "10rem" }}>
              <ButtonBack>Back</ButtonBack>
              <ButtonNext>Next</ButtonNext>
            </span>
            <Slider>
              <Slide index={0}>
                {" "}
                <div
                  className='grid-2 bg-primary all-center'
                  style={{ width: "40rem", height: "20rem" }}>
                  <p>
                    <img
                      className='round-img m-2'
                      style={{ width: "10rem", height: "10rem" }}
                      src={clientPicture1}
                    />
                  </p>
                  <p>
                    <br />
                    <br />
                    <br />

                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <br />
                    <span
                      style={{ fontSize: ".8rem", fontWeight: "bold" }}
                      className='p-1'>
                      I was a sole proprietor for more than ten years. When I
                      had some tax trouble, the consulting team at Priority
                      helped me restructure to a C-Corp and collect a salary to
                      avoid self employment taxes.{" "}
                    </span>
                  </p>
                </div>
              </Slide>
              <Slide index={1}>
                {" "}
                <div
                  className='grid-2 bg-primary all-center'
                  style={{ width: "40rem", height: "20rem" }}>
                  <p>
                    <img
                      className='round-img m-2'
                      style={{ width: "10rem", height: "10rem" }}
                      src={clientPicture2}
                    />
                  </p>
                  <p>
                    <br />
                    <br />
                    <br />

                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <br />
                    <span
                      style={{ fontSize: ".8rem", fontWeight: "bold" }}
                      className='p-1'>
                      I hadn't filed for years. Fortunately I had retired so my
                      income was very low. The National Tax Group was able to
                      reduce my debt tremendously after filing many many years
                      of back taxes.
                    </span>
                  </p>
                </div>
              </Slide>
              <Slide index={2}>
                {" "}
                <div
                  className='grid-2 bg-primary all-center'
                  style={{ width: "40rem", height: "20rem" }}>
                  <p>
                    <img
                      className='round-img m-2'
                      style={{ width: "10rem", height: "10rem" }}
                      src={clientPicture3}
                    />
                  </p>
                  <p>
                    <br />
                    <br />
                    <br />

                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <i className='fas fa-star' />
                    <br />
                    <span
                      style={{ fontSize: ".8rem", fontWeight: "bold" }}
                      className='p-1'>
                      I had a tax lien from not paying my taxes. They were able
                      to subordinate the lien by helping me file the legal
                      documenation. This allowed me a chance to sell some
                      property and release the lien. Once the lien was released
                      the National Tax Group was able to get me into a hardship
                      status and I owed no more taxes.
                    </span>
                  </p>
                </div>
              </Slide>
            </Slider>
          </CarouselProvider>
        </div>
      </div>
    </Fragment>
  );
};

export default Feedback;
