export const formatNumber = (num: string | number) => {
  try {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  } catch {
    return num
  }
}
