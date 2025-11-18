import { Swiper, SwiperSlide } from "swiper/react";
import MyTitle from "../../../components/MyTitle/MyTitle";
import { Autoplay } from "swiper/modules";
import { brandsData } from "../../../data/brandsData";
import { trackingData } from "../../../data/trackingData";


const BrandsSection = () => {
  return (
    <>
      <MyTitle className="text-center">
        We've helped thousands of sales teams
      </MyTitle>

      <div className="px-6">
        <Swiper
          className="mySwiper"
          slidesPerView={4}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {brandsData.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div>
                <img src={brand.image} alt={brand.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="divider"></div>

      <div className="space-y-5 max-w-5xl w-full mx-auto">
        {trackingData.map((item) => (
          <div
            key={item.id}
            className="card bg-base-100 shadow-xl border border-gray-200"
          >
            <div className="card-body items-center flex-row">
              <figure>
                <img src={item.image} className="w-32" />
              </figure>

              <div className="divider divider-horizontal"></div>

              <div className="space-y-4">
                <h2 className="card-title text-xl font-semibold">
                  {item.title}
                </h2>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BrandsSection;
