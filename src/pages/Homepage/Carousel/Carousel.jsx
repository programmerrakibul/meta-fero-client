import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Banner Images
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";

const Carousel = () => {
  return (
    <>
      <ReactCarousel
        infiniteLoop={true}
        autoPlay={true}
        transitionTime={1000}
        emulateTouch={true}
        swipeable={true}
        swipeScrollTolerance={5}
        showThumbs={false}
      >
        <div>
          <img src={banner1} alt="Banner Image" />
        </div>

        <div>
          <img src={banner2} alt="Banner Image" />
        </div>

        <div>
          <img src={banner3} alt="Banner Image" />
        </div>
      </ReactCarousel>
    </>
  );
};

export default Carousel;
