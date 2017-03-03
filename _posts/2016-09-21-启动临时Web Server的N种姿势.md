---
layout: post
title: 启动临时Web Server的N种姿势
tags: [linux]
summary: 出于各种需求，有时需要启动webServer，但是Apache的搭建可能又太过麻烦，总结了一些方便的方式，要你随意的启动一个Web Server
image:
  feature: binary.jpg
---

#### NodeJs的方式
如果系统安装了NodeJs可以安装http-server, 之后就可以直接在需要启动Web Server的目录里执行`http-server -p 8001`

#### Python2的版本
如果在用*nix系统，一般都默认安装了Python, 直接执行`python -m SimpleHTTPServer 3000`就可以临时在3000端口上启动一个 Web Server

#### Python3的版本
如果系统安装了Python3，则可执行`python3 -m http.server 3000`也可以临时在3000端口上启动一个 Web Server
