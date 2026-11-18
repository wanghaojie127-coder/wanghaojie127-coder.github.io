# 王豪杰 Jerry · 个人网站

纯静态网站，无需安装任何依赖。

## 改内容
所有文字都在 `content.js`，用任意文本编辑器打开，只改引号里的文字。
以「待补充」开头的内容在网页上会显示为灰色虚线，写好后直接替换掉即可。
简历：把 PDF 放到 `resume.pdf`，然后把 content.js 里 `resume.href` 改成 `"resume.pdf"`。

## 本地预览
直接双击 `index.html` 即可。

## 发布
本仓库已开启 GitHub Pages：改完内容后 `git add -A && git commit -m "更新内容" && git push`，约 1 分钟后线上自动更新。
