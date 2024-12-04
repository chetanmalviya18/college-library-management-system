import { Typography } from "@mui/material";
import DashboardCards from "./DashboardCards";
import OverdueBooksTable from "./OverdueBooksTable";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Typography variant="h4">Dashboard</Typography>
        {/* <Select defaultValue="weekly" className="w-28">
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select> */}
      </div>

      {/* Dashboard Cards */}
      <DashboardCards />

      {/* Borrowers Chart
      <BorrowersChart /> */}

      {/* Overdue Books Table */}
      <OverdueBooksTable />
    </div>
  );
};

export default Dashboard;
