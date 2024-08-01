import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Nav() {
    const cookies = new Cookies();
    const router = useRouter();

    const user = cookies.get("loggedInUser");
    const name = cookies.get("username");
    const profilePic = cookies.get("profilePic");

    console.log("user:::::  ", user);

    function handleLogOut() {
        cookies.remove("loggedInUser");
         cookies.remove("username");
         cookies.remove("userEmail")
         cookies.remove("resetEmail")
         router.push('/login')
      }


    return (
        <AnimatePresence>
            <motion.div
            initial={{ opacity: 0, x:100, scale: 0.8 }}
            animate={{ opacity: 1, x:0,scale: 1 }}
            exit={{ opacity: 0,x:100, scale: 0.8 }}
            transition={{ duration: 1 }}
            className="rbt-user-menu-list-wrapper nav-summary p-3">
            <div className="inner">
                <div className="rbt-admin-profile">
                <div className="admin-thumbnail">
                    <Image
                    alt="User Images"
                    loading="lazy"
                    width={43}
                    height={43}
                    decoding="async"
                    data-nimg={1}
                    style={{ color: "transparent" }}
                    src={`${profilePic}`||`https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg`}
                    />
                </div>
                <div className="admin-info">
                    <span className="name" style={{fontSize:'12px',marginBottom:'0'}}>{name??user?.data?.email}</span>
                    <Link
                    className="rbt-btn-link color-primary"
                    href="/student/student-profile"
                    >
                    View Profile
                    </Link>
                </div>
                </div>
                <ul className="user-list-wrapper">
                <li>
                    <Link href="/student/dashboard">
                    <i className="feather-home" />
                    <span>My Dashboard</span>
                    </Link>
                </li>
{/*                 
                <li>
                    <a href="/#">
                    <i className="feather-bookmark" />
                    <span>Bookmark</span>
                    </a>
                </li> */}
                <li>
                    <Link href="/student/enrolled-courses">
                    <i className="feather-shopping-bag" />
                    <span>Enrolled Courses</span>
                    </Link>
                </li>
                <li>
                    <Link
                      href={'/student/notifications'}
                    //   className={`${path === '/student/notifications' ? "active" : ""}`}
                    >
                      <i className='feather-volume-2' />
                      <span>Notifications</span>
                    </Link>
                  </li>
                
                {/* <li>
                    <a href="/instructor/instructor-wishlist">
                    <i className="feather-heart" />
                    <span>Wishlist</span>
                    </a>
                </li> */}
                
                {/* <li>
                    <a href="/instructor/instructor-reviews">
                    <i className="feather-star" />
                    <span>Reviews</span>
                    </a>
                </li> */}
                
                {/* <li>
                    <a href="/instructor/instructor-my-quiz-attempts">
                    <i className="feather-list" />
                    <span>My Quiz Attempts</span>
                    </a>
                </li> */}
                
                {/* <li>
                    <a href="/instructor/instructor-order-history">
                    <i className="feather-clock" />
                    <span>Order History</span>
                    </a>
                </li> */}
                
                {/* <li>
                    <a href="/instructor/instructor-quiz-attempts">
                    <i className="feather-message-square" />
                    <span>Question &amp; Answer</span>
                    </a>
                </li>
                </ul>
                <hr className="mt--10 mb--10" />
                <ul className="user-list-wrapper">
                <li>
                    <a href="/#">
                    <i className="feather-book-open" />
                    <span>Getting Started</span>
                    </a>
                </li>
                </ul>
                <hr className="mt--10 mb--10" />
                <ul className="user-list-wrapper">
                <li>
                    <a href="/instructor/instructor-settings">
                    <i className="feather-settings" />
                    <span>Settings</span>
                    </a>
                </li> */}
                
                <li >
                    <a onClick={handleLogOut}
                    style={{cursor:'pointer'}}>
                    <i className="feather-log-out" />
                    <span>Logout</span>
                    </a>
                </li>
                </ul>
            </div>
            </motion.div>
        </AnimatePresence>

    )
}