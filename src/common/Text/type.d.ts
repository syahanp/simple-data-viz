export type TextProps = {
  /**
   * Custom html tag used if needed
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'h6'

  /**
   * Additional className you want to add to the html tag
   */
  className?: TailwindCSS

  /**
   * Truncate the text based on parents width or max-width.
   * required explicitly parents width or max-width css property
   */
  truncate?: boolean

  /**
   * text role on visual hierachy.
   * primary: text-gray-700
   * secondary: text-gray-400
   */
  role?: 'primary' | 'secondary'

  /**
   * text color
   */
  color?: 'green' | 'blue'

  onClick?: () => void | Function
}
