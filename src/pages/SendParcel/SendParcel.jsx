import { useForm, useWatch } from "react-hook-form";
import MyButton from "../../components/MyButton/MyButton";
import MyTitle from "../../components/MyTitle/MyTitle";
import MyContainer from "../Shared/MyContainer/MyContainer";
import ErrorText from "../../components/ErrorText/ErrorText";
import { useLoaderData } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";
import Swal from "sweetalert2";
import useSecureAxios from "../../hooks/useSecureAxios";
import { toast } from "sonner";

const SendParcel = () => {
  const secureAxios = useSecureAxios();
  const { currentUser } = useAuthInfo();
  const { data } = useLoaderData();
  const duplicateRegions = data.map((item) => item.region);
  const regions = [...new Set(duplicateRegions)];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const senderRegion = useWatch({ control, name: "sender_region" });
  const receiverRegion = useWatch({ control, name: "receiver_region" });

  const districtByRegion = (region) => {
    const districts = data.reduce((acc, item) => {
      if (item.region === region) {
        acc.push(item.district);
      }
      return acc;
    }, []);

    return districts;
  };

  const handleSendParcel = async (info) => {
    const isDocument = info.document_type === "document";
    const isSameDistrict = info.sender_district === info.receiver_district;
    const parcelWeight = parseFloat(info.parcel_weight);
    let deliveryCharge = 0;

    Object.entries(info).forEach(([key, value]) => {
      info[key] = value.trim();
    });

    info.parcel_weight = parcelWeight;
    info.sender_number = Number(info.sender_number);
    info.receiver_number = Number(info.receiver_number);
    info.uid = currentUser.uid;
    info.created_at = new Date().toISOString();
    info.delivery_status = "pending";
    info.payment_status = "pending";

    if (isDocument) {
      deliveryCharge = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        deliveryCharge = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        deliveryCharge = minCharge + extraCharge;
      }
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You'll be charged ${deliveryCharge} Taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agreed",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await secureAxios.post("/parcels", {
          ...info,
          deliveryCharge,
        });

        if (data.success) {
          Swal.fire({
            title: "Parcel data uploaded",
            text: "Your parcel data has been uploaded.",
            icon: "success",
          });
        }
      } catch {
        toast.error("Parcel data uploaded failed");
      }
    }
  };

  return (
    <>
      <title>Send your parcel - MetaFero</title>

      <section className="my-10">
        <MyContainer className="bg-white p-8! md:p-14! space-y-7">
          <div className="space-y-3.5">
            <MyTitle>Send A Parcel</MyTitle>
            <h5 className="text-xl font-semibold">Enter your parcel details</h5>
          </div>

          <div className="divider"></div>

          <form onSubmit={handleSubmit(handleSendParcel)}>
            <div className="fieldset gap-5 text-base">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-3.5">
                  <label className="label gap-1.5">
                    <input
                      type="radio"
                      value="document"
                      className="radio radio-primary"
                      {...register("document_type", {
                        required: "Document type is required",
                      })}
                    />
                    <span>Document</span>
                  </label>

                  <label className="label gap-1.5">
                    <input
                      type="radio"
                      value="non-document"
                      className="radio radio-primary"
                      {...register("document_type", {
                        required: "Document type is required",
                      })}
                    />
                    <span>Non-Document</span>
                  </label>
                </div>

                {errors.document_type && (
                  <ErrorText>{errors.document_type.message}</ErrorText>
                )}

                <div className="flex items-center justify-between gap-12">
                  <label className="label flex-col items-start gap-1">
                    <span>Parcel Name</span>

                    <input
                      type="text"
                      className="input"
                      placeholder="Parcel Name"
                      {...register("parcel_name", {
                        required: "Parcel Name is required",
                        validate: (value) => {
                          if (!value.trim()) return "Parcel Name is required";
                        },
                      })}
                    />

                    {errors.parcel_name && (
                      <ErrorText>{errors.parcel_name.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Parcel Weight</span>
                    <input
                      type="number"
                      step="any"
                      className="input"
                      placeholder="Parcel Weight"
                      {...register("parcel_weight", {
                        required: "Parcel Weight is required",
                      })}
                    />

                    {errors.parcel_weight && (
                      <ErrorText>{errors.parcel_weight.message}</ErrorText>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between gap-12">
                {/* Sender Details */}
                <div className="flex-1 space-y-3.5">
                  <h6 className="text-xl font-bold">Sender Details</h6>

                  <label className="label flex-col items-start gap-1">
                    <span>Name</span>
                    <input
                      type="text"
                      className="input"
                      defaultValue={currentUser.displayName}
                      placeholder="Name"
                      {...register("sender_name")}
                      readOnly
                    />
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Email</span>
                    <input
                      type="email"
                      className="input"
                      defaultValue={currentUser.email}
                      placeholder="Email"
                      {...register("sender_email")}
                      readOnly
                    />
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Address</span>
                    <input
                      type="text"
                      className="input"
                      placeholder="Address"
                      {...register("sender_address", {
                        required: "Sender Address is required",
                        validate: (value) => {
                          if (!value.trim())
                            return "Sender Address is required";
                        },
                      })}
                    />

                    {errors.sender_address && (
                      <ErrorText>{errors.sender_address.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Phone No</span>
                    <input
                      type="number"
                      className="input"
                      placeholder="Phone No"
                      {...register("sender_number", {
                        required: "Sender Number is required",
                        validate: (value) => {
                          if (!value.trim()) return "Sender Number is required";
                        },
                      })}
                    />

                    {errors.sender_number && (
                      <ErrorText>{errors.sender_number.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Your Region</span>
                    <select
                      defaultValue=""
                      className="select"
                      {...register("sender_region", {
                        required: "Sender Region is required",
                      })}
                    >
                      <option disabled={true} value="">
                        Select your Region
                      </option>
                      {regions.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    {errors.sender_region && (
                      <ErrorText>{errors.sender_region.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Your District</span>
                    <select
                      defaultValue=""
                      className="select"
                      {...register("sender_district", {
                        required: "Sender District is required",
                      })}
                    >
                      <option disabled={true} value="">
                        Select your District
                      </option>
                      {districtByRegion(senderRegion).map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    {errors.sender_district && (
                      <ErrorText>{errors.sender_district.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Pickup Instruction</span>
                    <textarea
                      name=""
                      className="textarea"
                      placeholder="Pickup Instruction"
                      {...register("pickup_instruction", {
                        required: "Pickup Instruction is required",
                        validate: (value) => {
                          if (!value.trim())
                            return "Pickup Instruction is required";
                        },
                      })}
                    ></textarea>

                    {errors.pickup_instruction && (
                      <ErrorText>{errors.pickup_instruction.message}</ErrorText>
                    )}
                  </label>
                </div>

                {/* Receiver Details */}
                <div className="flex-1 space-y-3.5">
                  <h6 className="text-xl font-bold">Receiver Details</h6>

                  <label className="label flex-col items-start gap-1">
                    <span>Name</span>
                    <input
                      type="text"
                      className="input"
                      placeholder="Name"
                      {...register("receiver_name", {
                        required: "Receiver Name is required",
                        validate: (value) => {
                          if (!value.trim()) return "Receiver Name is required";
                        },
                      })}
                    />

                    {errors.receiver_name && (
                      <ErrorText>{errors.receiver_name.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Email</span>
                    <input
                      type="email"
                      className="input"
                      placeholder="Email"
                      {...register("receiver_email", {
                        required: "Receiver Email is required",
                        validate: (value) => {
                          if (!value.trim())
                            return "Receiver Email is required";
                        },
                      })}
                    />

                    {errors.receiver_email && (
                      <ErrorText>{errors.receiver_email.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Address</span>
                    <input
                      type="text"
                      className="input"
                      placeholder="Address"
                      {...register("receiver_address", {
                        required: "Receiver Address is required",
                        validate: (value) => {
                          if (!value.trim())
                            return "Receiver Address is required";
                        },
                      })}
                    />

                    {errors.receiver_address && (
                      <ErrorText>{errors.receiver_address.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Phone No</span>
                    <input
                      type="number"
                      className="input"
                      placeholder="Phone No"
                      {...register("receiver_number", {
                        required: "Receiver Number is required",
                      })}
                    />

                    {errors.receiver_number && (
                      <ErrorText>{errors.receiver_number.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Your Region</span>
                    <select
                      defaultValue=""
                      className="select"
                      {...register("receiver_region", {
                        required: "Sender Region is required",
                      })}
                    >
                      <option disabled={true} value="">
                        Select your Region
                      </option>
                      {regions.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    {errors.receiver_region && (
                      <ErrorText>{errors.receiver_region.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Your District</span>
                    <select
                      defaultValue=""
                      className="select"
                      {...register("receiver_district", {
                        required: "Sender District is required",
                      })}
                    >
                      <option disabled={true} value="">
                        Select your District
                      </option>
                      {districtByRegion(receiverRegion).map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    {errors.receiver_district && (
                      <ErrorText>{errors.receiver_district.message}</ErrorText>
                    )}
                  </label>

                  <label className="label flex-col items-start gap-1">
                    <span>Delivery Instruction</span>
                    <textarea
                      name=""
                      className="textarea"
                      placeholder="Delivery Instruction"
                      {...register("delivery_instruction", {
                        required: "Delivery Instruction is required",
                        validate: (value) => {
                          if (!value.trim())
                            return "Delivery Instruction is required";
                        },
                      })}
                    ></textarea>

                    {errors.delivery_instruction && (
                      <ErrorText>
                        {errors.delivery_instruction.message}
                      </ErrorText>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <MyButton className="btn-lg mt-7">
              Proceed to Confirm Booking
            </MyButton>
          </form>
        </MyContainer>
      </section>
    </>
  );
};

export default SendParcel;
