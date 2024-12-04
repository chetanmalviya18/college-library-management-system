import { BiBook, BiBookOpen } from "react-icons/bi";
import { BsBookshelf } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import useDashboardCards from "../hooks/useDashboardCards";

const DashboardCards = () => {
  const { booksInfo, borrowInfo, unReturnedBooksInfo } = useDashboardCards();

  const cards = [
    {
      title: "Total Books",
      count: booksInfo.totalBooks,
      icon: <BsBookshelf />,
      color: "bg-yellow-500",
    },
    {
      title: "Borrowed",
      count: unReturnedBooksInfo.totalUnReturnedBooks,
      icon: <BiBook />,
      color: "bg-orange-500",
    },
    {
      title: "Overdue",
      count: borrowInfo.totalOverdueBooks,
      icon: <CiWarning />,
      color: "bg-red-500",
    },
    {
      title: "Books Left",
      count: booksInfo.totalBooks - unReturnedBooksInfo.totalUnReturnedBooks,
      icon: <BiBookOpen />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
      {cards.map((c, i) => (
        <div key={i} className={`p-4 rounded-lg text-white ${c.color}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{c.count}</h2>
              <p>{c.title}</p>
              <div>{c.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
