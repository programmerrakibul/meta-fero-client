import MyContainer from "../../components/MyContainer/MyContainer";
import Carousel from "../Carousel/Carousel";

const Home = () => {
  return (
    <>
      <title>Home - Zap Shift</title>

      <section className="my-10">
        <MyContainer>
          <Carousel />
        </MyContainer>
      </section>
    </>
  );
};

export default Home;
