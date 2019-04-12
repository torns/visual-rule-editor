<template>
  <div>
    <span v-for="(judge, index) in condition.children" :key="judge.uuid">
      <span v-if="index > 0">{{ condition.logic == 'and' ? '并且' : '或者' }}</span>
      <colored-selection v-if="mainLeftUuid != judge.left.uuid" :obj="judge.left" />
      {{ displayCondition(judge) }}
      <q-popup-edit v-if="judge.right.type=='string'" :value="judge.right.text" buttons >
        <q-input :value="judge.right.text" dense autofocus @input="(v) => { $store.commit('rule/UPDATE_DECISION_RULE_CONDITION_JUDGEMENT_RIGHT_STRING', { condition, judgementIndex: index, value: v }) }"/>
      </q-popup-edit>
    </span>

    <div v-if="!condition.children || condition.children.length == 0" class="bg-red-1">&nbsp;</div>

    <q-menu touch-position context-menu>
      <q-list dense style="min-width: 100px">
        <q-item clickable v-close-popup @click="editing = true">
          <q-item-section>修改</q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-dialog v-model="editing" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <condition-editor-wrap :condition="condition" :main-left-uuid="mainLeftUuid"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import ConditionEditorWrap from './ConditionEditorWrap'
import ColoredSelection from './ColoredSelection'
export default {
  name: 'EditableCondition',
  components: {
    ConditionEditorWrap,
    ColoredSelection
  },
  props: {
    condition: Object,
    mainLeftUuid: String // 主判断对象的uuid
  },
  data: () => {
    return {
      editing: false
    }
  },
  methods: {
    popupValue (judgementIndex) {
      return this.condition.children[judgementIndex].right.text
    },
    displayCondition (judge) {
      let text = ''
      if (judge.uuid) {
        if (this.mainLeft && this.mainLeft !== judge.left.uuid) {
          text = this.$store.getters['env/getObjectDisplayName'](judge.left.uuid).display + ' '
        }
        if (judge.right.type === 'string') {
          text += this.$tagT(judge.judgement) + ' ' + judge.right.text
        } else {
          text += this.$tagT(judge.judgement) + ' ' + this.$store.getters['env/getObjectDisplayName'](judge.right.uuid).display
        }
      }
      return text
    }
  }
}
</script>
