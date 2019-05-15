<template>
  <q-menu v-model="showMenu">
    <q-list>
      <q-item v-if="type != 'condition'" clickable>
        <q-item-section @click="$emit('change-to-condition')">
          转为组合条件
        </q-item-section>
      </q-item>
      <q-item v-if="type != 'expression'" clickable>
        <q-item-section @click="$emit('change-to-expression')">
          转为表达式
        </q-item-section>
      </q-item>
      <q-item v-if="type != 'judge'" clickable>
        <q-item-section @click="$emit('change-to-judge')">
          转为单个条件
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: 'ConditionChangeMenu',
  props: {
    type: String
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
  }
}
</script>
