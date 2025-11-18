import MyTitle from "../../../components/MyTitle/MyTitle";
import { serviceData } from "../../../data/serviceData";

const ServiceSection = () => {
  return (
    <>
      <div className="max-w-lg mx-auto w-full space-y-3.5 text-center">
        <MyTitle className="text-white!">Our Services</MyTitle>
        <p className="text-white">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceData.map((service) => (
          <div
            key={service.id}
            className="card bg-base-100 shadow-xl rounded-2xl hover:bg-primary transition-colors duration-300"
          >
            <div className="card-body text-center">
              <h2 className="card-title items-center justify-center text-lg font-bold">
                {service.title}
              </h2>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceSection;
