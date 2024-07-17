import { SignInForm } from "@/components/authentication/signin-form"

function SignIn() {
  return (
    <div>
      <div className="flex justify-center h-screen 
      items-center pb-8">
        <div>
          <div className="flex justify-center mb-3 text-2xl">
            Login to your account
          </div>
        <div className="w-[400px]">
          <SignInForm />
        </div>

        <div className="flex items-center justify-center 
          mt-5 text-black dark:text-white">
          Do not have a account ?
           <button  className="mx-5 text-blue-600 " >
              Signup
           </button>
        </div>
        </div>



      </div>
    </div>

  )
}

export default SignIn