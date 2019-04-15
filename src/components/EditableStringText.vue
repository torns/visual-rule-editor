<template>
  <div :class="wrapClass" class="cursor-pointer">
    <div style="min-width: 15px;min-height: 20px" :class="{'bg-green-2' : !stringTyped.text}">
      {{ stringTyped.text }}
      <q-popup-edit :value="stringTyped.text" buttons >
        <q-input :value="stringTyped.text" dense autofocus @input="(v) => { $store.commit('rule/UPDATE_STRING_TEXT', { obj: stringTyped, value: v }) }"/>
      </q-popup-edit>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditableStringText',
  props: {
    stringTyped: Object,
    wrapClass: {
      type: String,
      default: 'q-pa-sm'
    }
  }
}
</script>
