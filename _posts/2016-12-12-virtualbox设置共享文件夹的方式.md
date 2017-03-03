---
layout: post
title: virtualbox设置共享文件夹的方式
tags: [virtualbox]
summary: 介绍怎样共享宿主主机文件夹到virtualbox ubuntu的虚拟机里
image:
  feature: virtualbox-shared-folder.png
---

#### 操作步骤:
* 打开virtualbox的设置弹框选择 *共享文件夹* 的选项卡

   ![virtualbox共享文件夹]({{site.baseurl}}/images/virtualbox-shared-folder.png)

* 点击添加按钮选择想要共享的文件夹，之后取一个名字

* 如果需要的话可以设置成只读和自动挂载的模式

* 点击确认，重启virtualbox

* 进入到刚设置共享文件夹的虚拟机里打开终端执行`sudo mount -t vboxsf <之前选择共享文件夹时取的名字> <虚拟里里挂载共享文件夹的目的路径名字>`

* 如果想开启自动挂载的功能，可以在/etc/fstab文件里添加`<共享文件夹名称> <目的路径> vboxsf rw,gid=100,uid=1000,auto 0 0`

* 如果要卸载，执行`sudo umount -f <路径>`

  *注:* _如果遇到以下错误，说明共享路径不正确，需要确认已正确选择共享目录_

  <!--lang: bash-->
  ```
  /sbin/mount.vboxsf: mounting failed with the error: No such file or directory
  ```
