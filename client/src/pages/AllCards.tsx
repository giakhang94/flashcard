/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CardItem from "../components/CardItem";
import Loading from "../components/Loading";

function AllCards() {
  const getAllCards = async () => {
    const resp = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/cards/all-cards`
    );
    return resp.data;
  };
  const info = useQuery({ queryKey: ["all-cards"], queryFn: getAllCards });
  if (info.isPending) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading classname="h-10 w-10" />
      </div>
    );
  }
  if (info.isError) {
    return <>con cac...</>;
  }
  return (
    <>
      <h1 className="text-center font-semibold text-2xl my-5">All Cards</h1>
      <div className="w-[95%] mx-auto h-screen grid grid-cols-3 p-10 gap-10">
        {info.data.map((card: any, index: number) => {
          return <CardItem card={card} key={index} index={index} />;
        })}
      </div>
    </>
  );
}
export default AllCards;
