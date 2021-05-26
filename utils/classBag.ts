export const classBag = (...classes: string[]) => {
  return classes.filter(clazz => !!clazz).join(" ");
}

export interface PropsWithClassName{
  className?: string,
}
