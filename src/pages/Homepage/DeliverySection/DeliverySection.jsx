import MyTitle from "../../../components/MyTitle/MyTitle";
import { deliveryData } from "../../../data/deliveryData";

const DeliverySection = () => {
  return (
    <>
      <MyTitle>How it Works</MyTitle>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deliveryData.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DeliverySection;
