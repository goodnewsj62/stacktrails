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
  showDescription?: boolean;
  contentType?: ModuleType;
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
const Module: React.FC<ModuleProps> = ({
  contentType = "video",
  showDescription,
}) => {
  const [fullDescription, setFullDescription] = useState(false);

  return (
    <div className="text-sm  ">
      <div className="flex items-center gap-8">
        <h3>
          {contentTypeIcons[contentType]}
          Module title
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
            content={
              "This provides a clear visual cue for users to expand or collapse the module description. If you want to further style or animate the icon, just let me know!"
            }
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
