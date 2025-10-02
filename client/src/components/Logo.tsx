function Logo({ title }: { title: string }) {
  return (
    <div className="flex justify-center flex-col items-center mb-5 font-semibold">
      <h2 className="text-xl">
        JLPT{" "}
        <span className="bg-sky-600 text-white font-bold px-2 py-1 rounded-md ml-2">
          FlashCards
        </span>
      </h2>
      <h2 className="mt-5 text-lg">{title}</h2>
    </div>
  );
}
export default Logo;
