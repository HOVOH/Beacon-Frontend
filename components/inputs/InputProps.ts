import { Control } from "react-hook-form";

export interface InputProps {
  name: string,
  defaultValue?: string,
  control: Control<any>,
  label?: string,
}
