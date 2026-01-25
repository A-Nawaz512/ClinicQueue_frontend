import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaExclamationTriangle,
  FaRedoAlt,
  FaDoorOpen,
  FaClock,
  FaCheckCircle,
  FaUserPlus
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-64 h-full bg-black text-white flex flex-col overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:top-0 md:left-0 md:h-screen md:sticky md:flex-shrink-0
        `}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 md:hidden">
          <span className="text-xl font-bold text-blue-100">Clinic Admin</span>
          <button onClick={() => setIsOpen(false)} className="text-white text-2xl">
            ×
          </button>
        </div>

        {/* Desktop logo */}
        <div className="hidden md:block px-6 py-5 text-2xl text-blue-100 font-bold border-b border-white/10">
          Clinic Admin
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-6 space-y-6 text-sm overflow-y-auto pb-safe">
          <Section title="Main">
            <NavItem
              to="/dashboard"
              label="Dashboard"
              icon={<FaUsers />}
              onClick={() => setIsOpen(false)}
            />
          </Section>

          <Section title="Patient Flow">
            <NavItem
              to="/"
              label="Check-In"
              icon={<FaUserPlus className="text-green-400" />}
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/patients/waiting"
              label="Waiting"
              icon={<FaClock />}
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/patients/in-room"
              label="In Room"
              icon={<FaDoorOpen />}
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/patients/completed"
              label="Completed"
              icon={<FaCheckCircle />}
              onClick={() => setIsOpen(false)}
            />
          </Section>

          <Section title="Special">
            <NavItem
              to="/patients/urgent"
              label="Urgent"
              icon={<FaExclamationTriangle className="text-red-500" />}
              onClick={() => setIsOpen(false)}
            />
            <NavItem
              to="/patients/follow-up"
              label="Follow Up"
              icon={<FaRedoAlt className="text-yellow-400" />}
              onClick={() => setIsOpen(false)}
            />
          </Section>
        </nav>
      </aside>
    </>
  );
};

const Section = ({ title, children }) => (
  <div className="space-y-2">
    <p className="px-4 text-xs uppercase tracking-wider text-white/50 font-semibold">{title}</p>
    <div className="space-y-1">{children}</div>
  </div>
);

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-200
       ${isActive ? "bg-blue-600 text-white font-medium" : "text-white/80 hover:bg-white/10 hover:text-white"}`
    }
  >
    <span className="text-base">{icon}</span>
    <span className="flex-1">{label}</span>
  </NavLink>
);

export default Sidebar;
