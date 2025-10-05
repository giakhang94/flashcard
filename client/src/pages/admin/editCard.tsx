/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Logo from "../../components/Logo";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../src/components/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/components/ui/select";
import { Label } from "../../src/components/components/ui/label";
import Loading from "../../components/Loading";
interface Input {
  hiragana: string;
  katakana: string;
  kanji: string;
  romaji: string;
  meaning: string;
  example: string;
  lesson: number;
  level: "N1" | "N2" | "N3" | "N4" | "N5";
  difficulty: "easy" | "medium" | "hard";
}
function EditCard() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [input, setInput] = useState<Input>({
    hiragana: "",
    katakana: "",
    kanji: "",
    romaji: "",
    meaning: "",
    example: "",
    lesson: 1,
    level: "N5",
    difficulty: "medium",
  });
  const handleChange = (e: any) => {
    if (e.target.name !== "isAllow") {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    } else {
      setInput((prev) => ({ ...prev, isAllowed: e.target.checked }));
    }
  };
  const getCardById = async () => {
    const resp = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/cards/${id}`
    );
    return resp.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["edit card"],
    queryFn: getCardById,
  });
  const submitAddCard = async (input: Input) => {
    const resp = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/cards/edit/${id}`,
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
    mutationFn: submitAddCard,
    onSuccess: () => {
      toast("card updated");
      navigator("/");
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

  useEffect(() => {
    if (data) setInput(data);
  }, [data]);
  if (isLoading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading classname="h-10 w-10" />
      </div>
    );
  if (isError) {
    toast((error as any).response.data.message);
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <Logo title="Edit card" />
      <form
        action=""
        className="w-[80%]  border border-gray-300 dark:border-neutral-800 outline=none dark:outline-none rounded-md py-5 px-5 min-h-[350px]"
      >
        <div className="grid grid-cols-2 gap-x-10">
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold mb-1">
              Hiragana
            </label>
            <Input
              type="text"
              placeholder=""
              onChange={handleChange}
              value={input.hiragana}
              name="hiragana"
              className="border border-gray-300 dark:border-neutral-800 outline=none dark:outline-nonerounded-md block px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold mb-1">
              Katakna
            </label>
            <Input
              onChange={handleChange}
              name="katakana"
              value={input.katakana}
              type="text"
              placeholder=""
              className="border border-gray-300 dark:border-neutral-800 outline=none dark:outline-nonerounded-md block px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold mb-1">
              Kanji
            </label>
            <Input
              onChange={handleChange}
              name="kanji"
              value={input.kanji}
              type="text"
              placeholder=""
              className="border border-gray-300 dark:border-neutral-800 outline=none dark:outline-nonerounded-md block px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold mb-1">
              Romaji
            </label>
            <Input
              onChange={handleChange}
              name="romaji"
              value={input.romaji}
              type="text"
              placeholder=""
              className="border border-gray-300 dark:border-neutral-800 outline=none dark:outline-nonerounded-md block px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold mb-1">
              Meaning
            </label>
            <Input
              onChange={handleChange}
              name="meaning"
              value={input.meaning}
              type="text"
              placeholder=""
              className="border border-gray-300 dark:border-neutral-800 outline=none dark:outline-nonerounded-md block px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold mb-1">
              Example
            </label>
            <Input
              onChange={handleChange}
              name="example"
              value={input.example}
              type="text"
              placeholder=""
              className="border border-gray-300 dark:border-neutral-800 outline=none dark:outline-nonerounded-md block px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="" className="font-semibold mb-1">
              Lesson
            </label>
            <Input
              onChange={handleChange}
              name="lesson"
              value={input.lesson}
              type="number"
              min={1}
              placeholder=""
              className="border border-gray-300 dark:border-neutral-800 outline=none dark:outline-nonerounded-md block px-2 py-1"
            />
          </div>
          <div className="flex flex-col mb-5">
            <Label htmlFor="difficulty" className="font-semibold mb-1">
              Difficulty
            </Label>
            <Select
              name="difficulty"
              value={input.difficulty}
              onValueChange={(value) =>
                handleChange({ target: { name: "difficulty", value } })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">easy</SelectItem>
                <SelectItem value="medium">medium</SelectItem>
                <SelectItem value="hard">hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col mb-5">
            <Label htmlFor="level" className="font-semibold mb-1">
              Level
            </Label>
            <Select
              name="level"
              value={input.level}
              onValueChange={(value) =>
                handleChange({ target: { name: "level", value } })
              }
            >
              <SelectTrigger className="w-full">
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
        </div>

        <button
          className="w-full mt-4 py-2 bg-sky-600 text-white font-semibold tracking-[1px] rounded-md cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate(input);
          }}
        >
          Submit Add
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
export default EditCard;
