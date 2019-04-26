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

## 暂不支持的类型 - 直接文本显示
```json
{
  "uuid":     "uuid",       // uuid
  "type":     "unsupport",  // 类型：不支持
  "text":     ""            // 显示的字符串
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
  "text":     "",         // 树结构内容字符串
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
  "head":     {
    "conditions": [],         // 表头条件
    "decisions": []           // 表头决策
  },                          // 表头信息
  "content":  []              // 决策decision数组
}
```

### decision 决策
```json
{
  "uuid": "",
  "conditions": [], // 满足的条件，condition数组
  "decisions":  []  // 决策的内容，assign / method 数组
}
```

## 规则通用结构

### 字符串类型（直接输入）
```json
{
  "type": "string",
  "text": ""
}
```

### judge 一般判断
```json
{
  "uuid":       "",
  "type":       "judge",  // 类型：判断
  "left":       {},       // 被判断值，可以为object对象或直接指定字符串, 只需要type和uuid
  "judgement":  "",       // 判断的方法, 根据left的类型从对应的类型判断库中获取，如数值型则有 == > < >= <= !=等，string类型则有string对应的各种方法
  "right":      []        // 被判断值，可以为method方法，object对象，链接符号或直接指定字符串, obj只需要type和uuid
}
```
### condition 条件
```json
{
  "uuid":     "",
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
  "right":  []       // 值，可以为method/object/链接符号或直接指定字符串数组
}
```
### activity 完整的规则行为(条件-动作)
```json
{
  "condition":  {}, // 满足的条件, null或condition
  "actions":    [], // 行为，method/assign 的数组
}
```

# 规则对象类型列表
名称 | 说明
:---: | :---:
object | 单个对象
method | 方法
sheet | 内存表
treenode | 树结构节点
basicRule | 一般规则
decisionRule | 决策表规则
string | 可直接输入的字符串
judge | 一个逻辑判断
condition | 一个多个逻辑判断的组合（通过and|or的关系）
assign | 赋值
symbol | 链接符号

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

### 连接符 - 可直接在对象之间添加
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

- 部分判断符号是不需要右侧数据的

### 连接符
符号 | 说明
:---: | :---:
+ | 拼接




