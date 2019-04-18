<template>
  <q-menu v-model="showMenu">
    <q-list>
      <q-item clickable v-for="v in symbols" :key="v">
        <q-item-section @click="objClicked(v)">
          {{v}}
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section @click="removeClicked">
          <q-icon name="usb" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: 'SymbolMenu',
  props: {
    targetObjType: String,
    extInfo: Object
  },
  computed: {
    symbols () {
      return this.$availableSymbols(this.targetObjType)
    }
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    objClicked (v) {
      this.$emit('item-selected', { type: 'symbol', symbol: v }, this.extInfo)
    },
    removeClicked () {
      this.$emit('remove-selected', this.extInfo)
    }
  }
}
</script>
