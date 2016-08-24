---
layout: post
title: Fix Time Difference Between Dual Boot Windows and Ubuntu
category: Tips
tags: ["Windows", "Ubuntu"]
notebook: Posts
image: /images/201607/dual-boot.jpg
audio:
video:
description: If you dual boot and there are time conflicts between Windows and Ubuntu, this occurs because Ubuntu store the time on the hardware clock as UTC by default while Microsoft Windows stores the time as local time, thus causing conflicting times between Ubuntu and Windows. The fix is pretty easy and it can be applied from both Ubuntu and Windows.
toc: true
---

This post is a quick tip for users who dual boot Ubuntu and Windows: if the time is off on your computer when you reboot and switch between Ubuntu and Windows, here's how to fix it.[^1]

If you dual boot and there are time conflicts between Windows and Ubuntu, this occurs because Ubuntu store the time on the hardware clock as UTC by default while Microsoft Windows stores the time as local time, thus causing conflicting times between Ubuntu and Windows. The fix is pretty easy and it can be applied from both Ubuntu and Windows.

## Fix time differences between Ubuntu and Windows

A. **To fix the UTC / local time difference between Ubuntu and Windows from Ubuntu** by making Ubuntu use local time.

Before proceeding, note that according to the Ubuntu wiki, "the advantage of having the hardware clock as UTC is that you don't need to change the hardware clock when moving between timezones or when Daylight Savings Time (DST) begins or ends as UTC does not have DST or timezone offsets". So this is not recommended and if you can, you should use method B., and fix this from Windows.

**For Ubuntu 16.04 and newer**, run the following command:

```bash
$ timedatectl set-local-rtc 1
```

You can then check if Ubuntu uses local time, you can then use the following command:

```bash
$ timedatectl
```

Which should display the following "RTC in local TZ: yes". A warning will also be displayed. Here's the full command output:

```bash
$ timedatectl
      Local time: Lu 2016-07-06 12:18:22 EEST
  Universal time: Lu 2016-07-06 09:18:22 UTC
        RTC time: Lu 2016-07-06 12:18:22
       Time zone: Europe/Bucharest (EEST, +0300)
 Network time on: yes
NTP synchronized: no
 RTC in local TZ: yes

Warning: The system is configured to read the RTC time in the local time zone.
         This mode can not be fully supported. It will create various problems
         with time zone changes and daylight saving time adjustments. The RTC
         time is never updated, it relies on external facilities to maintain it.
         If at all possible, use RTC in UTC by calling
         'timedatectl set-local-rtc 0'.
```

**For Ubuntu versions older than 16.04**: you must edit the /etc/default/rcS file and replace "UTC=yes" with "UTC=no" (both without the quotes). To do this automatically, simply copy/paste the following command in a terminal:

```bash
$ sudo sed -i 's/UTC=yes/UTC=no/' /etc/default/rcS
```

And then reboot.

B. **To fix this from Windows** (it should work with Vista SP2, Windows 7, Server 2008 R2 and Windows 8/8.1), by making it use UTC instead of local time, download [THIS](/assets/WindowsTimeFixUTC.reg) Windows registry file and simply double click it.[^2]

Then, to disable the Windows Time service (which still writes local time to RTC regardless of the registry setting above, on shutdown), run Command Prompt as Administrator and paste this command:

```bash
$ sc config w32time start= disabled
```

And reboot.

## How to revert the changes

A. **From Ubuntu**: reverting this change from Ubuntu is pretty easy.

**Ubuntu 16.04 and newer**: to revert the changes, simply run the following command:

```bash
$ timedatectl set-local-rtc 0
```

**Ubuntu versions older than 16.04**: all you have to do is replace "UTC=no" with "UTC=yes" in the /etc/default/rcS file. To do this automatically, copy/paste the command below in a terminal:

```bash
sudo sed -i 's/UTC=no/UTC=yes/' /etc/default/rcS
```

And then reboot your computer.

B. **From Windows**: reverting this change is a bit more complicated from Windows.

Firstly, open the `.reg` file downloaded when applying the fix for Windows (see download link above) with a text editor and change the "RealTimeIsUniversal" value from "dword:00000001" to "-" (without the quotes). Here's how the file should look like after making this change:

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation]
"RealTimeIsUniversal"=-
```

Then save the file and double click it.

Next, run the following command in Command Prompt (which you need to run as Administrator) to re-enable the Windows Time service:

```bash
$ sc config w32time start= demand
```

And finally, reboot.

Refs:

[^1]: [DUAL BOOT: FIX TIME DIFFERENCES BETWEEN UBUNTU AND WINDOWS](http://www.webupd8.org/2014/09/dual-boot-fix-time-differences-between.html)

[^2]: [Multiple Boot Systems Time Conflicts](https://help.ubuntu.com/community/UbuntuTime#Multiple_Boot_Systems_Time_Conflicts)