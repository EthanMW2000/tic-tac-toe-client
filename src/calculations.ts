export function findAdjacency(
  row: number,
  col: number,
  rowsColumns: number
): number[] {
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
