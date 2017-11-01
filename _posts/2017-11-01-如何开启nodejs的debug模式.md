---
layout: post
title: 如何开启nodeJs的debug模式
tags: [JavaScript]
summary: 开启nodeJs的debug模式
---


## 开启调试模式

- 第一种方式： 使用`--inspect`选项，开启调试模式

- 第二种方式: 在不使用`--inspect`选项的情况下，可以发送`SIGUSR1`启动调试模式


## 工具

### [node-inspect](https://github.com/nodejs/node-inspect)

- 安装: `npm install -g node-inspect`

- 启动: `node-inspect myscript.js`


### [Chrome DevTools 55+](https://github.com/ChromeDevTools/devtools-frontend)

- 第一种：在chrome浏览器中打开`chrome://inspect`页面，设置Node.js调试地址

- 第二种: 安装拓展插件NIM (Node Inspector Manager) [https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj](https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj)


## 命令行选项

选项| 备注
---|---
--inspect | 启动调试模式并监听9229端口
--inspect=port | 启动调试模式并监听指定端口
--inspect-brk | 启动调试模式并监听9229端口且在代码执行前暂停
--inspect-brk=port | 启动调试模式并监听指定端口且在代码执行前暂停
node inspect script.js | 在带有--inspect选项的子进程里运行用户脚本，主进程中运行命令行调试器
