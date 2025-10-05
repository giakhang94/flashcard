import { useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";

interface CardProps {
  id: string;
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
function CardItem({
  card,
  index,
  single,
  dataLength,
  setIndex,
}: {
  card: CardProps;
  index: number;
  single?: boolean;
  dataLength?: number;
  setIndex?: (index: number) => void;
}) {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  return (
    <div className="relative">
      <div className="w-full h-[300px] bg-neutral-200/80 rounded-lg cursor-pointer">
        {!showDetail && (
          <div className="hiragana flex justify-center  items-center relative w-full h-full bg-neutral-200 rounded-md dark:bg-neutral-900">
            <p className="text-4xl text-teal-600 font-medium">
              {card.hiragana}
            </p>
            <span className="absolute bottom-2 right-2 text-slate-500 font-semibold">{`${card.difficulty} = ${card.level} lesson ${card.lesson}`}</span>
            <span
              className="absolute bottom-2 left-2 uppercase font-medium text-sm text-teal-600 cursor-pointer"
              onClick={() => {
                setShowDetail((prev) => !prev);
              }}
            >
              Flip
            </span>
          </div>
        )}
        {showDetail && (
          <div className="detail relative flex flex-col w-full h-full bg-neutral-200 rounded-md p-2 dark:bg-neutral-900">
            <div className="flex items-center justify-around mt-2">
              <p className="text-3xl text-teal-600 font-medium  hover:border-gray-300 hover:scale-150 hover:bg-white hover:z-20 hover:rounded-md p-2">
                {card.hiragana}
              </p>
              <p className="text-center text-3xl text-sky-700  font-medium capitalize">
                {card.romaji}
              </p>
            </div>
            <div className="flex justify-between w-full my-3">
              <p className=" text-3xl text-neutral-600 dark:text-neutral-300 dark:hover:text-neutral-600 hover:border-1 hover:border-gray-300 hover:scale-150 hover:bg-white hover:z-20 hover:rounded-md p-2">
                {" "}
                {card.katakana}
              </p>

              <a
                className="ml-2 text-3xl text-orange-500 hover:border-1 hover:border-gray-300 hover:scale-150 hover:bg-white hover:z-20 hover:rounded-md p-2"
                href={`https://www.google.com/search?q=ngh%C4%A9a+t%E1%BB%AB+${card.kanji}`}
                target="_blank"
              >
                <span> {card.kanji || ""}</span>
              </a>
            </div>
            <p className="mt-2 mb-2 text-2xl tracking-[1px] text-teal-500 font-semibold normal mx-2 ">
              {card.meaning}
            </p>
            <p
              className={`${
                (index + 1) % 3 === 1 && !single ? "origin-left" : ""
              }  ${(index + 1) % 3 === 0 && !single ? "origin-right" : ""}
            mt-2 mb-4 text-xl tracking-[1px] text-sky-500 font-semibold hover:border-1 hover:border-gray-300 hover:scale-150 hover:bg-white hover:z-20 hover:rounded-md p-2`}
            >
              {card.example}
            </p>
            <span className="absolute bottom-2 right-2 text-slate-500 font-semibold">{`${card.difficulty} = ${card.level} lesson ${card.lesson}`}</span>
            <span
              className="absolute bottom-2 left-2 uppercase font-medium text-sm text-teal-600 cursor-pointer"
              onClick={() => {
                setShowDetail((prev) => !prev);
              }}
            >
              Flip
            </span>
          </div>
        )}
      </div>
      {single && !showDetail && (
        <>
          <FaArrowAltCircleRight
            size={29}
            className="text-teal-600  cursor-pointer absolute top-2/4 right-0 -translate-y-[50%] mx-2 opacity-25 hover:opacity-100 z-90"
            onClick={() => {
              if (index === dataLength! - 1) {
                setIndex!(0);
              } else {
                setIndex!(index + 1);
              }
            }}
          />
          <FaArrowAltCircleLeft
            size={29}
            className="text-teal-600  cursor-pointer absolute top-2/4 left-0 -translate-y-[50%] mx-2 opacity-25 hover:opacity-100 z-90"
            onClick={() => {
              if (index === 0) {
                setIndex!(dataLength! - 1);
              } else {
                setIndex!(index - 1);
              }
            }}
          />
        </>
      )}
      <Link to={`/admin/cards/edit/${card.id}`}>
        <FaEdit
          size={20}
          className="text-sky-600 absolute top-2 right-2 cursor-pointer"
        />
      </Link>
    </div>
  );
}
export default CardItem;
