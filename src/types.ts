export interface ISlot {
  id: number;
  player?: Player;
  isPlayed: boolean;
  row: number;
  col: number;
  adjacency?: number[];
}

export interface IBoard {
  rowsColumns: number;
  movesMade: number
  setMovesMade(data: number): void 
}

export enum Player {
  Circle,
  Cross,
}

export interface IVisited {
  [key: number]: boolean;
}
