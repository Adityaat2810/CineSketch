import { SignInForm } from "@/components/authentication/signin-form";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  return (
   



  <div className="min-h-screen bg-gradient-to-br  from-zinc-400 via-zinc-700 to-zinc-900 flex justify-center items-center p-4">
  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-white mb-2">Join Us</h1>
      <p className="text-white text-opacity-80">Login to your account </p>
    </div>
    <SignInForm />
    <div className="mt-8 text-center text-white text-opacity-80">
      Do not have an account?
      <button
        onClick={() => navigate('/signup')}
        className="text-white font-semibold hover:text-opacity-100 transition duration-300"
      >
        Sign Up
      </button>
    </div>
  </div>
  </div>
  );
}

export default SignIn;
