import { useForm } from "react-hook-form";
import { SignInInput, signInInput } from '@adityaat2810/cine-draw';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from 'react-icons/fi';

export const SignInForm = () => {
  const navigate = useNavigate();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInInput),
    defaultValues: {
      email: '',
      passwordHash: ''
    },
  });

  const onSubmit = async (values: SignInInput) => {
    if (!values.email || !values.passwordHash) {
      alert('Please fill all details');
      return;
    }
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/signin', values);
      if (res.data.success) {
        localStorage.setItem('authentication-token', res.data.token);
        console.log(res.data.token);
        navigate('/'); // Navigate to the home page
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Sign-in failed. Please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="relative">
        <FiMail className="absolute top-3 left-3 text-white text-opacity-80" />
        <input
          {...form.register("email")}
          type="email"
          placeholder="Email"
          className="w-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        />
        {form.formState.errors.email && (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="relative">
        <FiLock className="absolute top-3 left-3 text-white text-opacity-80" />
        <input
          {...form.register("passwordHash")}
          type="password"
          placeholder="Password"
          className="w-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        />
        {form.formState.errors.passwordHash && (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.passwordHash.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition duration-300"
      >
        Sign In
      </button>
    </form>
  );
};