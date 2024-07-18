import { useForm } from "react-hook-form"
import {SignUpInput, signUpInput, } from '@adityaat2810/cine-draw'
import { Button } from "@/components/ui/button"
import axios from 'axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

export const SignupForm=()=>{
    // defining form 
    const navigate = useNavigate();

    const form = useForm<SignUpInput>({
      resolver: zodResolver(signUpInput),
        defaultValues: {
          username: "",
          passwordHash:'',
          email:'',
          avatarUrl:''
        },

      });

      async function onSubmit(values: SignUpInput) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
         values.avatarUrl='ddefdc'
         if(!values.avatarUrl || !values.email ||
           !values.username || !values.passwordHash
         ){
          alert('PLease fill all details')
         }
         try {
          const res = await axios.post('http://localhost:3000/api/v1/user/signup', values);
          if (res.data.success) {
            // Clear form data
            form.reset({
              username: "",
              passwordHash: "",
              email: "",
              avatarUrl: ""
            });
            // Navigate to sign-in page
            navigate('/signin');
          }
        } catch (error) {
          console.error('Signup error:', error);
          // Handle error accordingly
        }      
         
         
      }



    return (
       <div className="flex justify-center items-center w-full
       border-2 px-8 py-10  rounded-sm dark:border-slate-400 ">
         <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7">
              <FormField
               
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name="passwordHash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className ="w-full"
              type="submit">Submit</Button>
            </form>
        </Form>
       </div>
    )
}
