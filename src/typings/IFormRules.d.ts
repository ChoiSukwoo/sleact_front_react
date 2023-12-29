type IFormRules<T> = {
  [P in keyof T]?: RegisterOptions;
};
