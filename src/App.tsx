import { Clock } from "./Clock"
import { move_window, Position } from "tauri-plugin-positioner-api"

move_window(Position.BottomRight)

function App() {
  return (
    <Clock />
  )
}

export default App
