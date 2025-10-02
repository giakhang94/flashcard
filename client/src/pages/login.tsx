/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
interface Input {
  email: string;
  password: string;
}
function Login() {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const [input, setInput] = useState<Input>({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitLogin = async (input: Input) => {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/login`,
      input,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  };
  const mutation = useMutation({
    mutationFn: submitLogin,
    onSuccess: () => {
      toast("Welcome!!");
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      navigator("/");
    },
    onError: (error: any) => {
      toast(error.response.data.message);
      console.log(error);
    },
  });

  return (
    <div className="flex justify-center mt-5">
      <form
        action=""
        className="w-[350px] border border-gray-300  rounded-md py-5 px-5 min-h-[350px]"
      >
        <Logo title="Login" />
        <div className="flex flex-col mb-5">
          <label htmlFor="" className="font-semibold mb-1">
            email
          </label>
          <input
            type="email"
            placeholder=""
            onChange={handleChange}
            value={input.email}
            name="email"
            className="border border-gray-300 rounded-md block px-2 py-1"
          />
        </div>
        <div className="flex flex-col mob-5">
          <label htmlFor="" className="font-semibold mb-1">
            password
          </label>
          <input
            onChange={handleChange}
            name="password"
            value={input.password}
            type="password"
            placeholder=""
            className="border border-gray-300 rounded-md block px-2 py-1"
          />
        </div>
        <button
          className="w-full px-3 py-2 mt-8 bg-sky-600 text-white font-semibold tracking-[1px] rounded-md cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate(input);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
