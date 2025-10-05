/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import randomIndex from "../utils/randomIndex";
import CardItem from "../components/CardItem";
import { Label } from "../src/components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../src/components/components/ui/select";
import { Input } from "../src/components/components/ui/input";
import Loading from "../components/Loading";
import StrokeOrderGuide from "../components/StrokeOrders";

import { MdArrowDropDown } from "react-icons/md";

interface Input {
  lesson: number;
  level: "N1" | "N2" | "N3" | "N4" | "N5";
}

function Home() {
  const [input, setInput] = useState<Input>({ level: "N5", lesson: 1 });
  const [index, setIndex] = useState<number>(0);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSetIndex = (i: number) => {
    setIndex(i);
  };
  const getCards = async () => {
    const resp = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/cards/level/?level=${input.level}`
    );
    return resp.data;
  };
  const { data, isError, isLoading } = useQuery({
    queryKey: ["card-level", input.level],
    queryFn: getCards,
  });
  const filteredData = useMemo(() => {
    if (!data) return [];
    const targetLesson = parseInt(input.lesson.toString());
    if (targetLesson === 0) return randomIndex(data);
    const filter =
      data && data.filter((card: any) => card.lesson === targetLesson);
    return randomIndex(filter);
  }, [data, input.lesson]);

  if (isLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading classname="h-10 w-10" />
      </div>
    );
  if (isError)
    return (
      <div className="flex w-full justify-center items-center">
        Something went wrong
      </div>
    );

  return (
    <div className="w-full p-10 mx-auto flex flex-col justify-center items-center max-w-[880px]">
      <div className="w-full">
        <form action="" className="flex w-full mx-auto space-x-10">
          <div className="flex mb-5 items-center w-full space-x-4">
            <Label htmlFor="level" className="font-semibold">
              Level
            </Label>
            <Select
              name="level"
              value={input.level}
              onValueChange={(value) =>
                handleChange({ target: { name: "level", value } })
              }
            >
              <SelectTrigger className="w-full max-w-[500px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="N5">N5</SelectItem>
                <SelectItem value="N4">N4</SelectItem>
                <SelectItem value="N3">N3</SelectItem>
                <SelectItem value="N2">N2</SelectItem>
                <SelectItem value="N1">N1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center mb-5 space-x-4">
            <Label htmlFor="lesson" className="font-semibold">
              Lesson
            </Label>
            <Input
              id="lesson"
              name="lesson"
              type="number"
              min={0}
              step={1}
              value={input.lesson}
              onChange={handleChange}
              className="w-full max-w-[500px]"
            />
          </div>
        </form>
      </div>
      <div className="w-full relative">
        {filteredData!.length === 0 && <div>No cards to display </div>}
        {filteredData!.length > 0 && (
          <div className="w-full">
            <CardItem
              card={filteredData![index]}
              index={index}
              single
              setIndex={handleSetIndex}
              dataLength={filteredData!.length}
            />
          </div>
        )}
      </div>
      <div className="w-full">
        <h1
          className="text-2xl font-semibold text-teal-600 tracking-[1px] cursor-pointer my-8 text-left block w-full"
          onClick={() => {
            setShowGuide((prev) => !prev);
          }}
        >
          <span>Show Stroke Order Rules</span>
          <span>
            <MdArrowDropDown className="inline" />
          </span>
        </h1>
        {showGuide && <StrokeOrderGuide />}
      </div>
    </div>
  );
}
export default Home;
