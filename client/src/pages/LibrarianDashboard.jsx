import Dashboard from "../components/Dashboard";

import Sidebar from "../components/Sidebar";

const LibrarianDashboard = () => {
  return (
    <div className="flex h-screen">
      {/*Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-4 lg:p-8 bg-gray-50">
        <Dashboard />
      </div>
    </div>
  );
};

export default LibrarianDashboard;
