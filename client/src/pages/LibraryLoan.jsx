import { useState } from "react";
import Sidebar from "../components/Sidebar"; // Sidebar component
import {
  Button,
  IconButton,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckInForm from "../components/CheckInForm";
import CheckOutForm from "../components/CheckOutForm";
import { BiSearch } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";

const LibraryLoan = () => {
  const [view, setView] = useState("checkout"); // Tracks the current form view
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmCheckoutOpen, setConfirmCheckoutOpen] = useState(false); // State for confirmation dialog

  const handleViewChange = (newView) => {
    // if (newView === "checkout") {
    //   // Open confirmation dialog for checkout
    //   setConfirmCheckoutOpen(true);
    // } else {
    setView(newView);
    // }
  };

  // const handleConfirmCheckout = () => {
  //   setView("checkout");
  //   setConfirmCheckoutOpen(false); // Close dialog after confirmation
  // };

  // const handleCancelCheckout = () => {
  //   setConfirmCheckoutOpen(false);
  // };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-6 bg-gray-100 flex flex-col space-y-6">
        {/* Page Header */}
        <Typography variant="h4" className="font-semibold">
          Library Loan
        </Typography>

        {/* Search Bar */}
        {/* <Box className="flex items-center bg-white p-3 shadow rounded-lg">
          <IconButton>
            <BiSearch />
          </IconButton>
          <TextField
            placeholder="Search by Book Title or Email"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              style: { backgroundColor: "#f4f4f4", borderRadius: "5px" },
            }}
          />
          <IconButton>
            <MdFilterList />
          </IconButton>
        </Box> */}

        {/* Action Buttons */}
        <Box className="flex space-x-3">
          <Button
            variant={view === "checkout" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleViewChange("checkout")}
          >
            Check-Out
          </Button>
          <Button
            variant={view === "checkin" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => handleViewChange("checkin")}
          >
            Check-In
          </Button>
          <Button
            variant={view === "renew" ? "contained" : "outlined"}
            color="inherit"
            onClick={() => handleViewChange("renew")}
          >
            Renew
          </Button>
        </Box>

        {/* Form Display Section */}
        <Box className="flex-grow bg-white p-6 shadow-lg rounded-lg overflow-y-auto">
          {view === "checkout" && <CheckOutForm />}
          {view === "checkin" && <CheckInForm />}
          {view === "renew" && (
            <Typography variant="body1" className="text-gray-600">
              Renew functionality coming soon!
            </Typography>
          )}
        </Box>

        {/* Confirmation Dialog for Checkout */}
        {/* <Dialog
          open={confirmCheckoutOpen}
          onClose={handleCancelCheckout}
          aria-labelledby="confirm-checkout-title"
          aria-describedby="confirm-checkout-description"
        >
          <DialogTitle id="confirm-checkout-title">
            Confirm Checkout
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-checkout-description">
              Are you sure you want to proceed with the checkout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelCheckout} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmCheckout} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </div>
  );
};

export default LibraryLoan;
