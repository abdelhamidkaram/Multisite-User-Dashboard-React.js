import { Children } from 'react'

/**
 * A note box component. It is a box with a type and children.
 * The box will be colored depending on the type:
 * - success: green
 * - error: red
 * - info: blue
 * @param {String} type - The type of the note box. Defaults to "info"
 * @param {React.ReactNode} children - The children of the note box
 * @returns {React.ReactElement} A note box component
 */
const NoteBox = ({children , type='info'}) => {
  return (
    <div className={`flex flex-col gap-3 mb-8 p-3 shadow-sm ${type == "success" ? "shadow-green-500 border-green-500" : type == "error" ? "shadow-red-500 border-red-500" : "shadow-blue-light border-blue-light "}    border rounded-md`}>
          {Children.map(children , (child) => child)}
    </div>
  )
}

export default NoteBox
