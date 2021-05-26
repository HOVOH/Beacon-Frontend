import { InputProps } from "./InputProps";
import { Controller } from "react-hook-form";
import { Checkbox as MuiCheckbox, FormControlLabel } from "@material-ui/core";
import React from "react";

export interface CheckboxProps extends InputProps{
  color?: "default" |"primary" |"secondary"
}

export function Checkbox(props: CheckboxProps){
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue??""}
      render={({ field }) => (
        <FormControlLabel
          control={
            <MuiCheckbox
              {...field}
              checked={field.value}
              color={props.color || "default"}
            />
          }
          label={props.label}
        />
      )}
  />
)
}
