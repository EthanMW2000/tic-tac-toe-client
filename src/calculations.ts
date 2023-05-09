import { ISlot, Player, IVisited } from "./types";

export async function findAdjacency(
  row: number,
  col: number,
  rowsColumns: number
): Promise<number[]> {
  let adjacencyArr: number[] = [];
  // find adjacency for slot in top row
  switch (row) {
    case 0:
      // find adjacency for slot in top row left col
      if (col == 0) {
        adjacencyArr.push(
          col + 1,
          (row + 1) * rowsColumns,
          col + 1 + (row + 1) * rowsColumns
        );
        //find adjacency for slot in top row right col
      } else if (col == rowsColumns - 1) {
        adjacencyArr.push(
          col - 1,
          col - 1 + (row + 1) * rowsColumns,
          col + (row + 1) * rowsColumns
        );
      } else {
        adjacencyArr.push(
          col - 1,
          col + 1,
          col - 1 + (row + 1) * rowsColumns,
          col + (row + 1) * rowsColumns,
          col + 1 + (row + 1) * rowsColumns
        );
      }
      break;
    //find adjacenecy for slot in bottom row
    case rowsColumns - 1:
      if (col == 0) {
        adjacencyArr.push(
          (row - 1) * rowsColumns,
          col + 1 + (row - 1) * rowsColumns,
          col + 1 + row * rowsColumns
        );
      } else if (col == rowsColumns - 1) {
        adjacencyArr.push(
          (row - 1) * rowsColumns,
          col - 1 + (row - 1) * rowsColumns,
          col + (row - 1) * rowsColumns,
          col - 1 + row * rowsColumns
        );
      } else {
        adjacencyArr.push(
          col - 1 + (row - 1) * rowsColumns,
          col + 1 + (row - 1) * rowsColumns,
          col - 1 + row * rowsColumns,
          col + row * rowsColumns,
          col + 1 + row * rowsColumns
        );
      }
      break;
    default:
      if (col == 0) {
        adjacencyArr.push(
          col + (row - 1) * rowsColumns,
          col + 1 + (row - 1) * rowsColumns,
          col + 1 + row * rowsColumns,
          col + (row + 1) * rowsColumns,
          col + 1 + (row + 1) * rowsColumns
        );
      } else if (col == rowsColumns - 1) {
        adjacencyArr.push(
          col - 1 + (row - 1) * rowsColumns,
          col + (row - 1) * rowsColumns,
          col - 1 + row * rowsColumns,
          col - 1 + (row + 1) * rowsColumns,
          col + (row + 1) * rowsColumns
        );
      } else {
        adjacencyArr.push(
          col - 1 + (row - 1) * rowsColumns,
          col + (row - 1) * rowsColumns,
          col + 1 + (row - 1) * rowsColumns,
          col - 1 + row * rowsColumns,
          col + 1 + row * rowsColumns,
          col - 1 + (row + 1) * rowsColumns,
          col + (row + 1) * rowsColumns,
          col + 1 + (row + 1) * rowsColumns
        );
      }
  }

  return adjacencyArr;
}

export async function checkWin(
  slots: ISlot[],
  spotsNeeded: number
): Promise<Player | undefined> {
  let winner: Player | undefined = undefined
  for (let i = 0; i < slots.length; i++) {
    const rowSlots: ISlot[] = [];
    const colSlots: ISlot[] = [];
    const forwardSlots: ISlot[] = [];
    const backSlots: ISlot[] = [];
    const visited: IVisited = {};

    const start = slots[i]
    if (start == undefined) continue;
    for (let i = 0; i < start.id; i++) {
      visited[i] = true;
    }

    backSlots.push(start);
    forwardSlots.push(start);

    slots.forEach((slot) => {
      if (slot.col == start.col) {
        colSlots.push(slot);
      }
      if (slot.row == start.row) {
        rowSlots.push(slot);
      }
      for (let i = 1; i < spotsNeeded; i++) {
        if (
          (start.row - i == slot.row && start.col - i == slot.col) ||
          (start.row + i == slot.row && start.col + i == slot.col)
        ) {
          backSlots.push(slot);
        } else if (
          (start.row + i == slot.row && start.col - i == slot.col) ||
          (start.row - i == slot.row && start.col + i == slot.col)
        ) {
          forwardSlots.push(slot);
        }
      }
    });

    const checkRow = await checkLine(rowSlots, spotsNeeded, visited);
    if (checkRow != undefined) {
      winner = checkRow
      break
    }
    const checkCol = await checkLine(colSlots, spotsNeeded, visited);
    if (checkCol != undefined) {
      winner = checkCol;
      break;
    }
    const checkForward = await checkLine(forwardSlots, spotsNeeded, visited);
    if (checkForward != undefined) {
      winner = checkForward;
      break;
    }
    const checkBack = await checkLine(backSlots, spotsNeeded, visited);
    if (checkBack != undefined) {
      winner = checkBack
      break
    }
  }
  return winner
}

async function checkLine(
  slots: ISlot[],
  spotsNeeded: number,
  visited: IVisited
): Promise<Player | undefined> {
  if (slots.length < spotsNeeded) return undefined;
  if (slots.find((slot) => visited[slot.id] || slot.player == undefined))
    return undefined;
  let circleCount = 0;
  let crossCount = 0;
  slots.forEach((slot) => {
    if (slot.player == Player.Circle) circleCount++;
    else crossCount++;
  });
  if (circleCount == spotsNeeded) return Player.Circle;
  else if (crossCount == spotsNeeded) return Player.Cross;
  else return undefined;
}
