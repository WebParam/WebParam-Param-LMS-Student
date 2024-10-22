import Link from "next/link";
import Image from "next/image";
import imageCover from "./404-error.png";

export default function ErrorPage() {
  return (
    <div className="rbt-error-area -11 rbt-section-gap">
      <div className="error-area">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-10">
              <Image src={imageCover} alt="Error" width={500} height={300} />
              <Link
                href="/"
                className="rbt-btn"
                style={{ backgroundColor: "#24345C", translate: "0px -65px" }}
              >
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
