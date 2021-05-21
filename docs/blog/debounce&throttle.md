---
title: 防抖与节流
date: 2021-05-31
tags:
 - Javascript
description: js中的防抖与节流
---
```js
function debounce (fn, time, immediate) { 
    let timer = null 
    return function () { 
        let args = arguments 
        let context = this 
        if(immediate && !timer) { 
            fn.apply(context, args) 
        } 
        if(timer) clearTimeout(timer) 
        timer = setTimeout(() => { 
            fn.apply(context, args) 
        }, time)
    }
} 

funtion throttle (fn, time, callnow ) { 
    let timer = null 
    let callnow = immediate 
    return function () { 
        let args = arguments 
        let context = this 
        if(callnow && !timer) { 
            fn.apply(context, args) 
            callnow = false 
        } 
        if(!timer) { 
            timer = setTimeout(() => { 
                fn.apply(context, args) 
                timer = null 
            }, time) 
        }  
    }
} 
```