import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <div className={`relative w-fit ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]} // sanitizes output
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
