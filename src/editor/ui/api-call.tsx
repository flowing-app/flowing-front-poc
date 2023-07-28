import { ClassicScheme, Presets, RenderEmit } from "rete-react-plugin"

const { RefSocket, RefControl } = Presets.classic

type NodeExtraData = { width?: number; height?: number }

type Props<S extends ClassicScheme> = {
  data: S["Node"] & NodeExtraData
  styles?: () => any
  emit: RenderEmit<S>
}

const ApiCallNodeComponent = <Scheme extends ClassicScheme>({ data, emit }: Props<Scheme>) => {
  const selected = data.selected ?? false
  const { width, height } = data
  const inputs = Object.entries(data.inputs)
  const outputs = Object.entries(data.outputs)

  return (
    <section
      style={{ width, height }}
      data-selected={selected}
      className="bg-[#333333] data-selected:ring ring-sky-500 text-white border-2 border-stone-600 rounded-lg overflow-hidden"
    >
      <h2 className="px-3 py-2 leading-none text-sm bg-stone-600">Send Request</h2>
      <div className="p-3 flex">
        <div className="w-full flex flex-col items-start gap-y-4 flex-1">
          {inputs.map(
            ([key, input]) =>
              input && (
                <div className="flex items-center gap-x-2" key={key}>
                  <div className="absolute -translate-x-[calc(100%+5px)]">
                    <RefSocket
                      name="input-socket"
                      side="input"
                      emit={emit}
                      socketKey={key}
                      nodeId={data.id}
                      payload={input.socket}
                    />
                  </div>
                  <div className="text-sm">{input?.label}</div>
                </div>
              ),
          )}
        </div>
        <div className="w-full flex flex-col items-end gap-y-4 flex-1">
          {outputs.map(
            ([key, output]) =>
              output && (
                <div className="flex items-center gap-x-2" key={key}>
                  <div className="text-sm">{output?.label}</div>
                  <div className="absolute left-[calc(100%-8px)]">
                    <RefSocket
                      name="output-socket"
                      side="output"
                      emit={emit}
                      socketKey={key}
                      nodeId={data.id}
                      payload={output.socket}
                    />
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </section>
    // <NodeStyles selected={selected} width={width} height={height}>
    //   <HandleArea>
    //     <Handle type="dashed">...</Handle>
    //   </HandleArea>
    //   <Drag.NoDrag>
    //     <ChatLayout>
    //       <MessagesLayout
    //         ref={messagesLayout}
    //         onWheel={(e) => {
    //           if (!messagesLayout.current) return

    //           const el = messagesLayout.current

    //           if (e.deltaY > 0 && el.scrollTop + el.clientHeight + 1 < el.scrollHeight) {
    //             e.stopPropagation()
    //           } else if (e.deltaY < 0 && el.scrollTop > 0) {
    //             e.stopPropagation()
    //           }
    //         }}
    //       >
    //         <List
    //           itemLayout="horizontal"
    //           dataSource={props.data.messages}
    //           renderItem={(item) => <Message {...item} />}
    //         />
    //       </MessagesLayout>
    //       <TextBox>
    //         <Input
    //           size="large"
    //           value={text}
    //           style={{ fontSize: "1.5em", height: "2em" }}
    //           onInput={(e) => setText((e.target as HTMLInputElement).value)}
    //           placeholder="Your message..."
    //         />
    //         <Button
    //           onClick={() => {
    //             props.data.userSend(text)
    //             setText("")
    //           }}
    //           size="large"
    //           style={{ fontSize: "1.5em", height: "2em" }}
    //           type="primary"
    //         >
    //           Send
    //         </Button>
    //       </TextBox>
    //     </ChatLayout>
    //   </Drag.NoDrag>
    //   <HandleArea>
    //     <Handle type="dashed">...</Handle>
    //   </HandleArea>
    // </NodeStyles>
  )
}

export default ApiCallNodeComponent
