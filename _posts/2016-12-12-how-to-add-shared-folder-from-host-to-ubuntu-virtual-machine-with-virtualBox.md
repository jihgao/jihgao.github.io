---
layout: post
title: How to add shared folder from host to ubuntu virtual machine with virtualbox
tags: [virtualbox]
summary: Instructioon of adding shared folder from host to ubuntu virtual machine with virtualbox
image:
  feature: virtualbox-shared-folder.png
---

### Steps:
* Open the virtualbox setting dialog and choose *shared folders* tab
   <br/>
   <br/>
   ![virtualbox shared folder]({{site.baseurl}}/images/virtualbox-shared-folder.png)

* Click on the add new folder button and choose which folder you are going to using in virtualbox and input a name

* Check the read-only and auto-mount as you need

* Click on submit and reboot the virtualbox

* Open terminal and run the following command

  <!--lang: bash-->
  ```
  #shared_foler is the name you input in the second step
  #shared_destination is where you can see the shared folder
  sudo mount -t vboxsf <shared_foler> <shared_destination>
  ```
  *Note:* If you see the following error, you need create the `shared_destination` folder first

  <!--lang: bash-->
  ```
  /sbin/mount.vboxsf: mounting failed with the error: No such file or directory
  ```

### Note:
* If you want auto-mount, you can append the following command to /etc/fstab

  <!--lang: bash-->
  ```
  # shared_destination is where you can see the shared folder
  gongxiang <shared_destination> vboxsf rw,gid=100,uid=1000,auto 0 0
  ```
* If you want unmount the folder, run the following command:

  <!--lang: bash-->
  ```
  sudo umount -f <shared_destination>
  ```
