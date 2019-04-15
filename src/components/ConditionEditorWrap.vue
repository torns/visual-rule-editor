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
        <div class="row judge-row">
          <colored-selection :is-left="true" :current-judge="judge" />
          <judgement-operator :judge="judge"/>

          <judge-right-selection-wrap :judge="judge"/>

          <span class="remove-judge cursor-pointer float-right" @click="removeJudge(ji)">
            <q-icon name="delete" color="negative" style="margin-top: 10px;">
              <q-tooltip>
                删除
              </q-tooltip>
            </q-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColoredSelection from './ColoredSelection'
import JudgementOperator from './JudgementOperator'
import JudgeRightSelectionWrap from './JudgeRightSelectionWrap'
export default {
  name: 'ConditionEditorWrap',
  components: {
    ColoredSelection,
    JudgementOperator,
    JudgeRightSelectionWrap
  },
  props: {
    mainLeftUuid: String, // 主判断对象uuid
    condition: Object,
    changeToSingleLine: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    judges: {
      get () {
        return this.condition.children || []
      }
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.remove-judge {
  visibility: hidden;
}
.judge-row:hover .remove-judge {
  visibility: visible;
}
</style>
