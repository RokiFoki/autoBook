const minMaxBoundary = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value))
}

export default minMaxBoundary;