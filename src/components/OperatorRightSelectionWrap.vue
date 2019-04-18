<template>
  <div class="wrapper row">
    <div v-for="(r, i) in rightArray" :key="r.uuid ? r.uuid : r.type + Math.random()" class="row">
      <!-- 链接符号 -->
      <div v-if="i % 2 == 1 && r.type == 'symbol'" class="cursor-pointer" :class="textWrapClass">
        {{r.symbol}}
        <symbol-menu v-if="!onlyShow" :target-obj-type="neededValueType" :ext-info="{ symbolIndex: i }" @item-selected="symbolSelected" @remove-selected="symbolRemove"/>
      </div>
      <!-- 变量前的选择符号 -->
      <div v-if="i % 2 == 0 && !onlyShow && r.type != 'unknow'" class="change-type cursor-pointer">
        <q-icon name="gamepad" color="accent" class="fix-top">
          <q-tooltip>
            选择其他
          </q-tooltip>
        </q-icon>
        <selection-menu :value-type="neededValueType" :ext-info="{ rightIndex: i }" can-input  @item-selected="itemSelected"/>
      </div>
      <!-- 变量未知的情况下 -->
      <div v-if="i % 2 == 0 && r.type == 'unknow'" class="text-accent cursor-pointer" :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}">
        请选择
        <selection-menu v-if="!onlyShow" :value-type="neededValueType" :ext-info="{ rightIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
      <!-- 变量为直接输入字符串 -->
      <editable-string-text v-if="i % 2 == 0 && r.type === 'string'" :string-typed="r" :wrap-class="textWrapClass"/>
      <!-- 变量为对象 -->
      <div v-if="i % 2 == 0 && r.type == 'object'" class="cursor-pointer" :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}">
        <span v-if="r.uuid" :class="['text-' + getObjectColoredDisplay(r.uuid).color]" >
          {{getObjectColoredDisplay(r.uuid).display}}
        </span>
        <span v-if="!r.uuid" >
          请选择
        </span>
        <selection-menu v-if="!onlyShow" :value-type="neededValueType" :ext-info="{ rightIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
    </div>
    <div v-if="showSymbolLink" class="link-symbol cursor-pointer">
      <q-icon name="usb" class="fix-top"/>
      <symbol-menu :target-obj-type="neededValueType" :ext-info="{ symbolIndex: -1 }" @item-selected="symbolSelected"/>
    </div>
  </div>
</template>
<script>
import EditableStringText from './EditableStringText'
import SelectionMenu from './SelectionMenu'
import SymbolMenu from './SymbolMenu'

export default {
  name: 'OperatorRightSelectionWrap',
  components: {
    SelectionMenu,
    SymbolMenu,
    EditableStringText
  },
  props: {
    neededValueType: String,
    rightArray: Array,
    onlyShow: {
      type: Boolean,
      default: false
    },
    textWrapClass: {
      type: String,
      default: 'q-pa-sm'
    },
    inTable: Boolean,
    extInfo: Object
  },
  computed: {
    showSymbolLink () {
      return !this.onlyShow && this.rightArray.length % 2 === 1
    }
  },
  methods: {
    getObjectColoredDisplay (uuid) {
      return this.$store.getters['env/getObjectDisplayName'](uuid)
    },
    symbolSelected (v, { symbolIndex }) {
      symbolIndex = symbolIndex === -1 ? this.rightArray.length : symbolIndex
      this.$emit('symbol-selected', symbolIndex, v, this.extInfo)
    },
    symbolRemove ({ symbolIndex }) {
      this.$emit('symbol-remove', symbolIndex, this.extInfo)
    },
    itemSelected (v, { rightIndex }) {
      let oneRight
      if (v.type === 'string') {
        oneRight = v
      } else {
        oneRight = {
          uuid: v.uuid,
          type: v.type
        }
      }
      this.$emit('item-selected', rightIndex, oneRight, this.extInfo)
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
.fix-padding-top-table {
  padding-top: 4px;
}
.change-type, .link-symbol {
  visibility: hidden
}
.wrapper:hover .change-type, .wrapper:hover .link-symbol{
  visibility: visible;
}
</style>
