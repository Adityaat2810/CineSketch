import { SignupForm } from "@/components/authentication/signup-form"
import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate()
  const onClick =()=>{
    navigate('/signin')
  }
  return (
    <div>
      <div className="flex justify-center h-screen 
      items-center pb-8">
        <div>
          <div className="flex justify-center mb-3 text-2xl">
            Create a new account
          </div>
        <div className="w-[400px]">
          <SignupForm />
        </div>

        <div className="flex items-center justify-center 
          mt-5 text-black dark:text-white">
          Already have account ?
           <button onClick={onClick}  className="mx-5 text-blue-600 " >
              SignIn
           </button>
        </div>
        </div>



      </div>
    </div>

  )
}

export default Signup