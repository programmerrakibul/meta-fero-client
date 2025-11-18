import MyContainer from "../../Shared/MyContainer/MyContainer";
import Carousel from "../Carousel/Carousel";
import merchantImg from "../../../assets/location-merchant.png";
import MyButton from "../../../components/MyButton/MyButton";
import FAQSection from "../FAQSection/FAQSection";
import ReviewsSection from "../ReviewsSection/ReviewsSection";
import BrandsSection from "../BrandsSection/BrandsSection";
import ServiceSection from "../ServiceSection/ServiceSection";
import "swiper/css";
import "swiper/css/effect-coverflow";
import DeliverySection from "../DeliverySection/DeliverySection";

const Home = () => {
  return (
    <>
      <title>Home - Zap Shift</title>

      <section className="my-10">
        <MyContainer>
          <Carousel />
        </MyContainer>
      </section>

      <section>
        <MyContainer className="space-y-7">
          <DeliverySection />
        </MyContainer>
      </section>

      <section>
        <MyContainer className="bg-secondary space-y-7 p-10!">
          <ServiceSection />
        </MyContainer>
      </section>

      <section>
        <MyContainer className="space-y-16">
          <BrandsSection />
        </MyContainer>
      </section>

      <section>
        <MyContainer>
          <div className="card bg-secondary shadow-xl border border-gray-200 rounded-2xl">
            <div className="card-body p-8 flex-row justify-between items-center gap-5">
              <div className="flex-2/3 space-y-5">
                <h2 className="card-title text-4xl font-bold text-white!">
                  Merchant and Customer Satisfaction is Our First Priority
                </h2>

                <p className="text-white/70">
                  We offer the lowest delivery charge with the highest value
                  along with 100% safety of your product. Pathao courier
                  delivers your parcels in every corner of Bangladesh right on
                  time.
                </p>

                <div className="card-actions">
                  <MyButton className="rounded-full!">
                    Become a Merchant
                  </MyButton>
                  <button className="btn btn-primary btn-outline hover:text-black rounded-full!">
                    Earn with ZapShift Courier
                  </button>
                </div>
              </div>

              <div className="flex-1/3">
                <img src={merchantImg} alt="" />
              </div>
            </div>
          </div>
        </MyContainer>
      </section>

      <section>
        <MyContainer className="space-y-12">
          <ReviewsSection />
        </MyContainer>
      </section>

      <section>
        <MyContainer className="space-y-12">
          <FAQSection />
        </MyContainer>
      </section>
    </>
  );
};

export default Home;
