interface iBoundries {
  x: {
    max: null | number
    min: null | number
  }
  y: {
    max: null | number
    min: null | number
  }
}

interface iCorners {
  bottomLeft: iXY
  bottomRight: iXY
  topLeft: iXY
  topRight: iXY
}

interface iXY {
  x: number
  y: number
}

interface iZindexInfo {
    uid: string,
    zIndex: number
}

export type { iBoundries, iCorners, iXY, iZindexInfo }
