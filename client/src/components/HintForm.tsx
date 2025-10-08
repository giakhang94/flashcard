import Tiptap from "./Tiptap";

function HintForm({ id }: { id: string }) {
  return (
    <div className="mx-auto my-5 w-full h-full z-40">
      <div>
        <Tiptap id={id} />
      </div>
    </div>
  );
}
export default HintForm;
