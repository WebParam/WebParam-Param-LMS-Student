import Link from "next/link";

export default function ErrorPage() {
    return (
        <div className="rbt-error-area -11 rbt-section-gap" style={{backgroundImage:'linear-gradient(to bottom, rgba(255, 0, 0, 0), #9eafef)', height:'100vh', width:'100%'}}>
        <div className="error-area">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-10">
                <h1 className="title">404!</h1>
                <h3 className="sub-title">Page not found</h3>
                <p>The page you were looking for could not be found.</p>
                <Link className="rbt-btn icon-hover" href="/"  style={{backgroundImage:'linear-gradient( to bottom, rgba(255, 0, 0, 0), #9eafef'}}>
                  <span className="btn-text">Back To Home</span>
                  <span className="btn-icon">
                    <i className="feather-arrow-right" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}