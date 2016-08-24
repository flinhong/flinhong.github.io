---
layout: post
title: Hello World! - Again
category: Learning
tags: ["C#"]
notebook: Posts
image: /images/201605/csharp.jpg
audio:
video:
description: 没想到学一门语言都跳票多次，真是惭愧惭愧！这次是真的下定决心好好学习一下 C# 了，我就不信我坚持不下去。
toc: false
---

没想到学一门语言都跳票多次，真是惭愧惭愧！这次是真的下定决心好好学习一下 C# 了，我就不信我坚持不下去。

这个进度我就不敢保证了，毕竟平时要忙实验，尽量抽空学吧。这里也做下学习笔记，督促督促自己。

这次参考书籍是 [Microsoft Visual C# 2013](https://www.microsoftpressstore.com/store/microsoft-visual-c-sharp-2013-step-by-step-9780735681835)，同时参考 [Microsoft's DEV204x](https://courses.edx.org/courses/course-v1:Microsoft+DEV204x+2T2016/info) 课程，就由这里起步吧。

虽说 `Hello World!` 见了不知多少次了，但是这么具有标志性，我也来段纪念纪念。

```c#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestHello
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            Console.WriteLine("Just do it, Frank!");
            Console.ReadKey();
        }
    }
}
```
