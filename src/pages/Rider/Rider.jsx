import { useForm, useWatch } from "react-hook-form";
import MyButton from "../../components/MyButton/MyButton";
import MyTitle from "../../components/MyTitle/MyTitle";
import MyContainer from "../Shared/MyContainer/MyContainer";
import ErrorText from "../../components/ErrorText/ErrorText";
import { useLoaderData } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Swal from "sweetalert2";

const Rider = () => {
  const secureAxios = useSecureAxios();
  const { currentUser } = useAuthInfo();
  const { data } = useLoaderData();
  const duplicateRegions = data.map((item) => item.region);
  const regions = [...new Set(duplicateRegions)];
  const { mutateAsync } = useMutation({
    mutationKey: ["rider"],
    mutationFn: async (payload) => {
      const res = await secureAxios.post("/riders", payload);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const riderRegion = useWatch({ control, name: "rider_region" });

  const districtByRegion = (region) => {
    const districts = data.reduce((acc, item) => {
      if (item.region === region) {
        acc.push(item.district);
      }
      return acc;
    }, []);

    return districts;
  };

  const createRider = async (info) => {
    info.rider_nid = Number(info.rider_nid);
    info.rider_contact = Number(info.rider_contact);
    info.rider_age = Number(info.rider_age);

    try {
      const data = await mutateAsync(info);

      const title = data.isNew
        ? "Your application has been uploaded"
        : "You've already applied";
      const icon = data.isNew ? "success" : "warning";

      Swal.fire({
        icon,
        title,
        timer: 2000,
      });
    } catch (err) {
      console.log(err);

      toast.error("Parcel data uploaded failed");
    }
  };

  return (
    <>
      <title>Send your parcel - MetaFero</title>

      <section className="my-10">
        <MyContainer className="bg-white p-8! md:p-14! space-y-7">
          <div className="space-y-3.5">
            <MyTitle>Be a Rider</MyTitle>
            <p className="max-w-xl w-full">
              Enjoy fast, reliable parcel delivery with real-time tracking and
              zero hassle. From personal packages to business shipments — we
              deliver on time, every time.
            </p>
          </div>

          <div className="divider"></div>

          <form onSubmit={handleSubmit(createRider)}>
            <h5 className="font-bold text-lg md:text-xl mb-4">
              Tell us about yourself
            </h5>

            <div className="fieldset md:grid-cols-2 gap-12 text-base">
              <div className="flex-1 space-y-3.5">
                {/* Rider Name */}
                <label className="label flex-col items-start gap-1">
                  <span>Name</span>
                  <input
                    type="text"
                    className="input"
                    defaultValue={currentUser.displayName}
                    placeholder="Name"
                    {...register("rider_name")}
                    readOnly
                  />
                </label>

                {/* Rider Email */}
                <label className="label flex-col items-start gap-1">
                  <span>Email</span>
                  <input
                    type="email"
                    className="input"
                    defaultValue={currentUser.email}
                    placeholder="Email"
                    {...register("rider_email")}
                    readOnly
                  />
                </label>

                {/* Rider NID */}
                <label className="label flex-col items-start gap-1">
                  <span>NID No:</span>
                  <input
                    type="number"
                    className="input"
                    placeholder="NID"
                    {...register("rider_nid", {
                      required: "Rider NID is required",
                    })}
                  />

                  {errors.rider_nid && (
                    <ErrorText>{errors.rider_nid.message}</ErrorText>
                  )}
                </label>

                {/* Rider Contact No */}
                <label className="label flex-col items-start gap-1">
                  <span>Contact Number</span>
                  <input
                    type="number"
                    className="input"
                    placeholder="Contact Number"
                    {...register("rider_contact", {
                      required: "Contact Number is required",
                    })}
                  />

                  {errors.rider_contact && (
                    <ErrorText>{errors.rider_contact.message}</ErrorText>
                  )}
                </label>
              </div>

              <div className="flex-1 space-y-3.5">
                {/* Rider Age */}
                <label className="label flex-col items-start gap-1">
                  <span>Your Age</span>
                  <input
                    type="number"
                    className="input"
                    placeholder="Your Age"
                    {...register("rider_age", {
                      required: "Rider Age is required",
                    })}
                  />

                  {errors.rider_age && (
                    <ErrorText>{errors.rider_age.message}</ErrorText>
                  )}
                </label>

                <label className="label flex-col items-start gap-1">
                  <span>Your Region</span>
                  <select
                    defaultValue=""
                    className="select"
                    {...register("rider_region", {
                      required: "Rider Region is required",
                    })}
                  >
                    <option disabled={true} value="">
                      Select your Region
                    </option>
                    {regions.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  {errors.rider_region && (
                    <ErrorText>{errors.rider_region.message}</ErrorText>
                  )}
                </label>

                <label className="label flex-col items-start gap-1">
                  <span>Your District</span>
                  <select
                    defaultValue=""
                    className="select"
                    {...register("rider_district", {
                      required: "Rider District is required",
                    })}
                  >
                    <option disabled={true} value="">
                      Select your District
                    </option>
                    {districtByRegion(riderRegion).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>

                  {errors.rider_district && (
                    <ErrorText>{errors.rider_district.message}</ErrorText>
                  )}
                </label>

                <label className="label flex-col items-start gap-1">
                  <span>Vehicle</span>
                  <select
                    defaultValue=""
                    className="select"
                    {...register("vehicle", {
                      required: "Rider Vehicle is required",
                    })}
                  >
                    <option disabled={true} value="">
                      Select your Vehicle
                    </option>
                    <option>Bicycle</option>
                    <option>Motor Bike</option>
                    <option>Truck</option>
                  </select>

                  {errors.vehicle && (
                    <ErrorText>{errors.vehicle.message}</ErrorText>
                  )}
                </label>
              </div>
            </div>

            <MyButton className="btn-lg mt-7">Become A Rider</MyButton>
          </form>
        </MyContainer>
      </section>
    </>
  );
};

export default Rider;
