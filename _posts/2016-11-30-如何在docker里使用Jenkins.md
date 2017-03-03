---
layout: post
title: 如何在docker里使用Jenkins
tags: [jenkins]
summary: 记录以下在docker里使用Jenkins的方式
image:
  feature: jenkins.png
---


#### 前提
* 安装[Docker](http://docker.com/)
* 执行`docker pull jenkins`获取[Jenkins的docker镜像](https://store.docker.com/images/d55eda09-d7f0-47b0-8780-3407f2f9142c?tab=description)

#### 使用方式

* 使用默认配置

  <!--lang: bash-->
  ```
  docker run -p 8080:8080 -p 50000:50000 jenkins
  ```

* 映射本地目录

  <!--lang: bash-->
  ```
  docker run -p 8080:8080 -p 50000:50000 -v /your/home:/var/jenkins_home jenkins
  ```


* 启动时选择存储container

  <!--lang: bash-->
  ```
  docker run --name myjenkins -p 8080:8080 -p 50000:50000 -v /var/jenkins_home jenkins
  ```

* 启动时通过传递JVM选项开启日志

  <!--lang: bash-->
  ```
  mkdir data
  cat > data/log.properties <<EOF
  handlers=java.util.logging.ConsoleHandler
  jenkins.level=FINEST
  java.util.logging.ConsoleHandler.level=FINEST
  EOF
  docker run --name myjenkins -p 8080:8080 -p 50000:50000 --env JAVA_OPTS="-Djava.util.logging.config.file=/var/jenkins_home/log.properties" -v `pwd`/data:/var/jenkins_home jenkins
  ```


更多信息[点击链接](https://store.docker.com/images/d55eda09-d7f0-47b0-8780-3407f2f9142c?tab=description)
