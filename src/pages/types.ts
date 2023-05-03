export interface ISlot {
    row: number,
    col: number
    assignment?: Player,
}

export interface IBoard {
    rowsColumns: number
}

export enum Player {
    Circle,
    Cross
}