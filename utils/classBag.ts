export const classBag = (...classes: (string|undefined|null)[]) => {
  return classes.filter(clazz => !!clazz).join(" ");
}

export interface PropsWithClassName{
  className?: string,
  style?: any
}
