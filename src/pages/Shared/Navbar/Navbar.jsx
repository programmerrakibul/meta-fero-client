import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../components/Logo/Logo";
import MyContainer from "../MyContainer/MyContainer";
import MyButton from "../../../components/MyButton/MyButton";
import useAuthInfo from "../../../hooks/useAuthInfo";

const Navbar = () => {
  const { currentUser, logoutUser } = useAuthInfo();
  const navigate = useNavigate();
  const navTexts = ["services", "coverage", "about us"];
  const navLinks = navTexts.map((item) => (
    <li key={item.replaceAll(" ", "")}>
      <NavLink to={`/${item.replaceAll(" ", "-")}`} className="nav-links">
        {item}
      </NavLink>
    </li>
  ));

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <MyContainer className="bg-base-100 shadow-sm">
        <div className="navbar p-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navLinks}

                {currentUser && (
                  <>
                    <li>
                      <Link to="/send-parcel" className="nav-links">
                        Send Parcel
                      </Link>
                    </li>

                    <li>
                      <Link to="/be-a-rider" className="nav-links">
                        Be a Rider
                      </Link>
                    </li>

                    <li>
                      <Link to="/dashboard" className="nav-links">
                        Dashboard
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <Logo />
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base font-semibold">
              {navLinks}
              {currentUser && (
                <>
                  <li>
                    <Link to="/send-parcel" className="nav-links">
                      Send Parcel
                    </Link>
                  </li>

                  <li>
                    <Link to="/be-a-rider" className="nav-links">
                      Be a Rider
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard" className="nav-links">
                      Dashboard
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="navbar-end gap-2">
            {currentUser ? (
              <>
                <div
                  data-tip={currentUser.displayName}
                  className="avatar tooltip tooltip-left md:tooltip-bottom tooltip-secondary"
                >
                  <div className="ring-primary ring-offset-base-100 size-10 rounded-full ring-2 ring-offset-2 ">
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                    />
                  </div>
                </div>

                <MyButton onClick={handleLogout}>Logout</MyButton>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="btn btn-outline border-base-300"
                >
                  Sign In
                </button>

                <MyButton>Be a Rider</MyButton>
              </>
            )}
          </div>
        </div>
      </MyContainer>
    </nav>
  );
};

export default Navbar;
