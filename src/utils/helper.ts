export const createNameAlias = (name: string) => {
  return name.toLowerCase().replace(/ /g, '_');
};