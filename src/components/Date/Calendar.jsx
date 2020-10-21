import "date-fns";
import React from "react";

import { KeyboardDatePicker } from "@material-ui/pickers";

export const Calendar = ({ date = new Date(), onChange, className, name }) => {
  const onDataChange = (myDate) => {
    const event = { target: { name, value: myDate } };
    console.log(event);
    onChange(event);
  };

  return (
    <KeyboardDatePicker
      className={className}
      margin="normal"
      openTo="year"
      id="date-picker-dialog"
      label="Date picker dialog"
      format="YYYY-DD-mm"
      value={date}
      views={["year", "month", "date"]}
      onChange={onDataChange}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
};
