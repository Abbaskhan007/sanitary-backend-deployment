import React, { useState, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function DateRange({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = ranges => {

    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <div className="flex justify-center mb-6">
      <DateRangePicker
        ranges={[selectionRange]}
        rangeColors={["#FD5B61"]}
        onChange={handleSelect}
      />
    </div>
  );
}
