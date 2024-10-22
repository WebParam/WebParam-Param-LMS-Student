import Link from "next/link";
import Image from "next/image";
import UserData from "@/data/user/user.json";
import Cookies from "universal-cookie";

const UserStudent = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const handleLinkClick = (link: string) => {
    window.location.href = link;

    closeDropdown();
  };

  const cookies = new Cookies();

  const user = cookies.get("username");

  console.log("user in nav",user);

  return (
    <div className="rbt-user-menu-list-wrapper">
      {UserData &&
        UserData.user.map((person, index) => (
          <div className="inner" key={index}>
            <div className="rbt-admin-profile">
              <div className="admin-thumbnail">
                <Image
                  src={person.img}
                  width={43}
                  height={43}
                  alt="User Images"
                />
              </div>
              <div className="admin-info">
                <span className="name">{user??person.name}</span>
                <Link
                  className="rbt-btn-link color-primary"
                  href="/student/student-profile"
                  onClick={() => handleLinkClick("/student/student-profile")}
                >
                  View Profile
                </Link>
              </div>
            </div>
            <ul className="user-list-wrapper">
              {person.userList.map((list, innerIndex) => (
                <li key={innerIndex}>
                  <Link
                    href={list.link}
                    onClick={() => handleLinkClick(list.link)}
                  >
                    <i className={list.icon}></i>
                    <span>{list.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {/* <ul className="user-list-wrapper">
              <li>
                <Link href="#" onClick={() => handleLinkClick("#")}>
                  <i className="feather-book-open"></i>
                  <span>Getting Started</span>
                </Link>
              </li>
            </ul> */}
            <hr className="mt--10 mb--10" />
            <ul className="user-list-wrapper">
              <li>
                <Link href="/" onClick={() => handleLinkClick("/")}>
                  <i className="feather-log-out"></i>
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default UserStudent;
