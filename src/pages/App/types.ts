export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export enum Action {
  FETCH_ALL,
  FETCH_BY_ID,
}
