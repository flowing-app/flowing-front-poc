import { BaseSchemes } from "rete"
import { AreaPlugin } from "rete-area-plugin"

export const addCustomBackground = <S extends BaseSchemes, K>(area: AreaPlugin<S, K>) => {
  const background = document.createElement("div")

  background.classList.add("background")
  background.classList.add("fill-area")

  area.area.content.add(background)
}
