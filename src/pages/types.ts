interface Marker {
    isCircle: boolean 
}

interface Slot {
    position: number,
    assignment?: Marker,
}

interface Board {
    setup: Slot[]
    rowsColumns: number
}

