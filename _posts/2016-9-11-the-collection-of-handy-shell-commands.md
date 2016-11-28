---
layout: post
title: The collection of handy shell commands
tags: [linux]
summary: collection of some shell commands i used to use during working
image:
  feature: bash.png
---
* Find  which port is used by the process which PID is <PID_number>
  <!--lang: bash-->
  ```
  netstat -ano | grep <PID_number>
  ```

* Find which process is using 3000 port

  <!--lang: bash-->
  ```
  lsof -i tcp:port
  ```
* Show your local ip address

  <!--lang: bash-->
  ```
  ifconfig | awk '{print $1,$2}' | grep 'inet' | awk '{print $2}' | grep -oE "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b"
  ```
* Solved the problem that XAMPP can not be started

  <!--lang: bash-->
  ```
  sudo ln -s /Applications/XAMPP/xamppfiles/var/mysql/mysql.sock /tmp/mysql.sock
  ```
* Delete all of the node_modules directories under the current directory

  <!--lang: bash-->
  ```
  find . -type d -name node_modules -exec rm -rf {} \;
  ```
* Show the sizing of files under the current directory

  <!--lang: bash-->
  ```
  du -l -d 1 | sort -n -r -t $'\t' -k 1
  ```
* Generate ssh-keygen

  <!--lang: bash-->
  ```
  cd $HOME && ssh-keygen -t rsa -C "输入你的邮箱地址"
  ```
* Install rvm if you met some problems with gem install

  <!--lang: bash-->
  ```
  gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
  curl -fsSL  --insecure https://get.rvm.io | bash -s stable --ruby
  ```
* If you find some problems  with using some software on your Mac OS, try to execute `xcode-select --install` to update your xcode

* Copy the standard output to clipboard

  <!--lang: bash-->
  ```
  ipconfig ｜ clip
  ```
* Show the list of command history

  <!--lang: bash-->
  ```
  doskey /history
  ```
* Change the owner of files or directories

  <!--lang: bash-->
  ```
  sudo chown -R $USER /usr/local
  ```
* Find the passwords which are stored on your Mac OS

  <!--lang: bash-->
  ```
  security find generic password -wa p yourusername
  ```
* Parsing the options which are passed to the shell command

  <!--lang: bash-->
  ```
  #!/bin/bash
  while true;do
      if [[ $1 ]]; then
          echo $1;
          shift;
      else
          break;
      fi
  done;
  ```
* 查看端口是否被占用

  <!--lang: bash-->
  ```
  sudo lsof -n -P| grep :35729
  ```
* Executing the task and put it in the background

  <!--lang: bash-->
  ```
  nohup ./web.sh > /dev/null 2>&1 &
  ```
* Solve the problem that the wireshark can not find any interfaces on Mac OS

  <!--lang: bash-->
  ```
  sudo chmod 644 /dev/bpf*
  ```
* Clone a website

  <!--lang: bash-->
  ```
  wget —mirror  -p –convert-links -P ./LOCAL URL
  ```
  <!-- * `ps -ef |grep data | awk ‘{print $2,$8}’` -->

* Minitoring the network data which source ip is 192.168.11.123 and dest ip not is 192.168.11.145

  <!--lang: bash-->
  ```
  sudo tcpdump -n -i en0 src 192.168.11.123 and dst not 192.168.11.145
  ```

* Show all of the TCP connections

  <!--lang: bash-->
  ```
  netstat -Aan -f inet -p tcp
  ```
