import { format } from "date-fns";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import isYesterday from "date-fns/isYesterday";

const RenderDate = ({ updatedAt }) => {
  if (!updatedAt) {
    return <span className="text-gray-500">No date provided</span>;
  }
  const date = new Date(updatedAt);
  if (isNaN(date.getTime())) {
    return <span className="text-gray-500">Invalid date</span>;
  }

  if (isToday(date)) {
    return <span>Today</span>;
  } else if (isYesterday(date)) {
    return <span className="text-red-500">Yesterday</span>;
  } else if (isTomorrow(date)) {
    return <span className="text-blue-500">Tomorrow</span>;
  } else {
    return (
      <span className={date < new Date() ? "text-gray-500" : "text-purple-500"}>
        {format(date, "EEEE")}
      </span>
    );
  }
};

export default RenderDate;
