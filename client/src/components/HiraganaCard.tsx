import type { Card } from "../types";

function HiraganaCard({
  card,
  handleFlip,
}: {
  card: Card;
  handleFlip: () => void;
}) {
  return (
    <div className="hiragana flex justify-center  items-center relative w-full h-full bg-neutral-200 rounded-md dark:bg-neutral-900">
      <p className="text-4xl text-teal-600 font-medium">{card.hiragana}</p>
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
export default HiraganaCard;
