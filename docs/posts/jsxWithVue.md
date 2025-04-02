---
title: 在Vue中使用JSX
date: 2020-07-18
tags:
 - Vue
---

## 事件 & 按键修饰符
```js
<el-input
    @keyup.native.enter="fetch()"
    class="width-20"
    prefix-icon="el-icon-search"
    placeholder="关键字搜索"
/>

//

<el-input
    class="width-20"
    nativeOn-keyup={arg => arg.keyCode === 13 &&    this.fetch()}
    prefix-icon="el-icon-search"
    placeholder="关键字搜索"
/>
```
## 预置参数
```js
<el-button
    @click="openDialog('create')"                
    type="primary"
    size="mini"
>

//

<el-button
    on-click={this.openDialog.bind(this, 'create')}
    type="primary"
    size="mini"
>
```
## scopedSlots 作用域插槽敲黑板
```js
<el-table-column>
    <template scope-slot="props">
        <el-button
            type="primary"
            size="mini"
            @click="openDialog('edit',props.row)"
            >编辑
        </el-button>
    </template>
</el-table-column>

// 

<el-table-column
    key={index}
    label={item.name}
    width={item.width}
    {...{
        scopedSlots: {
            default: props => {
            return (
            <el-button
                type="primary"
                size="mini"
                on-click={this.openDialog.bind(this,'edit',props.row)}
                >编辑
                )
            }
        }
    }}
/>
```
## scopedSlots 值传递敲黑板
```js
<slot :isAdvancedPanelShow="isAdvancedPanelShow"></slot>

// 

{this.$scopedSlots.default({
    isAdvancedPanelShow: this.isAdvancedPanelShow
})}
```
## 组件使用$attrs和$listeners传递参数
```js
v-bind = '$attrs' => {...{attrs:this.\$attrs}}
v-on = '$listeners' => {...{on:this.\$listeners}}
```
## 组件使用.sync语法糖传递参数时
```js
// template的sync语法糖:
<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>内容</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUnbind">确 定</el-button>
      </span>
</el-dialog>

// template非语法糖
<el-dialog title="提示" 
    :visible="dialogVisible" 
    @update:visible = "val => this.dialogVisible = val"  
    width="30%">
</el-dialog>

// JSX 这么写
<el-dialog title="提示" 
    visible={this.dialogVisible} 
    {...{on:{'update:visible': val => this.dialogVisible = val}}} 
    width="30%">
    <span>内容</span>
    <span slot="footer" class="dialog-footer">
        <el-button onClick={()=>...}>取 消</el-button>
        <el-button type="primary" onClick={xxx函数名}>确 定</el-button>
    </span>
</el-dialog>
```