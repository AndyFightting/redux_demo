和Flux, Reflux 一样，Redux也是解决数据流程问题。与Reflux最大的区别是Redux有且只有一个完整的state树叫做store。

注意：Reflux中的store概念就相当于Redux中的各个reducer返回的 state, 我把它们都理解为数据Modal。Redux中唯一的store相当于各个state的根节点，可以通过store来获取各state数据。
而Reflux中各个数据是分散的。

知道React和Redux就可以开发了，代码也挺有结构的了，但还不够好，还可以封装一下，所以有[react-redux](https://github.com/reactjs/react-redux)。它的使用主要就两点：Provider 和 connect 。Provider用来封装store的传递，connect用来封装`容器组件`和`视图组件`的关系。推荐[阮老师的博文](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)，清晰易懂。

<image src = 'https://github.com/AndyFightting/redux_demo/blob/master/11.jpeg' width='50%' height = '50%'/>

<image src = 'https://github.com/AndyFightting/redux_demo/blob/master/22.jpeg' width='50%' height = '50%'/>

[图片来源](http://staltz.com/unidirectional-user-interface-architectures.html)


###运行
1. npm install
2. npm start
