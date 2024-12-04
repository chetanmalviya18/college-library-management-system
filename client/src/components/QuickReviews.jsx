import { Button } from "@mui/material";

const QuickReviews = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quick reviews</h2>
      <div className="flex items-center mb-4">
        {/* <img src="/clg logo.jpeg" alt="logo" /> */}
        <p className="ml-4">ZOUAK Omar</p>
      </div>
      <div className="mb-4">
        <Button variant="outlined">Send an email</Button>
        <Button variant="outlined">Call Farouk</Button>
      </div>
      <div className="mt-8">
        <h2 className="font-bold mb-4">Borrowed books</h2>
        <BorrowedBook />
        <BorrowedBook />
      </div>
    </div>
  );
};

const BorrowedBook = () => (
  <div className="flex items-center mb-4">
    {/* <img src="/clg logo.jpeg" alt="logo" /> */}
    <div>
      <p className="font-bold">Seven Brief Lessons on Physics</p>
      <p className="text-sm text-gray-500">Carlo Rovelli</p>
      <p className="text-sm text-red-500">2 days overdue</p>
    </div>
  </div>
);

export default QuickReviews;
