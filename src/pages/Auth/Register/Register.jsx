import { Link } from "react-router";
import MyButton from "../../../components/MyButton/MyButton";
import MyTitle from "../../../components/MyTitle/MyTitle";
import { useForm } from "react-hook-form";
import ErrorText from "../../../components/ErrorText/ErrorText";
import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import { useState } from "react";
import ActionSpinner from "../../../components/ActionSpinner/ActionSpinner";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const { googleLoading, handleGoogleLogin } = useGoogleLogin();
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile } = useAuthInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (info) => {
    setLoading(true);

    const displayName = info.name;
    const imageInfo = info.image[0];
    const formData = new FormData();
    formData.append("image", imageInfo);

    try {
      const { data: result } = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: import.meta.env.VITE_APP_image_host_key,
          },
        }
      );

      const photoURL = result.data.url;
      const userCredentials = await createUser(info.email, info.password);
      const user = userCredentials.user;
      await updateUserProfile({ ...user, displayName, photoURL });

      console.log(user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (value) => {
    if (!value) return true;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasUpperCase)
      return "Password must contain at least one uppercase letter";
    if (!hasLowerCase)
      return "Password must contain at least one lowercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar)
      return "Password must contain at least one special character";

    return true;
  };

  return (
    <>
      <title>Create account - Zap Shift</title>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-md w-full space-y-5"
      >
        <div className="space-y-2.5">
          <MyTitle>Create your account</MyTitle>
          <h5 className="font-bold">Register with Zap Shift</h5>
        </div>

        <fieldset className="fieldset text-base">
          <label className="label">Name</label>
          <input
            disabled={googleLoading || loading}
            type="name"
            {...register("name", {
              required: "Name is required",
              validate: (value) => {
                if (!value.trim()) return "Name is required";
              },
            })}
            className="input"
            placeholder="Name"
          />

          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

          <label className="label">Upload Image</label>
          <input
            disabled={googleLoading || loading}
            {...register("image", { required: "Image is required" })}
            type="file"
            className="file-input"
          />

          {errors.image && <ErrorText>{errors.image.message}</ErrorText>}

          <label className="label">Email</label>
          <input
            disabled={googleLoading || loading}
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input"
            placeholder="Email"
          />

          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <label className="label">Password</label>
          <input
            disabled={googleLoading || loading}
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              validate: validatePassword,
            })}
            className="input"
            placeholder="Password"
          />

          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <MyButton disabled={googleLoading || loading} className="btn-block">
            {loading ? <ActionSpinner /> : "Register"}
          </MyButton>

          <p>
            Already have an account?{" "}
            <Link to="/auth/login" className="link link-hover">
              Login here
            </Link>
          </p>
        </fieldset>

        <SocialLogin
          disabled={googleLoading || loading}
          onClick={handleGoogleLogin}
        />
      </form>
    </>
  );
};

export default Register;
