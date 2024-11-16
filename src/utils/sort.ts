export const sorting = (a: any, b: any, sort: number, option?: string) => {
  let newA;
  let newB;

  if (option) {
    if (option === 'createdAt') {
      newA = new Date(a[option]).getTime();
      newB = new Date(b[option]).getTime();
    } else {
      newA = a[option];
      newB = b[option];
    }
  } else {
    newA = a;
    newB = b;
  }

  if (sort === 1) return newA - newB;
  else return newB - newA;
};
