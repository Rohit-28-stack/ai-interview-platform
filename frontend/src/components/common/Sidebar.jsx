import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Question Bank",
      path: "/questions",
    },
    {
      name: "Start Interview",
      path: "/interview/start",
    },
    {
      name: "Submissions",
      path: "/submissions",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-800 border-r border-slate-700">
      <div className="p-6">
        <h2 className="text-xl font-bold text-cyan-400">
          Navigation
        </h2>
      </div>

      <nav className="flex flex-col gap-2 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;