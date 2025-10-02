import useHideOnClickedOutside from "@/hooks/useHideOnClickedOutside";
import { useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

const DisplayNote: React.FC<AnnotationPinProps> = (props) => {
  const {
    annotation: { point },
    viewport,
  } = props;
  const [showContent, setShowContent] = useState(false);
  const [screenX, screenY] = viewport.convertToViewportPoint(point.x, point.y);
  return (
    <div
      className={`absolute    pointer-events-auto`}
      style={{
        left: `${screenX}px`,
        top: `${screenY}px`,
        // This transform is crucial for positioning the *center* of the pin
        // at the coordinate, not its top-left corner.
        transform: "translate(-50%, -50%)",
      }}
    >
      {!showContent && (
        <div
          onClick={() => setShowContent(true)}
          className="bg-blue-500 rounded-full w-6 h-6  grid place-items-center text-white border-2 border-white shadow-lg cursor-pointer"
          title="note"
        >
          <CgNotes size={12} />
        </div>
      )}
      {showContent && (
        <NoteText {...props} onClose={() => setShowContent(false)} />
      )}
    </div>
  );
};

export default DisplayNote;

// & { coords: { x: number; y: number } }

function NoteText({
  annotation: { text },
  onClose,
}: AnnotationPinProps & { onClose: () => void }) {
  const ref = useHideOnClickedOutside(onClose);
  return (
    <div
      className={`w-[280px] p-2 rounded-md pt-4 bg-[#2e2d2d] text-white absolute`}
      style={{
        left: 0,
        top: 0,
      }}
      ref={ref}
    >
      <div className="flex absolute w-full px-4 text-gray-300 items-center gap-4 justify-end">
        <button type="button" title="edit">
          <FaEdit size={15} />
        </button>
        <button type="button" title="delete">
          <FaRegTrashAlt size={15} />
        </button>
      </div>
      <div className="p-2 pt-6 text-sm">{text}</div>
    </div>
  );
}
