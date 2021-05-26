import MaterialCard, {CardProps as MaterialCardProps} from '@material-ui/core/Card';
import React from "react";

export function Card(props: MaterialCardProps) {
  return <MaterialCard {...props}/>;
}
