<template>
  <div class="q-pa-lg q-gutter-md">
    <div class="row">
      <div class="col q-gutter-md">
        <q-btn color="deep-orange" icon="add_circle_outline" label="增加条件"/>
        <q-btn color="purple" icon="add" label="增加赋值"/>
        <q-btn color="primary" label="输出" @click="logRule"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-markup-table class="text-center">
          <thead>
            <tr>
              <th v-for="field in $store.getters['rule/decisionConditionFieldUuids']" :key="field">{{ $store.getters['env/getObjectDisplayName'](field).display }}</th>
              <th v-for="decision in $store.getters['rule/decisionAssignUuids']" :key="decision">{{  $store.getters['env/getObjectDisplayName'](decision).display }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(content, c) in $store.getters['rule/ruleContents']" :key="content.uuid">
              <td v-for="(j, i) in $store.getters['rule/decisionConditionFieldUuids']" :key="j">
                <editable-condition :condition="content.conditions[i]" :main-left-uuid="j" />
              </td>
              <td v-for="(d, i) in $store.getters['rule/decisionAssignUuids']" :key="d">
                <editable-decision :content-index="c" :decision-index="i" :main-decision-uuid="d"/>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
  </div>
</template>

<script>
import EditableCondition from 'src/components/EditableCondition'
import EditableDecision from 'src/components/EditableDecision'
export default {
  name: 'DecisionRule',
  components: {
    EditableCondition,
    EditableDecision
  },
  data: () => {
    return {
      rule: {
        'type': 'decisionRule',
        'uuid': 'ddddddd',
        'content': [
          {
            'conditions': [
              {
                'uuid': 'c1',
                'type': 'condition',
                'logic': 'and',
                'children': [
                  {
                    'uuid': 'c1j1',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'aaaaaaaaaa'
                    }, // 年龄
                    'judgement': '>',
                    'right': {
                      'type': 'string',
                      'text': '29'
                    }
                  },
                  {
                    'uuid': 'c1j2',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'aaaaaaaaaa'
                    }, // 年龄
                    'judgement': '<=',
                    'right': {
                      'type': 'string',
                      'text': '60'
                    }
                  }
                ]
              },
              {
                'uuid': 'c2',
                'type': 'condition',
                'logic': 'and',
                'children': [
                  {
                    'uuid': 'c2j1',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'hhhhhhhhhhhhhhhh'
                    }, // 身高
                    'judgement': '<=',
                    'right': {
                      'type': 'string',
                      'text': '175'
                    }
                  }
                ]
              }
            ],
            'decisions': [
              {
                'uuid': 'aa1',
                'type': 'assign',
                'left': {
                  'type': 'object',
                  'uuid': 'ttttttttttttttt'
                },
                'right': {
                  'type': 'string',
                  'text': '临时变量的值'
                }
              }
            ]
          },
          {
            'conditions': [
              {
                'uuid': 'c1',
                'type': 'condition',
                'logic': 'or',
                'children': [
                  {
                    'uuid': 'c1j1',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'aaaaaaaaaa'
                    }, // 年龄
                    'judgement': '>',
                    'right': {
                      'type': 'string',
                      'text': '29'
                    }
                  },
                  {
                    'uuid': 'c1j2',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'aaaaaaaaaa'
                    }, // 年龄
                    'judgement': '<=',
                    'right': {
                      'type': 'string',
                      'text': '60'
                    }
                  }
                ]
              },
              {}
            ],
            'decisions': [
              {
                'uuid': 'aa1',
                'type': 'assign',
                'left': {
                  'type': 'object',
                  'uuid': 'ttttttttttttttt'
                },
                'right': {
                  'type': 'string',
                  'text': '临时变量的值'
                }
              }
            ]
          }
        ]
      },
      env: {
        'values': [
          {
            'type': 'object',
            'display': '年龄',
            'name': 'age',
            'uuid': 'aaaaaaaaaa',
            'valueType': 'int',
            'methods': []
          },
          {
            'type': 'object',
            'display': '身高',
            'name': 'height',
            'uuid': 'hhhhhhhhhhhhhhhh',
            'valueType': 'int',
            'methods': []
          },
          {
            'type': 'object',
            'display': '姓名',
            'name': 'name',
            'uuid': 'ssssssssssssss',
            'valueType': 'string',
            'methods': []
          }
        ],
        'variables': [
          {
            'type': 'object',
            'display': '临时变量',
            'name': 'tempX',
            'uuid': 'ttttttttttttttt',
            'valueType': 'string',
            'methods': []
          }
        ],
        'sheets': [],
        'trees': []
      }
    }
  },
  computed: {
  },
  methods: {
    logRule () {
      console.log(this.$store.state.rule)
    }
  },
  mounted () {
    // 请求规则数据，样例见src/source/demoDecision.json
    // 并将请求到的数据存入data中
    this.$store.dispatch('env/setEnv', this.env)
    this.$store.dispatch('rule/setRule', this.rule)
  }
}
</script>
