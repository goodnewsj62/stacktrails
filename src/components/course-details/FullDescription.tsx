import MarkdownRenderer from "@/common/markdown/AppMdRenderer";
import ExpandableContent from "@/common/utils/ExpandableContent";

const markdownText = `
# My Project Title

This is a short description of my project.  
It demonstrates how to use **Markdown** effectively.

## Features
- Simple and clean syntax
- Easy to read
- Portable across platforms
- Supports code snippets

## Code Example
\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"
\`\`\`

## Usage
1. Clone the repository  
2. Install dependencies  
3. Run the app

> Note: Markdown is lightweight and widely supported.
`;

type FullDescriptionProps = {};
const FullDescription: React.FC<FullDescriptionProps> = ({}) => {
  return (
    <section className="">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Full Description
      </h2>

      <div className="w-full ">
        <ExpandableContent maxLines={10}>
          <MarkdownRenderer content={markdownText} />
        </ExpandableContent>
      </div>
    </section>
  );
};

export default FullDescription;
