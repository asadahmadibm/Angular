export interface industryModel {
  IndustryID: number,
  IndustryName : string,
  Month:string,
  Year:string,
  // Group:string,
  GroupNew:string[],
  BeginDate:string
}

export interface User {
  name:string
}

export interface Fruit {
  name: string;
  selected: boolean;
}
