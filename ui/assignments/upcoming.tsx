export default function UpcomingAssignment() {
  return (
    <table className="rbt-table table table-borderless" style={{minWidth:'10px'}}>
      <thead>
        <tr>
          <th>Assignment Name</th>
          <th>Open Date</th>
          <th>Due Date</th>
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
              Course:{" "}
              <a href="/instructor/instructor-assignments#">Fundamentals 101</a>
            </p>
          </th>
          <td>
            <p className="b3">2024-01-01</p>
          </td>
          <td>
            <p className="b3">2024-01-01</p>
          </td>
          <td>
            <div className="rbt-button-group justify-content-end">
              <a
                className="rbt-btn btn-xs bg-color-primary-opacity radius-round color-primary"
                title="Delete"
                href="/instructor/instructor-assignments#"
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <i className="bi bi-download pl--0" /> Dowload
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
