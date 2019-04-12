<template>
  <div class="wrapper row">
    <div v-if="type != 'unknow'" class="change-type cursor-pointer">
      <q-icon name="gamepad" color="accent" class="fix-top">
        <q-tooltip>
          选择其他
        </q-tooltip>
      </q-icon>
      <selection-menu :value-type="needValueType" can-input  @item-selected="itemSelected"/>
    </div>
    <div v-if="type == 'unknow'" class="text-accent cursor-pointer fix-padding-top">
      请选择
      <selection-menu :value-type="needValueType" can-input @item-selected="itemSelected"/>
    </div>
    <editable-string-text v-if="type === 'string'" :string-typed="judge.right" />
    <div v-if="type == 'object'" class="cursor-pointer fix-padding-top">
      <span v-if="judge.right.uuid" :class="['text-' + getObjectColoredDisplay(judge.right.uuid).color, wrapClass]" >
        {{getObjectColoredDisplay(judge.right.uuid).display}}
      </span>
      <span v-if="!judge.right.uuid" >
        请选择
      </span>
      <selection-menu :value-type="needValueType" can-input @item-selected="itemSelected"/>
    </div>
  </div>
</template>
<script>
import EditableStringText from './EditableStringText'
import SelectionMenu from './SelectionMenu'

export default {
  name: 'JudgeRightSelectionWrap',
  components: {
    SelectionMenu,
    EditableStringText
  },
  props: {
    judge: Object
  },
  computed: {
    needValueType: {
      get () {
        return this.$store.getters['env/findObject'](this.judge.left.uuid).valueType
      }
    },
    type: {
      get () {
        return this.judge.right.type
      }
    }
  },
  methods: {
    getObjectColoredDisplay (uuid) {
      return this.$store.getters['env/getObjectDisplayName'](uuid)
    },
    itemSelected (v) {
      let right = {
        uuid: v.uuid,
        type: v.type
      }
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.judge, right })
    }
  }
}
</script>

<style scoped>
.fix-top {
  margin-top: 11px;
}
.fix-padding-top {
  padding-top: 8px;
}
.change-type {
  visibility: hidden
}
.wrapper:hover .change-type{
  visibility: visible;
}
</style>
