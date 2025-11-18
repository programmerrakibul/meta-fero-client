import { Link, useNavigate } from "react-router";
import MyButton from "../../../components/MyButton/MyButton";
import MyTitle from "../../../components/MyTitle/MyTitle";
import { useForm } from "react-hook-form";
import ErrorText from "../../../components/ErrorText/ErrorText";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { toast } from "sonner";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useState } from "react";
import useGoogleLogin from "../../../hooks/useGoogleLogin";
import ActionSpinner from "../../../components/ActionSpinner/ActionSpinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { googleLoading, handleGoogleLogin } = useGoogleLogin();
  const { loginUserWithEmail } = useAuthInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginUser = async (info) => {
    setLoading(true);

    try {
      await loginUserWithEmail(info.email, info.password);
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Login Now - Zap Shift</title>

      <form
        onSubmit={handleSubmit(handleLoginUser)}
        className="max-w-md w-full space-y-5"
      >
        <div className="space-y-2.5">
          <MyTitle>Welcome Back</MyTitle>
          <h5 className="font-bold">Login with Zap Shift</h5>
        </div>

        <fieldset className="fieldset text-base">
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            disabled={googleLoading || loading}
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />

          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            disabled={googleLoading || loading}
            {...register("password", { required: "Password is required" })}
          />

          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <MyButton disabled={googleLoading || loading} className="btn-block">
            { loading ? <ActionSpinner /> : "Login"}
          </MyButton>

          <p>
            Don't have an account?{" "}
            <Link to="/auth/register" className="link link-hover">
              Register here
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

export default Login;
