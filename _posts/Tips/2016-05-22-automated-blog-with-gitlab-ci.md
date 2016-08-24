---
layout: post
title: 使用 GitLab CI 自动部署博客到 GitHub Pages
category: Tips
tags: ["GitLab", "Jekyll"]
notebook: Posts
image: /images/201605/gitlab.png
audio:
video:
description: 配置 GitLab Pages 所用到的 .gitlab-ci.yml 文件，让 GitLab 中生成的静态文件自动部署到 GitHub 上，再也不用两个仓库倒腾了。
toc: false
---

由于一些莫名其妙的原因，我用 GitHub Pages 的 Jekyll 版本不能在本地生成 _posts 的静态文件，自然放到 GitHub 上也不行。一直没弄清楚原因，😳 求知情人士解答。于是找了备用方案，用起了 [GitLab Pages](http://docs.gitlab.com/ee/pages/README.html)，但是访问速度上又没有 GitHub Pages 给力，又不想用其他 CDN，所以还是两头托管，还能让百度索引。

其实 GitLab Pages 是基于 GitLab CI，我们最终看到的网站是借由所配置的 [Runner](http://doc.gitlab.com/ee/ci/quick_start/README.html#configuring-a-runner) 生成的，所以可以用各种 Jekyll 插件，还能自定所使用的 Jekyll 版本。搭建起来和 GitHub Pages 差不多，可以参看官方博客 [Hosting on GitLab.com with GitLab Pages](https://about.gitlab.com/2016/04/07/gitlab-pages-setup/) 设置就行。

为了省事，还可以进一步配置 GitLab Pages 所用到的 `.gitlab-ci.yml` 文件，让 GitLab 中生成的静态文件自动部署到 GitHub 上，再也不用两个仓库倒腾了。

首先，需要在 GitHub 中生成一个 `Personal access tokens`，注意生成后自己拷贝下来，因为你以后在 GitHub 上不会再见到这个 token 了。

![GitHub access token](/images/201605/github-settings.png)

然后就是配置 GitLab 的 `.gitlab-ci.yml` 文件，比如说我的：

```yaml
# requiring the environment of Ruby 2.x
image: ruby:2.2

# add bundle cache to 'vendor' for speeding up builds
cache:
  paths: 
    - vendor/

before_script:
  - bundle install --path vendor

pages:
  stage: deploy
  script:
  - git clone https://<your_github_token>@github.com/<your_github_repo.git> public
  - bundle exec jekyll build -d public/
  - cd ./public
  - git config user.name "Frank Lin"
  - git config user.email "franklin@flinhong.com"
  - git config --global push.default simple
  - git add .
  - git commit -m "Update site"
  - git push --set-upstream "<your_github_token>@github.com/<your_github_repo.git>"
  artifacts:
    paths:
    - public
  only:
  - master
```

把上面的 `<your_github_token>` 和 `<your_github_repo.git>` 换成你自己的就好了（不用`<>`）。GitLab Pages 使用 `public` 文件夹展示生成的内容，所以要在 GitLab 上托管博客，就不要改这个文件夹了。

然后就可以继续开开心心的弄博客啦，只需要把 Jekyll 文件推送到 GitLab 上，就能看到 GitHub 用生成的静态文件给你展示博客内容啦。当然，也可以用同样的方法推送到 Coding.net 上，我就这么做了，这下一次 push，几处都有了，也不用那么麻烦设置我现在还没懂的 Webhooks 了。

当然，GitLab 提供免费的私人仓库，所以你不想共享博客源文件也可以用这种方法。PS，GitLab Pages 支持自定义域名使用 `https` ，👍。
