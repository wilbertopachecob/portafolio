import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'

/**
 * Mount a no-op component so a composable runs inside Vue's lifecycle hooks.
 * @template T
 * @param {(...args: unknown[]) => T} composable
 * @param {...unknown} args
 * @returns {{ result: T, wrapper: import('@vue/test-utils').VueWrapper }}
 */
export function withSetup(composable, ...args) {
  let result

  const Comp = defineComponent({
    setup() {
      result = composable(...args)
      return () => null
    },
  })

  const wrapper = mount(Comp)

  return { result, wrapper }
}
