import type { Card } from "../types";

function DetailCard({
  card,
  handleFlip,
  index,
  single,
}: {
  card: Card;
  handleFlip: () => void;
  index: number;
  single: boolean;
}) {
  return (
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

        {card.kanji && (
          <a
            className="ml-2 text-3xl text-orange-500 hover:border-1 hover:border-gray-300 hover:scale-150 hover:bg-white hover:z-20 hover:rounded-md p-2"
            href={`https://www.google.com/search?q=ngh%C4%A9a+t%E1%BB%AB+${card.kanji}`}
            target="_blank"
          >
            <span> {card.kanji}</span>
          </a>
        )}
      </div>
      <p className="mt-2 mb-2 text-2xl tracking-[1px] text-teal-500 font-semibold normal mx-2 ">
        {card.meaning}
      </p>
      <p
        className={`${(index + 1) % 3 === 1 && !single ? "origin-left" : ""}  ${
          (index + 1) % 3 === 0 && !single ? "origin-right" : ""
        }
            mt-2 mb-4 text-xl tracking-[1px] text-sky-500 font-semibold hover:border-1 hover:border-gray-300 hover:scale-150 hover:bg-white hover:z-20 hover:rounded-md p-2`}
      >
        {card.example}
      </p>
      <span className="absolute bottom-2 right-2 text-slate-500 font-semibold">
        <span className="capitalize">{card.difficulty}</span>
        <span
          className={`w-2 h-2 rounded-full inline-block mx-2 ${
            card.difficulty === "easy"
              ? "bg-green-500"
              : card.difficulty === "medium"
              ? "bg-yellow-600"
              : "bg-red-500"
          }`}
        ></span>
        <span>
          {card.level} lesson ${card.lesson}
        </span>
      </span>
      <span
        className="absolute bottom-2 left-2 uppercase font-medium text-sm text-teal-600 cursor-pointer"
        onClick={() => {
          handleFlip();
        }}
      >
        Flip
      </span>
    </div>
  );
}
export default DetailCard;
