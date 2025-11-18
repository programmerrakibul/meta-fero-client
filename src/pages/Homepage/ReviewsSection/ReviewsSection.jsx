import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import MyTitle from "../../../components/MyTitle/MyTitle";
import { reviewsData } from "../../../data/reviewsData";
import reviewQuote from "../../../assets/reviewQuote.png";

const ReviewsSection = () => {
  return (
    <>
      <div className="text-center max-w-3xl w-full mx-auto">
        <MyTitle>What our customers are sayings</MyTitle>

        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        slidesPerView={3}
        loop={true}
        centeredSlides={true}
        
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 400,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay]}
        className="reviewsSwiper"
      >
        {reviewsData.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="card bg-base-100 shadow-xl border border-gray-200">
              <div className="card-body gap-4">
                <div className="flex items-center">
                  <img src={reviewQuote} alt="Qoute Icon" />
                </div>

                <p>{review.review}</p>

                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="bg-neutral text-neutral-content rounded-full w-12">
                      <img src={review.user_photoURL} alt={review.userName} />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-semibold">{review.userName}</h3>

                    <p className="text-sm">{review.user_email}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ReviewsSection;
