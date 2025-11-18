import { FcGoogle } from "react-icons/fc";

const SocialLogin = ({ onClick, disabled = false }) => {
  return (
    <div className="space-y-3.5">
      <div className="divider">OR</div>

      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="btn bg-white btn-block text-black border-[#e5e5e5]"
      >
        
            <FcGoogle />
            Login with Google
       
      </button>
    </div>
  );
};

export default SocialLogin;
