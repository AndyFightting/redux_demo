###[Reflux](http://cn.redux.js.org/)

和Flux, Reflux 一样，Redux也是解决数据流程问题。与Reflux最大的区别是Redux有且只有一个完整的state树叫做store。

注意：Reflux中的store概念就相当于Redux中的各个reducer返回的 state, 我把它们都理解为数据Modal。Redux中唯一的store相当于各个state的根节点，可以通过store来获取各state数据。
而Reflux中各个数据是分散的。

知道React和Redux就可以开发了，代码也挺有结构的了，但还不够好，还可以封装一下，所以有[react-redux](https://github.com/reactjs/react-redux)。它的使用主要就两点：Provider 和 connect 。Provider用来封装store的传递。connect用来封装`容器组件`和`视图组件`的关系，主要就两点：把视图组件要用的数据从容器组件传进去，把视图组件要操作的Action事件传出来给容器组件。

```
ReactDOM.render(
    <Provider store={store}>
        <MyView />
    </Provider>,
  document.getElementById('root')
);
```
```
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const ViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)
```
View是视图组件，通过connect方法得到容器组件ViewContainer，然后绑定两者关系：传入prop数据和传出action事件。

推荐[阮老师的博文](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)，清晰易懂。

###thunk 中间件

```
 onAsyncClick: () => {
            // noThunkRequest(dispatch);  //not use thunk
            dispatch(thunkRequest());    //use thunk
        },
        
//----thunk-------//这个方法是返回一个函数，所以要用thunk模块
const thunkRequest = () => (dispatch,getState) => {
    console.log('thunk 开始-------');
    return  fetch('http://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('thunk请求成功-------',responseJson);
            dispatch(numAction());
        })
        .catch((error) => {
            console.error('thunk请求失败-------',error);
        });
};

//-------no thunk------
function noThunkRequest(dispatch) {
    dispatch(stringAction('请求开始~'));
    fetch('http://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('请求成功-------',responseJson);
            dispatch(stringAction('请求成功~'));
        })
        .catch((error) => {
            dispatch(stringAction('请求失败~'));
            console.error('请求失败-------',error);
        });
}

function stringAction(msg) {
    return {
        type: 'STRING',
        msg: msg,
    }
}
```

<image src = 'https://github.com/AndyFightting/redux_demo/blob/master/11.jpeg' width='50%' height = '50%'/>

<image src = 'https://github.com/AndyFightting/redux_demo/blob/master/22.jpeg' width='50%' height = '50%'/>

[图片来源](http://staltz.com/unidirectional-user-interface-architectures.html)


###运行
1. npm install
2. npm start

<image src = 'https://github.com/AndyFightting/redux_demo/blob/master/image4.png' width='70%' height = '70%'/>

###[Vuex](http://vuex.vuejs.org/zh-cn/getting-started.html)

<image src = 'https://github.com/AndyFightting/redux_demo/blob/master/vuex.png' width='60%' height = '60%'/>

Vuex 和 Redux 很像，流程几乎一样只是叫法不一样。下面包括了Vuex的基本使用，当然在开发的时候应该把不同模块写在对应的文件中。

```
<template>
  <div id="app">
   state:  {{myNum}}
    <button @click="addTaped(2)">增加</button>
    <button @click="delTaped()">减少</button>
    <button @click="stringTap('hello~')">String</button>
    {{myString}}

    <div>
      getters:  {{$store.getters.nunGetter}} {{myNumGetter}}
    </div>

    <div>
      mapState: {{myNumMap}}   {{myStringMap}}
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Vuex,{mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import createLogger from 'vuex/dist/logger'
  Vue.use(Vuex);

  const moduleNum = {
    state:{
      num: 0,
    },

    //相当于store的 computed 计算型方法,通过 store.getters.xxx 获取
    getters:{
        nunGetter(state,getters,rootState){
          return state.num + 10;
        },
    },

    actions:{
      numAddAction(context,dic){
          //方式1：
//         context.commit('numAddMutation',{tag: dic.tag});

          //方式2：
          context.commit({
              type: 'numAddMutation', //type: 对应 mutation里的方法名
               tag: dic.tag,
          });
      },

      numDelAction(context){
         setTimeout(()=>{
           context.commit({
             type: 'numDelMutation',
           })
         },1000);
      },
    },

    mutations:{
      numAddMutation(state,dic){
         state.num += dic.tag;
      },

      numDelMutation(state){
          state.num --;
      },
    },
  };

  const moduleString = {
      state:{
         str: [],
      },

    actions:{
       stringAddAction(context, dic){
           context.commit({
              type: 'stringAddMutation',
              str: dic.str,
           });
       }
    },

    mutations:{
       stringAddMutation(state, dic){
           state.str.unshift(dic.str);
       }
    },

  };

  const myPlugin = store => {
    store.subscribe((mutation, state) => {
      // 每次 mutation 之后调用
      // mutation 的格式为 { type, payload }
      console.log('myPlugin-----:');
      console.log(mutation);
    })
  };

  const store = new Vuex.Store({
     strict: process.env.NODE_ENV !== 'production',

      //通过 store.state.numModule.xxx 获取对应的属性值
      modules:{
        numModule: moduleNum,
        stringModule: moduleString,
      },

      //使用插件
      plugins:[myPlugin,createLogger({collapsed: false})],
  });

  export default{
    store, //在根节点注入的话所有组件自动获得store

    computed:{
      myNum(){
        return store.state.numModule.num;
      },

      myString(){
         return store.state.stringModule.str;
      },

     //mapState1: mapState 展开, mapState有啥好处，我好像没get到...
      ...mapState({
        myNumMap(state){
           return state.numModule.num;
      },
         myStringMap(state){
           return state.stringModule.str;
         },
       }),

      //mapGetters: 获取getters
      ...mapGetters({
          myNumGetter: 'nunGetter', //即store.getters.nunGetter
      }),
    },

    methods:{
       addTaped(n){
          //使用方式1
         //store.dispatch('numAddAction',{tag: n});

           //使用方式2
          //通过 dispatch 发送一个 action对象，整个对象都作为载荷传给 mutation 函数
          store.dispatch({
             type: 'numAddAction', // type：对应action里的方法名
             tag: n,               // 额外传入的参数，
          });
       },

      delTaped(){
          store.dispatch({
              type: 'numDelAction'
          });
       },

      stringTap(str){
          store.dispatch({
             type: 'stringAddAction',
             str: str,
          });
      },

//      ...mapActions({
//        delTaped: 'numDelAction'
//      }),

//      ...mapMutations({
//        delTaped: 'numDelMutation'
//      }),

    },
  }
</script>

```

### 疑问

Vuex 使用 mapActions 或者 mapMutations 时如何传参？可能很多新人会有这样的疑惑。下面以mapActions为例，mapMutations也是一样的。

```
methods:{
  ...mapActions({
      addTaped: 'addAction', 
  })
}
```
```
actions:{
 addAction(context,param){ //外面传进来的参数就是param
 
 }
}
```

然后直接调用方法传参就可以了，如传对象 `addTaped({name:'andy'})`,传数字 `addTaped(100)`.然后就可以在对应的 addAction  里的 param 获取了。新手的疑惑主要在 ` addTaped: 'addAction',` 以为要` addTaped: {'addAction',xxx},`之类的处理。其实不用，mapActions 只是把方法名对应上，然后在方法调用的时候直接传参就可以了！
