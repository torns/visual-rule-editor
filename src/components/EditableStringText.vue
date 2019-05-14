<template>
  <div :class="wrapClass" class="cursor-pointer">
    <div style="min-width: 15px;min-height: 20px" :class="{'bg-green-2' : !stringTyped.text}">

      {{ text }}
      <q-popup-edit v-model="text" @save="saveValue" buttons :validate="validateValue">
        <q-input v-model="text" dense autofocus counter :error="error" :error-message="errorMessage"/>
      </q-popup-edit>

    </div>
  </div>
</template>

<script>
export default {
  name: 'EditableStringText',
  props: {
    stringTyped: Object,
    needValueType: {
      type: String,
      default: 'string'
    },
    wrapClass: {
      type: String,
      default: 'q-pa-sm'
    }
  },
  data () {
    return {
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    text: {
      get () {
        return this.stringTyped.text
      },
      set (v) {
        this.$store.commit('rule/UPDATE_STRING_TEXT', { obj: this.stringTyped, value: v })
      }
    }
  },
  methods: {
    validateValue (v) {
      let b = this.$inputValueTypeValidation(this.needValueType)(v)
      if (b) {
        this.error = false
        this.errorMessage = ''
      } else {
        this.error = true
        this.errorMessage = '请输入合法的值'
      }
      return b
    },
    saveValue (v, ov) {
      this.$store.commit('rule/UPDATE_STRING_TEXT', { obj: this.stringTyped, value: v })
    }
  }
}
</script>
