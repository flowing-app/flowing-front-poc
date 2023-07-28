import React from "react"
import { useRete } from "rete-react-plugin"

import { createEditor } from "@/editor/editor"

import "./editor.css"

const Editor = () => {
  const [ref] = useRete(createEditor)

  return <div ref={ref} style={{ height: "100vh", width: "100vw" }} />
}

export default Editor
