# React Native Demo

## 根据官网搭建所需环境
[官网](http://reactnative.cn/docs/0.30/getting-started.html)

## 安装/启动
安装依赖
```
$ cd react-native-demo
$ npm install
```
android调试
启动android studio，打开一个虚拟机，或者通过数据线链接真机
```
$ sudo react-native start
$ react-native run-android
```
真机摇一摇可以打开`开发者菜单`，虚拟机`ctrl+m`可以打开`开发者菜单`，可以reload，或者开启远程调试，热刷新，热重装等功能。

## 项目结构（部分）
```
    src
    ├── actions
    │   
    ├── components
    │   
    ├── configs
    │   
    ├── constants
    │   ├── ActionTypes.js
    ├── images
    │   
    ├── index.js
    ├── layouts
    │   
    ├── reducers
    │   
    ├── services
    │   
    ├── store
    │   
    └── utils

```

## 注意

- 在虚拟机中开启远程调试，app非常卡
- 如果开了win7虚拟机，再使用android studio打开android虚拟机会报错。同样，打开了android虚拟机，再开win7虚拟机也报错

## 要研究的内容
- redux结构，项目是如何组织的，项目结构，services等 
- 页面切换，路由，多tab页面等
- 单元测试
- 通用组件整理，有那些常用组件（tab，button等）及demo（线上或自己整理的）

## 问题
- react-native-code-push 这个模块是干嘛的？
