import React from "react"
import { load as loadYaml } from "js-yaml"
import { OpenAPIV3_1 } from "openapi-types"
import useSWR from "swr"

import { Editor } from "@/lib/GuiEditor"
import CodeEditor from "@/lib/CodeEditor/CodeEditor"
import CollapsablePanel from "@/lib/CollapsablePanel/CollapsablePanel"
import { SAMPLE_YAML } from "@/utils/sampleYaml"
import { retrieveBlockFromOpenApiSpec } from "@/utils/retrieveBlockFromOpenApiSpec"

import CodeEditorTab from "./CodeEditorTab"
import ScenarioEditor from "./ScenarioEditor"

const openApiSpec = loadYaml(SAMPLE_YAML) as OpenAPIV3_1.Document

const EditorPage = () => {
  const { data: blocks } = useSWR("parse-blocks", () => retrieveBlockFromOpenApiSpec(openApiSpec))

  return (
    <div className="w-screen h-screen">
      {blocks != null && <Editor blocks={blocks} />}
      <CollapsablePanel>
        {({ onOpenChange }) => (
          <CodeEditorTab
            onOpenChange={onOpenChange}
            scenario={<ScenarioEditor />}
            openApi={<CodeEditor value={SAMPLE_YAML} onChange={() => {}} language="yaml" />}
          />
        )}
      </CollapsablePanel>
    </div>
  )
}

export default EditorPage
