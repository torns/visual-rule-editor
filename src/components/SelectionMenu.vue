<template>
  <q-menu v-model="showMenu">
    <q-list>
      <q-item v-if="canInput" clickable>
        <q-item-section @click="objClicked({type: 'string', text: ''})">输入值</q-item-section>
      </q-item>
      <q-item v-if="canInput" clickable>
        <q-item-section @click="objClicked({type: 'expression', text: ''})">表达式</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>传递变量</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-menu anchor="top right" self="top left">
          <q-list>
            <template v-for="v in values">
              <q-item v-if="withoutMethods || !v.methods || filteredMethods(v.methods).length == 0" dense clickable :key="'value:' + v.uuid">
                <q-item-section @click="objClicked(v)">{{ v.display }}</q-item-section>
              </q-item>
              <q-item v-if="!withoutMethods && v.methods && filteredMethods(v.methods).length > 0" dense clickable :key="'valueMethods:' + v.uuid">
                <q-item-section @click="objClicked(v)">{{ v.display }}</q-item-section>
                <q-item-section side >
                  <q-icon name="keyboard_arrow_right" />
                  <q-menu anchor="top right" self="top left">
                    <q-list>
                      <q-item dense clickable v-for="m in filteredMethods(v.methods)" :key="m.uuid">
                        <q-item-section @click="objClicked(m)">{{ m.display }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-menu>
      </q-item>
      <q-item clickable>
        <q-item-section>临时变量</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>
        <q-menu anchor="top right" self="top left">
          <q-list>
            <template v-for="v in variables">
              <q-item v-if="withoutMethods || !v.methods || filteredMethods(v.methods).length == 0" dense clickable :key="'value:' + v.uuid">
                <q-item-section @click="objClicked(v)">{{ v.display }}</q-item-section>
              </q-item>
              <q-item v-if="!withoutMethods && v.methods && filteredMethods(v.methods).length > 0" dense clickable :key="'valueMethods:' + v.uuid">
                <q-item-section @click="objClicked(v)">{{ v.display }}</q-item-section>
                <q-item-section side >
                  <q-icon name="keyboard_arrow_right" />
                  <q-menu anchor="top right" self="top left">
                    <q-list>
                      <q-item dense clickable v-for="m in filteredMethods(v.methods)" :key="m.uuid">
                        <q-item-section @click="objClicked(m)">{{ m.display }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-menu>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: 'SelectionMenu',
  computed: {
    values: function () {
      let t = this.valueType
      return this.$store.state.env.values.filter((v) => {
        return !t || t === '' || v.valueType === t
      })
    },
    variables: function () {
      let t = this.valueType
      return this.$store.state.env.variables.filter((v) => {
        return !t || t === '' || v.valueType === t
      })
    }
  },
  props: {
    valueType: String,
    canInput: Boolean,
    withoutMethods: Boolean,
    extInfo: Object
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    filteredMethods (methods) {
      if (!methods || methods.length === 0) {
        return []
      }
      let t = this.valueType
      return methods.filter((m) => {
        return !t || t === '' || m.valueType === t
      })
    },
    objClicked (v) {
      this.$emit('item-selected', v, this.extInfo)
      this.showMenu = false
    }
  }
}
</script>
