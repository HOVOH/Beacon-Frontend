import React, { ReactNode } from "react";

export interface IfProps<T> extends React.PropsWithChildren<{}> {
  isTruthy: T|null|undefined,
  wrapWith?: (children: ReactNode, value:T) => ReactNode
}

export function If<T>(props: IfProps<T>){

  const { isTruthy, wrapWith: wrap, children } = props;

  if (isTruthy && wrap){
    return (<>{wrap(children, isTruthy)}</>)
  } else if (isTruthy){
    return (<>{ children }</>)
  }
  return null;
}
