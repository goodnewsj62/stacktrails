"use client";

import MarkdownRenderer from "@/common/markdown/AppMdRenderer";
import ControlledAccordion from "@/common/utils/ControlledAccordion";
import { useState } from "react";
import {
  MdDescription,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardVoice,
  MdLink,
  MdOndemandVideo,
  MdQuiz,
} from "react-icons/md";

type ModuleProps = {
  data: Module;
  showDescription?: boolean;
};
const contentTypeIcons = {
  video: (
    <MdOndemandVideo className="inline-block w-5 h-5 mr-2 text-blue-500" />
  ),
  document: (
    <MdDescription className="inline-block w-5 h-5 mr-2 text-green-600" />
  ),
  quiz: <MdQuiz className="inline-block w-5 h-5 mr-2 text-yellow-500" />,
  discussion: (
    <MdKeyboardVoice className="inline-block w-5 h-5 mr-2 text-orange-500" />
  ),
  external_link: (
    <MdLink className="inline-block w-5 h-5 mr-2 text-purple-500" />
  ),
};
const Module: React.FC<ModuleProps> = ({ data, showDescription }) => {
  const [fullDescription, setFullDescription] = useState(false);

  return (
    <div className="text-sm p-2 px-6 border border-base rounded-md">
      <div className="flex items-center gap-8">
        <h3>
          {contentTypeIcons[data.module_type]}
          {data.title}
        </h3>
        {showDescription && (
          <button
            className="flex items-center gap-1 bg-secondary rounded-full p-1 opacity-65"
            onClick={() => setFullDescription(!fullDescription)}
          >
            {fullDescription ? (
              <MdKeyboardArrowUp className="w-5 h-5" />
            ) : (
              <MdKeyboardArrowDown className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      <div className="font-light">
        <ControlledAccordion
          expanded={fullDescription}
          onChange={() => setFullDescription(!fullDescription)}
          variant="minimal"
          disabled
          headerBackgroundColor="transparent"
        >
          <MarkdownRenderer
            content={data.description || "creator did not add description"}
          />
        </ControlledAccordion>
      </div>
      <div>
        {/* another controlled accordion for content will be here on click will show attachment */}
      </div>
    </div>
  );
};

export default Module;
