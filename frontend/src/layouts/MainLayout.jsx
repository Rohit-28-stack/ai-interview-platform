import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;