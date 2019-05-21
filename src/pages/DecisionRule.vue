<template>
  <div class="q-pa-lg q-gutter-md">
    <div class="row">
      <div class="col q-gutter-md">
        <q-btn color="deep-orange" icon="add_circle_outline" label="增加条件">
          <selection-menu @item-selected="addCondition" without-methods/>
        </q-btn>
        <q-btn color="purple" icon="add" label="增加赋值">
          <selection-menu @item-selected="addAssign" without-methods/>
        </q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-markup-table class="text-center">
          <thead>
            <tr>
              <th v-for="(field, index) in decisionConditionFieldUuids" :key="field" class="hover-show-parent">
                <q-icon name="chevron_left" size="1.5rem" class="cursor-pointer hover-show" v-if="index != 0" @click="conditionMoveLeft(index)">
                  <q-tooltip>前移</q-tooltip>
                </q-icon>
                {{ getObjectDisplayName(field) }}
                <q-icon name="chevron_right" size="1.5rem" class="cursor-pointer hover-show" v-if="index != decisionConditionFieldUuids.length - 1" @click="conditionMoveRight(index)">
                  <q-tooltip>后移</q-tooltip>
                </q-icon>
                <q-icon name="delete" class="hover-show cursor-pointer" @click="removeCondition(index)">
                  <q-tooltip>删除</q-tooltip>
                </q-icon>
              </th>
              <th v-for="(decision, index) in decisionAssignUuids" :key="decision" class="hover-show-parent" :style="{'border-left': index == 0 ? '1px solid rgba(0,0,0,0.12)' : 0}">
                <q-icon name="chevron_left" size="1.5rem" class="cursor-pointer hover-show" v-if="index != 0" @click="decisionMoveLeft(index)">
                  <q-tooltip>前移</q-tooltip>
                </q-icon>
                {{  getObjectDisplayName(decision) }}
                <q-icon name="chevron_right" size="1.5rem" class="cursor-pointer hover-show" v-if="index != decisionAssignUuids.length - 1" @click="decisionMoveRight(index)">
                  <q-tooltip>后移</q-tooltip>
                </q-icon>
                <q-icon name="delete" class="hover-show cursor-pointer" @click="removeDecision(index)">
                  <q-tooltip>删除</q-tooltip>
                </q-icon>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, ci) in ruleContents" :key="content.uuid">
              <td v-for="(j, i) in decisionConditionFieldUuids" :key="j">
                <editable-condition :condition="content.conditions[i]" :main-left-uuid="j" />
              </td>
              <td v-for="(d, i) in decisionAssignUuids" :key="d" :style="{'border-left': i == 0 ? '1px solid rgba(0,0,0,0.12)' : 0}">
                <editable-decision :decision="content.decisions[i]" :main-decision-uuid="d"/>
              </td>
              <td class="hover-show-parent">
                <q-icon name="delete" class="hover-show cursor-pointer" @click="removeRow(ci)">
                  <q-tooltip>删除</q-tooltip>
                </q-icon>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-btn icon="add" class="full-width" @click="addRow"/>
      </div>
    </div>
  </div>
</template>

<script>
import EditableCondition from 'src/components/EditableCondition'
import EditableDecision from 'src/components/EditableDecision'

import SelectionMenu from 'src/components/SelectionMenu'

export default {
  name: 'DecisionRule',
  components: {
    EditableCondition,
    EditableDecision,

    SelectionMenu
  },
  data: () => {
    return {

    }
  },
  computed: {
    decisionConditionFieldUuids () {
      return this.$store.getters['rule/decisionConditionFieldUuids']
    },
    decisionAssignUuids () {
      return this.$store.getters['rule/decisionAssignUuids']
    },
    ruleContents () {
      return this.$store.state.rule.content
    }
  },
  methods: {
    getObjectDisplayName (obj) {
      return this.$store.getters['env/getObjectDisplayName'](obj).display
    },
    addCondition (v) {
      if (!this.$store.getters['rule/decisionConditionFieldUuids'].includes(v.uuid)) {
        this.$store.dispatch('rule/addCondition', { type: 'object', uuid: v.uuid })
      }
    },
    addAssign (v) {
      if (!this.decisionAssignUuids.includes(v.uuid)) {
        this.$store.dispatch('rule/addAssign', { type: 'object', uuid: v.uuid })
      }
    },
    addRow () {
      this.$store.dispatch('rule/addDecision')
    },
    conditionMoveLeft (index) {
      this.$store.dispatch('rule/moveCondition', { index, left: true })
    },
    conditionMoveRight (index) {
      this.$store.dispatch('rule/moveCondition', { index, left: false })
    },
    decisionMoveLeft (index) {
      this.$store.dispatch('rule/moveDecision', { index, left: true })
    },
    decisionMoveRight (index) {
      this.$store.dispatch('rule/moveDecision', { index, left: false })
    },
    removeCondition (index) {
      this.$q.dialog({
        title: '确认删除',
        message: '确认删除该条件吗?',
        ok: {
          push: true
        },
        cancel: {
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('rule/removeCondition', { index })
      })
    },
    removeDecision (index) {
      this.$q.dialog({
        title: '确认删除',
        message: '确认删除该赋值吗?',
        ok: {
          push: true
        },
        cancel: {
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('rule/removeDecision', { index })
      })
    },
    removeRow (index) {
      this.$q.dialog({
        title: '确认删除',
        message: '确认删除该行吗?',
        ok: {
          push: true
        },
        cancel: {
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('rule/removeRow', { index })
      })
    }
  }
}
</script>
