export default function CompletedAssignment() {
  return (
    <table className="rbt-table table table-borderless" style={{minWidth:'10px'}}>
      <thead>
        <tr>
          <th>Assignment Name</th>
          <th>Total Marks</th>
          <th># Submissions</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <span className="h6 mb--5">
              Write Link short essay on yourself using the 5
            </span>
            <p className="b3">
              Module:{" "}
              <a href="/instructor/instructor-assignments#">Fundamentals 101</a>
            </p>
          </th>
          <td>
            <p className="b3">80</p>
          </td>
          <td>
            <p className="b3">2</p>
          </td>
          <td>
            <div className="rbt-button-group justify-content-end">
              {/* <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a>
                <a
                  className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                  title="Delete"
                  href="/instructor/instructor-assignments#"
                >
                  <i className="feather-trash-2 pl--0" />
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="h6 mb--5">Speaking Korean for Beginners</span>
              <p className="b3">
                Course:{" "}
                <a href="/instructor/instructor-assignments#">Speaking 101</a>
              </p>
            </th>
            <td>
              <p className="b3">20</p>
            </td>
            <td>
              <p className="b3">3</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                {/* <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a>
                <a
                  className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                  title="Delete"
                  href="/instructor/instructor-assignments#"
                >
                  <i className="feather-trash-2 pl--0" />
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="h6 mb--5">Song Writing Techniques 101</span>
              <p className="b3">
                Course:{" "}
                <a href="/instructor/instructor-assignments#">Song Writing</a>
              </p>
            </th>
            <td>
              <p className="b3">60</p>
            </td>
            <td>
              <p className="b3">10</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                {/* <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a>
                <a
                  className="rbt-btn btn-xs bg-color-danger-opacity radius-round color-danger"
                  title="Delete"
                  href="/instructor/instructor-assignments#"
                >
                  <i className="feather-trash-2 pl--0" />
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <th>
              <span className="h6 mb--5">Arabic For Beginners</span>
              <p className="b3">
                Course:{" "}
                <a href="/instructor/instructor-assignments#">Arabic Writing</a>
              </p>
            </th>
            <td>
              <p className="b3">40</p>
            </td>
            <td>
              <p className="b3">15</p>
            </td>
            <td>
              <div className="rbt-button-group justify-content-end">
                {/* <a
                  className="rbt-btn btn-xs bg-primary-opacity radius-round"
                  title="Edit"
                  href="#"
                >
                  <i className="feather-edit pl--0" /> Edit
                </a> */}
              <a
                className="rbt-btn btn-xs bg-primary-opacity radius-round"
                title="Delete"
                href="/instructor/instructor-assignments#"
              >
                <i className="bi bi-eye pl--0" /> View
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
