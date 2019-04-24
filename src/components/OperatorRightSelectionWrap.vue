<template>
  <div class="wrapper row hover-show-parent">
    <div v-if="!rightArray || rightArray.length == 0" class="text-accent cursor-pointer" :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}">
      请选择
      <selection-menu v-if="!onlyShow" :value-type="neededValueType" :ext-info="{ rightIndex: 0 }" can-input @item-selected="itemSelected"/>
    </div>
    <div v-for="(r, i) in rightArray" :key="r.uuid ? r.uuid : r.type + Math.random()" class="row hover-show-parent">
      <!-- 链接符号 -->
      <div v-if="r.type == 'symbol'" class="cursor-pointer" :class="textWrapClass">
        {{r.symbol}}
        <symbol-menu :target-obj-type="neededValueType" :ext-info="{ symbolIndex: i }" @item-selected="symbolSelected" @remove-selected="symbolRemove"/>
      </div>
      <!-- 变量前的选择符号 -->
      <div v-if="!onlyShow && r.type != 'unknow' && r.type != 'symbol'" class="hover-show cursor-pointer">
        <q-icon name="gamepad" color="accent" class="fix-top">
          <q-tooltip>
            选择其他
          </q-tooltip>
        </q-icon>
        <selection-menu :value-type="neededValueType" :ext-info="{ rightIndex: i }" can-input  @item-selected="itemSelected"/>
      </div>
      <!-- 变量未知的情况下 -->
      <div v-if="r.type == 'unknow'" class="text-accent cursor-pointer" :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}">
        请选择
        <selection-menu :value-type="neededValueType" :ext-info="{ rightIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
      <!-- 变量为直接输入字符串 -->
      <editable-string-text v-if="r.type === 'string'" :string-typed="r" :wrap-class="textWrapClass"/>
      <!-- 变量为对象 -->
      <div v-if="r.type == 'object'" class="cursor-pointer" :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}">
        <span v-if="r.uuid" :class="['text-' + getObjectColoredDisplay(r.uuid).color]" >
          {{getObjectColoredDisplay(r.uuid).display}}
        </span>
        <span v-if="!r.uuid" >
          请选择
        </span>
        <selection-menu v-if="!onlyShow" :value-type="neededValueType" :ext-info="{ rightIndex: i }" can-input @item-selected="itemSelected"/>
      </div>
      <!-- 变量为方法 -->
      <div v-if="r.type == 'method'" class="cursor-pointer"  :class="{'fix-padding-top-table': inTable, 'fix-padding-top': !inTable}">
        <method-displayer :method="r" :only-show="onlyShow"/>
      </div>
    </div>
    <div v-if="showSymbolLink" class="hover-show cursor-pointer">
      <q-icon name="usb" class="fix-top"/>
      <symbol-menu :target-obj-type="neededValueType" :ext-info="{ symbolIndex: -1 }" @item-selected="symbolSelected"/>
    </div>
  </div>
</template>
<script>
import EditableStringText from './EditableStringText'
import SelectionMenu from './SelectionMenu'
import SymbolMenu from './SymbolMenu'
import MethodDisplayer from './MethodDisplayer'

export default {
  name: 'OperatorRightSelectionWrap',
  components: {
    SelectionMenu,
    SymbolMenu,
    EditableStringText,
    MethodDisplayer
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
      return !this.onlyShow && this.rightArray && this.rightArray.length % 2 === 1
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
