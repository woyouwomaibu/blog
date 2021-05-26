---
title: 深拷贝
date: 2021-05-25
tags:
 - Javascript
description: 深拷贝的简单实现以及进阶
---
## JS的数据类型

* 基本类型（undefined、null、string、number、boolean、symbol（ES6））
* 引用类型（Object、Array、RegExp、Date、Function）

## 深浅拷贝定义
### 浅拷贝
创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
### 深拷贝
将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。
## 代码实现
### 一行代码
``` js
JSON.parse(JSON.stringify())
```
### 基础版
target考虑数组和对象
``` js
deepClone(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {}
        for (const key in target) {
            cloneTarget[key] = clone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}
```
### 对象中有循环引用
``` js
function deepClone(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {}
        if (map.get(target)) {
            return target
        }
        map.set(target, cloneTarget)
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map)
        }
        return cloneTarget
    } else {
        return target
    }
}
```
## 进阶文章
* <https://www.jianshu.com/p/785192745c10>
* <https://cloud.tencent.com/developer/article/1497418>