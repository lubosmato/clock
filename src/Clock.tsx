import { FC, useCallback, useEffect, useState } from "react"
import { appWindow } from "@tauri-apps/api/window"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import "@fontsource/inter/600.css"

const Base = styled.div<{isAnimating: boolean}>`
  width: 100%;
  height: 100vh;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  opacity: 0.2;
  color: white;
  font-family: "Inter";
  text-shadow: black 0 0 3px;

  pointer-events: none;

  @keyframes attention {
    0% {
      text-shadow: black 0 0 3px;
    }
    25% {
      opacity: 1;
      text-shadow: black 0 0 3px, rgb(255, 255, 255) 0px 0px 1rem;
    }
    100% {
      text-shadow: black 0 0 3px;
    }
  }

  ${({isAnimating}) => isAnimating ? css`
    animation-name: attention;
    animation-duration: 1s;
  ` : null}
`

export const Clock: FC = () => {
  const [time, setTime] = useState("")
  const [isAnimating, setAnimating] = useState(false)

  const tick = useCallback(() => {
    const now = new Date()
    setTime(`${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`)

    if (now.getSeconds() === 0) setAnimating(true)

    appWindow.setTitle(time)    
  }, [])

  useEffect(() => {
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return <Base isAnimating={isAnimating} onAnimationEnd={() => setAnimating(false)}>{time}</Base>
}
