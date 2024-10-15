
const Overview = ({currentVideo}:any) => {

  const getDisplayContent = (
    text: string,
    isCollapsed: boolean,
    wordLimit = 100
  ) => {
    const lines = text.split("\n").map((line) => line.trim());
    const isLong = lines.length > wordLimit;
    const displayContent =
      isCollapsed && isLong
        ? lines.slice(0, wordLimit).join("\n") + "..."
        : text;
    return { displayContent, isLong };
  };


  return (
    <div className="container mt-4 pb-5">
      <div className="row">
        <div className="col-md-5 mb-3">
          <h6 className="form-label fw-bold ">
            About Lesson
          </h6>
        </div>
      </div>

      <div className="row mt-3">
        <div className="mb-3">
          <div className="mt-2">
            <p className="videoPar" dangerouslySetInnerHTML={{__html: currentVideo?.description??"description"}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
