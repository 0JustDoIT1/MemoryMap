export const sorting = (a: any, b: any, option: string, sort: number) => {
  let newA;
  let newB;

  if (option === 'createdAt') {
    newA = new Date(a[option]).getTime();
    newB = new Date(b[option]).getTime();
  } else {
    newA = a[option];
    newB = b[option];
  }

  if (sort === 1) return newA - newB;
  else return newB - newA;
};
