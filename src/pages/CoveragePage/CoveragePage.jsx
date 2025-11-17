import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MyButton from "../../components/MyButton/MyButton";
import MyHeading from "../../components/MyHeading/MyHeading";
import MyContainer from "../components/MyContainer/MyContainer";
import { RiSearchLine } from "react-icons/ri";
import { useLoaderData } from "react-router";
import { useRef } from "react";

const position = [23.777176, 90.399452];

const CoveragePage = () => {
  const mapRef = useRef(null);
  const { data } = useLoaderData();
  console.log(data);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.search.value.trim().toLowerCase();

    const district = data.find((item) => item.district.toLowerCase() === query);

    if (district) {
      const coord = [district.latitude, district.longitude];

      mapRef.current.flyTo(coord, 11);
    }

    console.log(query);
  };

  return (
    <>
      <title>Coverage Page</title>

      <section className="my-8">
        <MyContainer className="bg-base-100 p-6 space-y-7">
          <div className="space-y-4 py-6 border-b border-gray-200">
            <MyHeading>We are available in 64 districts</MyHeading>

            <form
              onSubmit={handleSearch}
              className="join bg-[#CBD5E130] rounded-full overflow-hidden"
            >
              <span className="join-item flex items-center justify-center text-lg ms-2.5">
                <RiSearchLine />
              </span>
              <input
                type="search"
                name="search"
                className="input join-item bg-transparent border-none outline-none"
                placeholder="Search here"
              />
              <MyButton className="join-item rounded-full!">Search</MyButton>
            </form>
          </div>

          <div className="space-y-3.5">
            <h3 className="font-bold text-2xl">
              We deliver almost all over Bangladesh
            </h3>

            <div className="h-[70dvh] rounded-2xl overflow-hidden" >
              <MapContainer
                center={position}
                zoom={8}
                scrollWheelZoom={false}
                className="w-full h-full"
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {data.map((item) => (
                  <Marker
                    key={item.district}
                    position={[item.latitude, item.longitude]}
                  >
                    <Popup>
                      <strong>{item.district}</strong> <br />
                      <span>Service Area: [{item.covered_area.join(",")}]</span>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default CoveragePage;

{
  /* */
}
