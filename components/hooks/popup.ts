import { useState } from "react";

export function popup(initialState = false): [boolean, () => void, () => void]{
  const [isOpen, setOpen] = useState(initialState);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  return [isOpen, open, close]
}
