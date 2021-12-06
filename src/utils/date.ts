import { format } from "date-fns"

export type Tdate = Date | number | string
export type TformatString = string

// Default option being passed to date-fns
const defaultFnsOptions = {}

/**
 * @param {Date|number} date The original time, can be Date object or unix timestamp in ms
 * @param {string} formatString String contains format recognizable by date-fns
 * @param {Object=} options date-fns option
 * @return {string} Formatted date string
 * @see https://date-fns.org/v2.14.0/docs/format
 *
 */
export const formatDate = (date: Tdate, formatString: string, options?: {}) => {
  return format(new Date(date), formatString, {
    ...defaultFnsOptions,
    ...options,
  })
}
