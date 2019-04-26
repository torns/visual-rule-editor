<template>
  <div class="row">
    <div v-for="(t, i) in methodDisplayTexts" :key="t" class="row">
      {{t}}
      <span v-if="methodParamIndexes.length > i">
        <span class="text-accent" v-if="!getParam(methodParamIndexes[i] - 1)">请选择</span>
        <!-- 变量为直接输入字符串 -->
        <div v-if="getParam(methodParamIndexes[i] - 1) && getParam(methodParamIndexes[i] - 1).type === 'string'" class="row hover-show-parent">
          <q-icon v-if="!onlyShow" name="gamepad" color="accent" class="mt-4 hover-show">
            <q-tooltip>
              选择其他
            </q-tooltip>
          </q-icon>
          <editable-string-text  :string-typed="getParam(methodParamIndexes[i] - 1)" :need-value-type="getParamValueType(methodParamIndexes[i] - 1)" wrap-class="q-px-sm"/>
        </div>
        <div v-if="getParam(methodParamIndexes[i] - 1) && getParam(methodParamIndexes[i] - 1).type == 'object'" class="cursor-pointer">
          <span v-if="getParam(methodParamIndexes[i] - 1).uuid" :class="['text-' + getObjectColoredDisplay(getParam(methodParamIndexes[i] - 1).uuid).color]" >
            {{getObjectColoredDisplay(getParam(methodParamIndexes[i] - 1).uuid).display}}
          </span>
          <span v-if="!getParam(methodParamIndexes[i] - 1).uuid" >
            请选择
          </span>
        </div>
        <selection-menu v-if="!onlyShow" :value-type="getParamValueType(methodParamIndexes[i] - 1)" :ext-info="{ paramIndex: methodParamIndexes[i] - 1 }" can-input  @item-selected="itemSelected"/>
      </span>
    </div>
  </div>
</template>

<script>
import SelectionMenu from './SelectionMenu'
import EditableStringText from './EditableStringText'
export default {
  name: 'MethodDisplayer',
  components: {
    SelectionMenu,
    EditableStringText
  },
  props: {
    onlyShow: Boolean,
    method: Object,
    inTable: Boolean,
    textWrapClass: {
      type: String,
      default: 'q-pa-sm'
    }
  },
  computed: {
    theMethod () {
      return this.$store.getters['env/findMethod'](this.method.uuid)
    },
    methodDisplayTexts () {
      let m = this.$store.getters['env/findMethod'](this.method.uuid)
      if (m) {
        return m.display.split(/\{arg\d+\}/)
      }
      return []
    },
    methodParamIndexes () {
      let m = this.$store.getters['env/findMethod'](this.method.uuid)
      if (m) {
        const regexp = /\{arg(\d+)\}/ig
        let r = []
        let t
        while ((t = regexp.exec(m.display)) !== null) {
          r.push(t[1])
        }
        return r
      }
      return []
    }
  },
  methods: {
    getObjectColoredDisplay (uuid) {
      return this.$store.getters['env/getObjectDisplayName'](uuid)
    },
    getParamValueType (index) {
      return this.theMethod.paramTypes[index]
    },
    getParam (index) {
      return this.method.params ? this.method.params[index] : false
    },
    itemSelected (v, { paramIndex }) {
      this.$store.commit('rule/UPDATE_METHOD_PARAM', { method: this.method, index: paramIndex, value: { uuid: v.uuid, type: v.type } })
    }
  }
}
</script>
