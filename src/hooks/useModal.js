import { useState } from "react";

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return [open, handleOpen];
};
