<template>
  <q-layout view="hHh Lpr fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          可视化规则配置
          <div slot="subtitle">Running on VRE v0.1.0</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-scroll-area class="fit">
        <q-list padding >
          <q-item
            clickable
            v-ripple
            @click="ruleDialog = true"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>规则代码查看/导入</q-item-section>
          </q-item>
          <q-separator spaced />

          <q-item
            clickable
            v-ripple
            @click="envDialog = true"
          >
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>规则对象库查看/导入</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <!-- <router-view /> -->
      <basic-rule v-if="ruleType == 'basicRule'"/>
      <decision-rule v-if="ruleType == 'decisionRule'"/>
    </q-page-container>

    <q-dialog v-model="ruleDialog" persistent maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input
            v-model="ruleText"
            filled
            rows="30"
            type="textarea"
          />
        </q-card-section>
        <q-card-section>
          <q-btn color="primary" label="规则导入" @click="importRule"/>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="envDialog" persistent maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-input
            v-model="envText"
            filled
            rows="30"
            type="textarea"
          />
        </q-card-section>
        <q-card-section>
          <q-btn color="primary" label="对象库导入" @click="importEnv"/>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
import BasicRule from 'pages/BasicRule'
import DecisionRule from 'pages/DecisionRule'
export default {
  name: 'MyLayout',
  components: {
    BasicRule,
    DecisionRule
  },
  data () {
    return {
      leftDrawerOpen: false, // this.$q.platform.is.desktop
      ruleDialog: false,
      envDialog: false,
      ruleTextTmp: '',
      envTextTmp: '',
      basicRule: {
        'type': 'basicRule',
        'uuid': 'bbbbbbbbb',
        'initial': [],
        'activities': [],
        'else': []
      },
      decisionRule: {
        'type': 'decisionRule',
        'uuid': 'ddddddd',
        'head': {
          'conditions': [
            {
              'type': 'object',
              'uuid': 'aaaaaaaaaa'
            }, {
              'type': 'object',
              'uuid': 'hhhhhhhhhhhhhhhh'
            }
          ],
          'decisions': [
            {
              'type': 'object',
              'uuid': 'ttttttttttttttt'
            }
          ]
        },
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
                    'right': [{
                      'type': 'string',
                      'text': '29'
                    }]
                  },
                  {
                    'uuid': 'c1j2',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'aaaaaaaaaa'
                    }, // 年龄
                    'judgement': '<=',
                    'right': [{
                      'type': 'string',
                      'text': '60'
                    }]
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
                    'right': [{
                      'type': 'string',
                      'text': '175'
                    }]
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
                'right': [{
                  'type': 'string',
                  'text': '临时变量的值'
                }]
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
                    'right': [{
                      'type': 'string',
                      'text': '29'
                    }]
                  },
                  {
                    'uuid': 'c1j2',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'aaaaaaaaaa'
                    }, // 年龄
                    'judgement': '<=',
                    'right': [{
                      'type': 'string',
                      'text': '60'
                    }]
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
                'right': [{
                  'type': 'string',
                  'text': '临时变量的值'
                }]
              }
            ]
          },
          {
            'conditions': [
              {
                'uuid': 'c3',
                'type': 'condition',
                'logic': 'and',
                'children': [
                  {
                    'uuid': 'c3j1',
                    'type': 'expression',
                    'text': '表达式的整体条件展示'
                  }
                ]
              },
              {
                'uuid': 'c4',
                'type': 'condition',
                'logic': 'and',
                'children': [
                  {
                    'uuid': 'c4j1',
                    'type': 'judge',
                    'left': {
                      'type': 'object',
                      'uuid': 'aaaaaaaaaa'
                    },
                    'judgement': '>',
                    'right': [{
                      'type': 'expression',
                      'text': '表达式条件判断展示'
                    }]
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
                'right': [
                  {
                    'type': 'expression',
                    'text': '表达式赋值信息展示'
                  }
                ]
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
            'methods': [
              { 'type': 'method', 'display': '从临时变量中测试{arg1}参数{arg2}', 'name': '', 'group': '', 'uuid': 'mmmethod', 'valueType': 'string', 'paramTypes': ['string', 'string'], 'params': [] }
            ]
          }
        ],
        'sheets': [],
        'trees': []
      }
    }
  },
  computed: {
    ruleType () {
      return this.$store.state.rule.type
    },
    ruleText: {
      get () {
        return JSON.stringify(this.$store.state.rule, null, 2)
      },
      set (v) {
        this.ruleTextTmp = v
      }
    },
    envText: {
      get () {
        return JSON.stringify(this.$store.state.env, null, 2)
      },
      set (v) {
        this.envTextTmp = v
      }
    }
  },
  methods: {
    // openURL,
    importRule () {
      let r = {}
      try {
        r = JSON.parse(this.ruleTextTmp)
      } catch (e) {
        r = eval('(' + this.ruleTextTmp + ')')
      }
      this.$store.dispatch('rule/setRule', r)
      this.ruleDialog = false
    },
    importEnv () {
      let ee = {}
      try {
        ee = JSON.parse(this.envTextTmp)
      } catch (e) {
        ee = eval('(' + this.envTextTmp + ')')
      }
      this.$store.dispatch('rule/setEnv', ee)
      this.envDialog = false
    }
  },
  mounted () {
    // 请求规则数据，样例见src/source/demoDecision.json
    // 并将请求到的数据存入data中
    this.$store.dispatch('env/setEnv', this.env)
    // this.$store.dispatch('rule/setRule', this.decisionRule)
    this.$store.dispatch('rule/setRule', this.basicRule)
  }
}
</script>

<style>
</style>
