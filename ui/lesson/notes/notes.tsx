import { useState } from "react";
import dynamic from "next/dynamic";
import noteData from "@/data/sample/sample.json";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Notes = () => {
  const [body, setBody] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleChange = (value: string) => {
    console.log("handle change: ", value);
    setBody(value);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getDisplayContent = (
    text: string,
    isCollapsed: boolean,
    wordLimit = 100
  ) => {
    const words = text.split(" ");
    const isLong = words.length > wordLimit;
    const displayContent =
      isCollapsed && isLong
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
    return { displayContent, isLong };
  };

  const { displayContent, isLong } = getDisplayContent(
    noteData.sampleNote,
    isCollapsed
  );

  return (
    <div className="container mt-4 pb-5">
      <div className="row">
        <div className="col-md-5 mb-3">
          <label className="form-label fw-bold underline-2">Notes</label>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-5 mb-3">
          <button className="bi bi-plus-lg btn btn-success custom-button-4">
            {" "}
            Add Note
          </button>
        </div>
      </div>

      <div className="row mt-3">
        <div className="mb-3">
          <div className="note-title fw-bold">Basics of Next.js</div>
          <div className="mt-2">
            <p>
              {displayContent}
              {isLong && (
                <a
                  onClick={toggleCollapse}
                  className="ms-2"
                  style={{ cursor: "pointer" }}
                >
                  {isCollapsed ? "Read more" : ""}
                </a>
              )}
            </p>
          </div>
        </div>
      </div>

      <hr className="custom-line-break-1" />

      <div className="row">
        <div className="col-md-5 mb-3">
          <label className="form-label fw-bold underline-2">Note Title</label>
          <input type="text" className="form-control mt-3" />
        </div>
      </div>

      <div className="row">
        <div className="col-md-10 mt-4 mb-2">
          <ReactQuill
            theme="snow"
            value={body}
            onChange={handleChange}
            className="custom-quill-1"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-10 d-flex justify-content-end">
          <button className="btn btn-secondary me-2 custom-button-4">
            Cancel
          </button>
          <button className="btn btn-success custom-button-4">
            Post Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
