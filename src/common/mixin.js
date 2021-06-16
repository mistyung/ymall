/* mixin使用方法 */
import { debounce } from "./utils";

export const itemListenerMixin = {
  mounted () {
    let newRefresh = debouce(this.$refs.scroll.refresh, 1000)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}