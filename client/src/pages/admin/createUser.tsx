/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Logo from "../../components/Logo";
import { toast } from "react-toastify";
interface Input {
  email: string;
  password: string;
  role: "admin" | "user";
  isAllow: boolean;
}
function CreateUser() {
  const [input, setInput] = useState<Input>({
    email: "",
    password: "",
    role: "user",
    isAllow: true,
  });
  const handleChange = (e: any) => {
    if (e.target.name !== "isAllow") {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setInput((prev) => ({ ...prev, isAllowed: e.target.checked }));
    }
  };

  const submitCreateUser = async (input: Input) => {
    const resp = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/register`,
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
    mutationFn: submitCreateUser,
    onSuccess: () => {
      toast("user created");
    },
    onError: async (error: any) => {
      console.log(error);
      if (error.response.data.message === "Unauthorized") {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, {
          withCredentials: true,
        });
        mutation.mutate(input);
      } else {
        toast(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex justify-center mt-5">
      <form
        action=""
        className="w-[350px] border border-gray-300  rounded-md py-5 px-5 min-h-[350px]"
      >
        <Logo title="Create new user" />
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
        <div className="flex flex-col mb-5">
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
        <div className="flex flex-col mb-5">
          <label htmlFor="role" className="font-semibold mb-1">
            role
          </label>
          <select
            name="role"
            id="role"
            value={input.role}
            onChange={handleChange}
            className="border border-gray-300 rounded-md block px-2 py-2"
          >
            <option value="user" defaultChecked>
              user
            </option>
            <option value="admin">admin</option>
          </select>
        </div>
        <div className="flex items-center space-x-5 mb-5">
          <label htmlFor="isAllowed" className="font-semibold mb-1">
            Allow to edit cards?
          </label>
          <input
            onChange={handleChange}
            name="isAllow"
            type="checkbox"
            placeholder=""
            checked={input.isAllow}
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
      {/* <button
        onClick={() => {
          console.log(input);
        }}
      >
        test
      </button> */}
    </div>
  );
}
export default CreateUser;
