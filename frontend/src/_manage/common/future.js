export const YEARS = [...Array(100)]
  .map((year, idx) => new Date().getFullYear() + idx)

  export const years = ["Select Year", ...YEARS];