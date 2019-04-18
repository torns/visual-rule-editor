<template>
  <div class="wrapper row">
    <div v-for="(a, i) in decision.right" :key="a.uuid ? a.uuid : a.type + Math.random()" class="row">
      <!-- 链接符号 -->
      <div v-if="a.type == 'symbol'" class="cursor-pointer">
        {{a.symbol}}
        <symbol-menu :target-obj-type="needValueType" :ext-info="{ symbolIndex: i }" @item-selected="symbolSelected"/>
      </div>
      <!-- 变量前的选择符号 -->
      <div v-if="!onlyShow && a.type != 'unknow'" class="change-type cursor-pointer" :key="a.uuid">
        <q-icon name="gamepad" color="accent" class="fix-top">
          <q-tooltip>
            选择其他
          </q-tooltip>
        </q-icon>
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{ assignIndex: i }" can-input  @item-selected="itemSelected"/>
      </div>
      <!-- 变量未知的情况下 -->
      <div v-if="a.type == 'unknow'" class="text-accent cursor-pointer fix-padding-top" :key="a.type + Math.random()">
        请选择
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{ assignIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
      <!-- 变量为直接输入字符串 -->
      <editable-string-text v-if="a.type === 'string'" :string-typed="a" :wrap-class="textWrapClass"/>
      <!-- 变量为对象 -->
      <div v-if="a.type == 'object'" class="cursor-pointer fix-padding-top">
        <span v-if="a.uuid" :class="['text-' + getObjectColoredDisplay(a.uuid).color]" >
          {{getObjectColoredDisplay(a.uuid).display}}
        </span>
        <span v-if="!a.uuid" >
          请选择
        </span>
        <selection-menu v-if="!onlyShow" :value-type="needValueType" :ext-info="{ assignIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
    </div>
  </div>
</template>
<script>
import EditableStringText from './EditableStringText'
import SelectionMenu from './SelectionMenu'
import SymbolMenu from './SymbolMenu'

export default {
  name: 'AssignRightSelectionWrap',
  components: {
    SelectionMenu,
    SymbolMenu,
    EditableStringText
  },
  props: {
    decision: Object,
    onlyShow: {
      type: Boolean,
      default: false
    },
    textWrapClass: String
  },
  computed: {
    needValueType: {
      get () {
        return this.$store.getters['env/findObject'](this.decision.left.uuid).valueType
      }
    }
  },
  methods: {
    getObjectColoredDisplay (uuid) {
      return this.$store.getters['env/getObjectDisplayName'](uuid)
    },
    itemSelected (v, { assignIndex }) {
      assignIndex = assignIndex | 0
      let oneRight
      if (v.type === 'string') {
        oneRight = v
      } else {
        oneRight = {
          uuid: v.uuid,
          type: v.type
        }
      }
      this.$store.commit('rule/UPDATE_DECISION_RIGHT', { decision: this.decision, assignIndex, oneRight })
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
