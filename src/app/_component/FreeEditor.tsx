import React from "react"
import { Node } from "reactflow"

import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import { BlockData } from "@/lib/GuiEditor/type"
import { useEditorStore } from "@/store"

type FreeEditorProps = {
  node: Node<BlockData> | null
}

const FreeEditor = ({ node }: FreeEditorProps) => {
  const updateNodeData = useEditorStore((store) => store.updateNodeData)
  const data = node?.data
  if (data == null) {
    return null
  }

  const value = JSON.stringify(data.input.body, null, 2)

  return (
    <CodeEditor
      value={value}
      onChange={(value) => {
        try {
          const parsedInput = JSON.parse(value ?? "")
          updateNodeData(data.id, { input: { ...data.input, body: parsedInput } })
        } catch {}
      }}
      language="json"
      onMount={(_, monaco) => {
        // function createDependencyProposals(range: any) {
        //   return [
        //     {
        //       label: '"lodash"',
        //       kind: monaco.languages.CompletionItemKind.Function,
        //       documentation: "The Lodash library exported as Node.js modules.",
        //       insertText: '"lodash": "*"',
        //       range: range,
        //     },
        //     {
        //       label: '"express"',
        //       kind: monaco.languages.CompletionItemKind.Function,
        //       documentation: "Fast, unopinionated, minimalist web framework",
        //       insertText: '"express": "*"',
        //       range: range,
        //     },
        //     {
        //       label: '"mkdirp"',
        //       kind: monaco.languages.CompletionItemKind.Function,
        //       documentation: "Recursively mkdir, like <code>mkdir -p</code>",
        //       insertText: '"mkdirp": "*"',
        //       range: range,
        //     },
        //     {
        //       label: '"my-third-party-library"',
        //       kind: monaco.languages.CompletionItemKind.Function,
        //       documentation: "Describe your library here",
        //       insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
        //       insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        //       range: range,
        //     },
        //   ]
        // }
        // monaco.languages.registerCompletionItemProvider("json", {
        //   provideCompletionItems: function (model, position) {
        //     // find out if we are completing a property in the 'dependencies' object.
        //     var textUntilPosition = model.getValueInRange({
        //       startLineNumber: 1,
        //       startColumn: 1,
        //       endLineNumber: position.lineNumber,
        //       endColumn: position.column,
        //     })
        //     var match = textUntilPosition.match(
        //       /"dependencies"\s*:\s*\{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/,
        //     )
        //     if (!match) {
        //       return { suggestions: [] }
        //     }
        //     var word = model.getWordUntilPosition(position)
        //     var range = {
        //       startLineNumber: position.lineNumber,
        //       endLineNumber: position.lineNumber,
        //       startColumn: word.startColumn,
        //       endColumn: word.endColumn,
        //     }
        //     return {
        //       suggestions: createDependencyProposals(range),
        //     }
        //   },
        // })
      }}
    />
  )
}

export default FreeEditor
