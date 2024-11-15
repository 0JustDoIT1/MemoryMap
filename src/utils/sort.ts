export const sorting = (a: any, b: any, sort: string) => {
  if (sort === 'createdAt') {
    const aDate = new Date(a[sort]) as Date;
    const bDate = new Date(b[sort]) as Date;

    return bDate.getTime() - aDate.getTime();
  }
  if (a[sort] > b[sort]) return -1;
  else return 1;
};
