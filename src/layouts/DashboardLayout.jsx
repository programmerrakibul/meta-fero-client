import { Outlet, useNavigate } from "react-router";
import Logo from "../components/Logo/Logo";
import MyContainer from "../pages/Shared/MyContainer/MyContainer";
import { TbAlignBoxBottomLeft, TbTruckDelivery } from "react-icons/tb";
import { FaHistory } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { ImUsers } from "react-icons/im";

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <MyContainer>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Navbar */}
            <nav className="navbar w-full bg-base-300">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <div className="px-4">
                <Logo />
              </div>
            </nav>
            {/* Page content here */}
            <main className="p-4">
              <Outlet />
            </main>
          </div>

          <div className="drawer-side is-drawer-close:overflow-visible">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
              {/* Sidebar content here */}
              <ul className="menu w-full grow">
                {/* List item */}
                <li>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Dashboard"
                  >
                    <TbAlignBoxBottomLeft />
                    <span className="is-drawer-close:hidden">Dashboard</span>
                  </button>
                </li>

                {/* List item */}
                <li>
                  <button
                    onClick={() => navigate("/dashboard/manage-users")}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                  >
                    <ImUsers />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </button>
                </li>

                {/* List item */}
                <li>
                  <button
                    onClick={() => navigate("/dashboard/my-parcels")}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Parcels"
                  >
                    <TbTruckDelivery />
                    <span className="is-drawer-close:hidden">My Parcels</span>
                  </button>
                </li>

                {/* List item */}
                <li>
                  <button
                    onClick={() => navigate("/dashboard/payment-history")}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                  >
                    <FaHistory />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </button>
                </li>

                {/* List item */}
                <li>
                  <button
                    onClick={() => navigate("/dashboard/applied-riders")}
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Applied RIders"
                  >
                    <FaMotorcycle />
                    <span className="is-drawer-close:hidden">
                      Applied RIders
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MyContainer>
    </>
  );
};

export default DashboardLayout;
