---
layout: post
title: How to use jenkins in docker
tags: [jenkins]
summary: Hand notes of how to use jenkins in docker
image:
  feature: jenkins.png
---


#### Prerequirements
* Install [Docker](http://docker.com/)
* Pull [the jenkins docker image](https://store.docker.com/images/d55eda09-d7f0-47b0-8780-3407f2f9142c?tab=description) by run `docker pull jenkins`

#### How to use it?

* Use it with default options

  <!--lang: bash-->
  ```
  docker run -p 8080:8080 -p 50000:50000 jenkins
  ```

* Use it with a local persistent volume

  <!--lang: bash-->
  ```
  docker run -p 8080:8080 -p 50000:50000 -v /your/home:/var/jenkins_home jenkins
  ```


* Use it with a volume containe

  <!--lang: bash-->
  ```
  docker run --name myjenkins -p 8080:8080 -p 50000:50000 -v /var/jenkins_home jenkins
  ```

* Use it with logging by passing JVM parameters

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


#### More info
Please refer to [home page of jenkins docker image](https://store.docker.com/images/d55eda09-d7f0-47b0-8780-3407f2f9142c?tab=description)
