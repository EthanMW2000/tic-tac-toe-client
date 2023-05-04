export interface ISlot {
  id: number;
  player: Player;
  isPlayed: boolean;
  row: number;
  col: number;
  adjacency?: number[];
}

export interface IBoard {
  rowsColumns: number;
}

export enum Player {
  Circle,
  Cross,
}
