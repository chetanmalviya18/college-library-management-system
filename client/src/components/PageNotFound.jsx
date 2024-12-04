import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Redirects to the home page (adjust the path as needed)
  };

  return (
    <Box
      className="flex items-center justify-center h-screen bg-gray-50"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      padding={4}
    >
      <Typography variant="h1" className="text-red-500 mb-4">
        404
      </Typography>
      <Typography variant="h5" className="mb-6">
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        className="relative top-8"
        variant="contained"
        color="primary"
        onClick={handleGoBack}
      >
        Go Back to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
