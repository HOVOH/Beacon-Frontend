import React from 'react';
import { Controller } from "react-hook-form";
import {TextField as MuiTextField} from '@material-ui/core';
import { InputProps } from "./InputProps";
import { PropsWithClassName } from "../../utils/classBag";

export interface TextFieldsProps extends PropsWithClassName, InputProps{

}

export function TextField(props: TextFieldsProps){
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue??""}
      render={({ field }) => <MuiTextField {...field} label={props.label} variant={"outlined"} className={props.className} size={"small"}/>}
    />
  )
}
