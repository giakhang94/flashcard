import DOMPurify from "dompurify";
import { useState } from "react";
import Tiptap from "./Tiptap";
function HintContent({ content, id }: { content: string; id: string }) {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  return (
    <div>
      {!isEdit ? (
        <div>
          <h1 className="px-1 text-teal-400 font-semibold text-xl mt-2">
            Hack não chi thuật:{" "}
          </h1>
          <div className="relative">
            <button
              className="absolute top-2 right-2 px-2 py-1 rounded-sm bg-neutral-400 text-xs text-neutral-900 cursor-pointer font-bold"
              onClick={toggleEdit}
            >
              Sửa
            </button>
            <div
              className="text-lg border-1 rounded-md px-3 pt-2 pb-3  mt-2 w-full h-full"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            />
          </div>
        </div>
      ) : (
        <Tiptap id={id} />
      )}
    </div>
  );
}
export default HintContent;
