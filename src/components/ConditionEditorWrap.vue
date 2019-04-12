<template>
  <div class="row items-center q-gutter-x-lg">
    <div>
      <q-btn :label="condition.logic == 'and' ? '并且' : '或者'">
        <q-menu auto-close>
          <q-list>
            <q-item clickable @click="$store.commit('rule/CHANGE_CONDITION_LOGIC', condition)">
              <q-item-section>
                <q-item-label>{{condition.logic == 'and' ? '或者' : '并且'}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable @click="addChild()">
              <q-item-section>
                <q-item-label>添加条件</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="changeToSingleLine" clickable>
              <q-item-section>
                <q-item-label>转为单个条件</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="column q-gutter-lg">
      <div v-for="(judge, ji) in condition.children" :key="judge.uuid" class="col">
        <div class="row">
          <colored-selection :is-left="true" :current-judge="judge" />
          <judgement-operator :content-index="contentIndex" :condition-index="conditionIndex" :judge-index="ji" />
          <editable-string-text v-if="judge.right.type == 'string'" :string-typed="judge.right" /> <!-- TODO 其他类型的支持 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColoredSelection from './ColoredSelection'
import JudgementOperator from './JudgementOperator'
import EditableStringText from './EditableStringText'
export default {
  name: 'ConditionEditorWrap',
  components: {
    ColoredSelection,
    JudgementOperator,
    EditableStringText
  },
  props: {
    contentIndex: Number,
    conditionIndex: Number,
    mainLeftUuid: String, // 主判断对象uuid
    changeToSingleLine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    condition: {
      get () {
        return this.$store.getters['rule/ruleCondition'](this.contentIndex, this.conditionIndex)
      },
      set (v) {}
    }
  },
  methods: {
    addChild () {
      let child = {
        'uuid': 'tmp-' + Math.random(),
        'type': 'judge',
        'left': {
          'type': 'unknow'
        },
        'judgement': '请选择',
        'right': {
          'type': 'unknow'
        }
      }
      if (this.mainLeftUuid && this.mainLeftUuid !== '') {
        child.left = {
          type: 'object',
          uuid: this.mainLeftUuid
        }
      }
      this.$store.commit('rule/ADD_CONDITION_CHILD', { contentIndex: this.contentIndex, conditionIndex: this.conditionIndex, child })
    }
  }
}
</script>
