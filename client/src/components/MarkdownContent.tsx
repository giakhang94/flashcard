import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export const HintContentMarkdown = ({ content }: { content: string }) => {
  return (
    <div className="prose dark:prose-invert">
      <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </div>
  );
};
