import { useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import HiraganaCard from "./HiraganaCard";
import DetailCard from "./DetailCard";
import { Lightbulb } from "lucide-react";
import Hint from "./Hint";

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
  const [showHint, setShowHint] = useState<boolean>(false);
  const handleFlip = () => {
    setShowDetail((prev) => !prev);
  };
  const handleToggle = () => {
    setShowHint((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="w-full h-[300px] bg-neutral-200/80 rounded-lg">
        {!showDetail && !showHint && (
          <HiraganaCard card={card} handleFlip={handleFlip} />
        )}
        {showDetail && !showHint && (
          <DetailCard
            card={card}
            handleFlip={handleFlip}
            index={index}
            single={!!single}
          />
        )}
        {showHint && <Hint card={card} />}
      </div>
      {single && !showDetail && !showHint && (
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
          size={15}
          className="text-sky-600 absolute top-2 right-2 cursor-pointer"
        />
      </Link>
      {!showHint ? (
        <button
          className="flex items-center flex-col absolute bottom-2 right-[50%] translate-x-2/4 transition-all hover:bottom-3 hover:scale-150 group p-3 -mb-3 cursor-pointer"
          onClick={handleToggle}
        >
          <Lightbulb
            size={20}
            className="text-yellow-500 inline-block  mr-2 "
          />
        </button>
      ) : (
        <button
          className="flex items-center flex-col absolute  right-[50%] translate-x-2/4 transition-all bottom-3 scale-150  group p-3 -mb-3 cursor-pointer"
          onClick={handleToggle}
        >
          <Lightbulb
            size={20}
            className="text-yellow-500 fill-amber-200 inline-block hover:fill-amber-200/50 mr-2 "
          />
        </button>
      )}
    </div>
  );
}
export default CardItem;
