type TformatDuration = (
  sec_num: number,
  option?: { noHour?: boolean; ceil?: boolean }
) => string

export const formatDuration: TformatDuration = (
  sec_num,
  option = { noHour: false, ceil: false }
) => {
  const { noHour, ceil } = option

  const hours = Math.floor(sec_num / 3600)
  const minutes = Math.floor((sec_num - (!noHour ? hours * 3600 : 0)) / 60)
  const seconds = sec_num - hours * 3600 - minutes * 60

  let result = []

  if (ceil) {
    const ceilSeconds = seconds > 30 ? 1 : 0

    hours > 0 && !noHour && result.push(`${hours}h`)
    minutes > 0 && result.push(`${minutes + ceilSeconds}m`)
  } else {
    hours > 0 && !noHour && result.push(`${hours}h`)
    minutes > 0 && result.push(`${minutes}m`)
    seconds > 0 && result.push(`${seconds}s`)
  }

  return result.join(" ")
}
