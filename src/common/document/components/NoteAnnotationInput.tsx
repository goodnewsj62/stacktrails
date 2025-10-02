import { Button } from "@mui/material";
import * as pdfjsLib from "pdfjs-dist";
import { useContext, useState } from "react";
import { ViewerContext } from "../PDFViewer";

type NoteAnnotationInputProps = {
  x: number;
  y: number;
  pdfCoord: PdfPoint;
  page: number;
  viewPort: pdfjsLib.PageViewport;
  close: () => void;
};
const NoteAnnotationInput: React.FC<NoteAnnotationInputProps> = ({
  x,
  y,
  page,
  pdfCoord,
  viewPort,
  close,
}) => {
  const [value, setValue] = useState("");
  const { setState } = useContext(ViewerContext);

  const submitHandler = () => {
    setState((s) => ({
      ...s,
      annotations: [
        ...s.annotations,
        {
          id: crypto.randomUUID(),
          page,
          text: value,
          point: pdfCoord,
          type: "note",
        },
      ],
    }));
    close();
  };

  // const debouncedSetValue = useMemo(
  //   () =>
  //     deBounce((val: string) => {
  //       setValue(val);
  //     }, 500),
  //   []
  // );

  const hozThresh = Math.max(x, viewPort.width);

  return (
    <div
      className={`bg-[#201f1f]  absolute  p-4 rounded-xl w-[280px]`}
      style={{
        top: y,
        left: x + 280 > hozThresh ? x - 280 : x,
      }}
    >
      <textarea
        name="note"
        className={"bg-white w-full p-4"}
        value={value}
        rows={3}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex items-center gap-4 mt-2 ">
        <Button
          fullWidth
          disableElevation
          className={"!capitalize"}
          color="error"
          type="button"
          onClick={close}
        >
          Close
        </Button>
        <Button
          fullWidth
          disableElevation
          className={"!capitalize"}
          type="button"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default NoteAnnotationInput;
