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
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="column q-gutter-lg">
      <div v-for="(judge, ji) in condition.children" :key="judge.uuid" class="col hover-show-parent">
        <span class="hover-show cursor-pointer float-left q-mr-xs" >
          <q-icon name="transform" color="teal-7" style="margin-top: 10px" />
          <condition-change-menu :type="judge.type" @change-to-condition="changeToCondition(ji)" @change-to-expression="changeToExpression(ji)" @change-to-judge="changeToJudge(ji)"/>
        </span>
        <editable-expression v-if="judge.type == 'expression'" :expression="judge" />
        <div v-if="judge.type == 'judge'" class="row">
          <div class="row hover-show-parent">
            <colored-selection is-left :current-judge="judge" />
            <judgement-operator :judge="judge"/>

            <operator-right-selection-wrap
              v-if="$judgementHasRight(judge)"
              :needed-value-type="$store.getters['env/findObject'](mainLeftUuid).valueType"
              :right-array="judge.right"
              :ext-info="{judgeIndex: ji}"
              @symbol-selected="symbolSelected"
              @symbol-remove="symbolRemove"
              @item-selected="itemSelected"/>
          </div>

          <span class="hover-show cursor-pointer float-right" @click="removeJudge(ji)">
            <q-icon name="delete" color="negative" style="margin-top: 10px;">
              <q-tooltip>
                删除
              </q-tooltip>
            </q-icon>
          </span>
        </div>
        <div v-if="judge.type == 'condition'" class="row">
          <condition-editor-wrap :main-left-uuid="mainLeftUuid" :condition="judge" @change-to-judge="() => {changeToJudge(ji)}"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColoredSelection from './ColoredSelection'
import JudgementOperator from './JudgementOperator'
import OperatorRightSelectionWrap from './OperatorRightSelectionWrap'
import EditableExpression from './EditableExpression'
import ConditionChangeMenu from './ConditionChangeMenu'
export default {
  name: 'ConditionEditorWrap',
  components: {
    ColoredSelection,
    JudgementOperator,
    EditableExpression,
    ConditionChangeMenu,
    OperatorRightSelectionWrap
  },
  props: {
    mainLeftUuid: String, // 主判断对象uuid
    condition: Object
  },
  computed: {
    judges: {
      get () {
        return this.condition.children || []
      }
    }
  },
  methods: {
    symbolSelected (symbolIndex, v, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.condition.children[judgeIndex], index: symbolIndex, oneRight: v })
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.condition.children[judgeIndex], index: symbolIndex + 1, oneRight: { type: 'unknow' } })
    },
    symbolRemove (symbolIndex, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/REMOVE_JUDGE_RIGHT_AFTER_INDEX', { judge: this.condition.children[judgeIndex], index: symbolIndex })
    },
    itemSelected (rightIndex, v, extInfo) {
      let judgeIndex = extInfo ? (extInfo.judgeIndex) : 0
      this.$store.commit('rule/UPDATE_JUDGE_RIGHT', { judge: this.condition.children[judgeIndex], index: rightIndex, oneRight: v })
    },
    removeJudge (judgeIndex) {
      this.$store.commit('rule/REMOVE_JUDGE_FROM_CONDITION', { condition: this.condition, judgeIndex })
    },
    addChild () {
      let child = {
        'uuid': 'tmp-judge' + Math.random(),
        'type': 'judge',
        'left': {
          'type': 'unknow'
        },
        'judgement': '请选择',
        'right': [{
          'type': 'unknow'
        }]
      }
      if (this.mainLeftUuid && this.mainLeftUuid !== '') {
        child.left = {
          type: 'object',
          uuid: this.mainLeftUuid
        }
      }
      this.$store.commit('rule/ADD_CONDITION_CHILD', { condition: this.condition, child })
    },
    changeToCondition (judgeIndex) {
      this.$store.commit('rule/CHANGE_JUDGE_TO_CONDITION', { condition: this.condition, judgeIndex })
    },
    changeToJudge (judgeIndex) {
      this.$store.commit('rule/CHANGE_CONDITION_TO_JUDGE', { condition: this.condition, judgeIndex })
    },
    changeToExpression (judgeIndex) {
      this.$store.commit('rule/CHANGE_JUDGE_TO_EXPRESSION', { condition: this.condition, judgeIndex })
    }
  }
}
</script>
