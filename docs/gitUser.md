---
title: git多用户配置
date: 2020-03-13
tags:
 - Git
description: 开发时遇到需要多个git账号配置，例如是github和gitlab之类的，不同的用户连接不同的仓库。那么要如何去配置呢？
---

## 遇到的情形
在公司开发时遇到需要多个git账号配置，例如是github和gitlab之类的，不同的用户连接不同的仓库
|         | github    | gitlab  |
| ------- |:---------:| :------:|
| user    | a         | b       |
| email   | a@xx.com  |b@xx.com |
## 如何解决
### 1.首先CD到.ssh目录下生成不同的sshkey 
``` bash
ssh-keygen -t rsa -C "changeme@xxx.com" -f filename
#filename是生成文件的名称,例如可以填写id_ras_github,不加-f filename则会覆盖默认的id_rsa文件
```
绑定公钥常规步骤就略过了

### 2.配置config文件
在.ssh下创建config文件
``` bash
# Linux/Mac
touch config
# Windows，NUL大小写不敏感
type nul > config
```
config内如何配置呢
```
Host github.com
HostName github.com
User a
IdentityFile ~/.ssh/id_rsa_github

Host gitlab.mygitlab.com
HostName gitlab.mygitlab.com
User b
IdentityFile ~/.ssh/id_rsa_gitlab
```
+ Host：仓库网站的别名 ，可以替代 HostName 来使用的别名，比如clone github 上某个仓库,之前的命令为
``` bash
git clone git@github.com:a/xxx.git
```
用Host设置为github后就变成
``` bash
git clone git@github:a/xxx.git
```
为了方便使用还是直接设置成一样比较好
+ HostName：设置域名地址或ip地址
+ User：仓库网站上的用户名  
+ IdentityFile：输入id_rsa_xxx的目录地址 

### 3.查看是否配置成功
``` bash
ssh -T git@gitlab
ssh -T git@github
```
### 4.切换用户
上一步都成功后，配置就已经基本成功了
可以配置全局默认的用户
``` bash
git config --global user.name a
git config --global user.email a@xx.com
```
然后切换用户的话，在本地仓库根目录下配置
``` bash
git config --local user.name b
git config --local user.email b@xx.com
```
设置好之后可以通过
``` bash
git config --local --list
```
查看本地仓库的配置信息，此时提交就是你刚才所配置的用户了

## 最后
git官网config文档那么一大串真的看得头痛，这是我查阅些许网站后总结的，希望能有所帮助。