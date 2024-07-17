import { useForm } from "react-hook-form"
import {SignInInput, signInInput, } from '@adityaat2810/cine-draw'
import { Button } from "@/components/ui/button"
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

export const SignInForm=()=>{
    // defining form 
    const form = useForm<SignInInput>({
      resolver: zodResolver(signInInput),
        defaultValues: {
          email:'',
          passwordHash:''
        },

      });

      function onSubmit(values: SignInInput) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
         
         if( !values.email || !values.passwordHash
         ){
          alert('PLease fill all details')
         }
         console.log(values)
         
      }



    return (
       <div className="flex justify-center items-center w-full
       border-2 px-8 py-10  rounded-sm dark:border-slate-400 ">
         <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-7">
              

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
