<template>
  <span :class="['text-' + coloredDisplay.color, wrapClass]" class="cursor-pointer">
    {{coloredDisplay.display}}
    <selection-menu @item-selected="itemSelected" :without-methods="isLeft" />
  </span>
</template>

<script>
import SelectionMenu from './SelectionMenu'
export default {
  name: 'ColoredSelection',
  components: {
    SelectionMenu
  },
  props: {
    obj: Object,
    isLeft: Boolean,
    wrapClass: {
      type: String,
      default: 'q-pa-sm'
    }
  },
  computed: {
    coloredDisplay () {
      if (this.obj) {
        if (this.obj.type === 'object') {
          return this.$store.getters['env/getObjectDisplayName'](this.obj.uuid)
        } else if (this.obj.type === 'string') {
          return {
            display: this.obj.text,
            color: 'grey-10'
          }
        }
      }
      return {
        display: '请选择',
        color: 'red-10'
      }
    }
  },
  mounted () {

  },
  methods: {
    itemSelected (v) {
      this.$emit('selection-changed', v)
    }
  }
}
</script>
