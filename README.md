# 规则引擎界面数据结构定义

# 服务器交互数据
## 页面传入参数
```json
{
  "rpid": "", // 规则包id, 在服务器端可以通过该id找到对应规则包进行修改内容
  "env":  {}, // 对象库内容
  "rule": {}  // 规则内容，根据不同类型的规则可能为不同的对象
}
```

## 编辑结束保存返回数据
```json
{
  "rpid": "", // 传入的规则包id
  "rule": {}  // 编辑后的规则内容
}
```

# 对象库内容定义
```json
{
  "values":     [], // 传入传出对象，object数组
  "variables":  [], // 临时变量对象，object数组
  "methods":    [], // 外部方法，method数组
  "constants":  [], // 常量对象，object数组
  "sheets":     [], // 内存表对象, sheet数组
  "trees":      []  // 树结构对象，treenode数组
}
```

## object 对象
```json
{
  "type":       "object", // 类型：对象
  "display":    "",       // 显示名称
  "name":       "",       // 对象名称
  "group":      "",       // 分组名称
  "uuid":       "",       // 对象的uuid
  "valueType":  "",       // 对象的值类型
  "value":      "",       // 对象的值(常量等需要值的地方使用)
  "methods":    []        // 方法method数组，该对象可使用的方法
}
```

## method 方法
```json
{
  "type":       "method", // 类型：方法
  "display":    "",       // 显示名称, 参数按照顺序从 {arg1} {arg2} ...
  "name":       "",       // 方法名
  "group":      "",       // 分组名称
  "uuid":       "",       // 方法的uuid
  "valueType":  "",       // 返回值类型，无返回值则为null
  "paramTypes": [],       // 参数类型，string数组
  "params":     []        // 参数数组, object/method 数组, 按照方法参数顺序
}
```

## sheet 内存表
```json
{
  "type":    "sheet", // 类型：内存表
  "name":    "",      // 内存表名称
  "uuid":    "",      // 内存表uuid
  "fields":  [],      // 内存表字段列表，object数组
  "methods": [],      // 内存表方法，method数组
  "inLoop":  false    // 是否处于该表的遍历中
}
```
## treenode 树结构
```json
{
  "type":     "treenode", // 类型：树状结构
  "name":     "",         // 树结构名称
  "uuid":     "",         // uuid
  "props":    [],         // 树结构的属性, object数组
  "children": [],         // 树结构的子节点，treenode数组
  "methods":  []          // 树结构的方法，method数组
}
```

# 规则内容定义
## 一般规则 basicRule
```json
{
  "type":       "basicRule",  // 类型：一般规则
  "uuid":       "",           // 规则的uuid
  "initial":    [],           // 初始化动作, method/assign 的数组
  "activities": [],           // 规则行为activity数组
  "else":       []            // 否则部分的动作, method/assign 的数组
}
```
## 决策表规则 decisionRule
```json
{
  "type":     "decisionRule", // 类型：决策表规则
  "uuid":     "",             // 规则的uuid
  "content":  []              // 决策decision数组
}
```

### decision 决策
```json
{
  "conditions": [], // 满足的条件，judge数组
  "decisions":  []  // 决策的内容，assign / method 数组
}
```

## 规则通用结构
### judge 一般判断
```json
{
  "type":       "judge",  // 类型：判断
  "left":       {},       // 被判断值，可以为object对象或直接指定字符串
  "judgement":  "",       // 判断的方法, 根据left的类型从对应的类型判断库中获取，如数值型则有 == > < >= <= !=等，string类型则有string对应的各种方法
  "right":      {}        // 被判断值，可以为method方法，object对象或直接指定字符串
}
```
### condition 条件
```json
{
  "type":     "condition",  // 类型：条件
  "logic":    "and/or",     // 逻辑：并且/或者，这里的逻辑是指所有直接子元素之间的逻辑关系
  "children": []            // 判断元素，可以为 judge / method(返回值类型为bool) / condition(嵌套多层逻辑) 
}
```
### assign 赋值
```json
{
  "type":   "assign", // 类型：赋值
  "left":   {},       // 赋值左侧对象
  "right":  {}        // 值，可以为method/object或直接指定字符串
}
```
### activity 完整的规则行为(条件-动作)
```json
{
  "condition":  {}, // 满足的条件, null或condition
  "actions":    [], // 行为，method/assign 的数组
}
```

# 数据类型
名称 | 类型说明
:---: | :---:
byte | 字节
short | 短整型
int | 整型
long | 长整型
double | 双精度浮点
float | 单精度浮点
char | 字符
bool | 布尔
string | 字符串
date | 日期

# 类型判断及后缀方法定义
## 数值型，包括byte/short/int/long/double/float
### 判断
符号 | 说明
:---: | :---:
== | 等于
> | 大于
< | 小于
>= | 大于等于
<= | 小于等于
!= | 不等于

### 后缀方法 - 可直接在对象后面添加的方法
符号 | 说明
:---: | :---:
+ | 加
- | 减
* | 乘
/ | 整除
% | 求余

## 字符串，string
### 判断
符号 | 说明
:---: | :---:
== | 等于
!= | 不等于
empty | 为空
notEmpty | 不为空
notNull | 存在
null | 不存在
startsWith | 起始于
notStartsWith | 不起始于
endsWith | 结束于
NotEndsWith | 不结束于
contains | 包含
notContains | 不包含
contained | 存在于
notContained | 不存在于
regex | 符合正则表达式

### 后缀方法
符号 | 说明
:---: | :---:
+ | 拼接




