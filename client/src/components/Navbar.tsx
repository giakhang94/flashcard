import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import { MdArrowDropDown } from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ToggleMode";

function Navbar() {
  const queryClient = useQueryClient();
  const navigator = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const getCurrentUser = async () => {
    const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/me`, {
      withCredentials: true,
    });
    console.log(resp.data);
    return resp.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      queryClient.setQueryData(["current-user"], null);
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      navigator("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading)
    return (
      <div className="flex justify-between px-20 py-3 mt-2">
        <Link to={"/"}>
          <span className="mr-2 text-neutral-400 font-bold text-xl">JLPT</span>
          <span className="px-2 py-1 bg-cyan-200 rounded-md text-cyan-600 font-bold tracking-[2px] text-xl">
            Flash Card
          </span>
        </Link>
        <div>
          {!data && !isLoading && <Link to="/auth/login">Login</Link>}
          {data && "user"}
          {!data && isLoading && <Loading />}
        </div>
      </div>
    );
  //   if (isError) return <div>Something went wrong</div>;
  return (
    <div className="flex justify-between px-20 py-3 mt-2 shadow-gray-200 shadow-xs dark:shadow-neutral-900">
      <Link to="/">
        <span className="mr-2 text-neutral-400 font-bold text-xl">JLPT</span>
        <span className="px-2 py-1 bg-teal-600 rounded-md font-bold tracking-[2px] text-xl dark:text-white text-teal-100">
          Flash Card
        </span>
      </Link>
      <div>
        {!data && (
          <Link
            to="/auth/login"
            className="font-bold text-xl text-neutral-500 tracking-[1px]"
          >
            Login
          </Link>
        )}
        {data && (
          <div className="flex items-center space-x-3 relative h-full">
            <span className="text-xl text-neutral-500 font-semibold">
              welcome,{" "}
            </span>

            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                setShowMenu((prev) => !prev);
              }}
            >
              <span className="text-teal-600 font-bold capitalize text-xl">
                {data.role}
              </span>
              <MdArrowDropDown />
              {showMenu && (
                <div className="flex flex-col space-y-3 z-20 p-2 absolute top-full right-1 pb-4 rounded-md bg-white dark:bg-neutral-900 dark:text-white text-black w-full shadow-md mt-2">
                  <p
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </p>
                  {data.role === "admin" && (
                    <>
                      <Link to="/admin/cards/add" className="block">
                        Add Cards
                      </Link>
                      <Link to="/admin/register" className="block">
                        Add User
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ModeToggle />
    </div>
  );
}
export default Navbar;
