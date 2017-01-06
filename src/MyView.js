import React,{ Component } from 'react';
import { createStore,combineReducers } from 'redux'

// 生成新对象
 // Object.assign({}, state, { action });
 //  { ...state, ...action };

function numReducer(state = 0, action) {
    switch (action.type) {
        case 'NUM':
           return state + action.num;
        default:
            return state
    }
}

function stringReducer(state = [], action) {
    switch (action.type) {
        case 'STRING':
            return state.concat([action.msg]);
        default:
            return state
    }
}

// 集合多个reducer用于初始化store,这里只有一个numReducer
const rootReducer = combineReducers({
    numReducer, //相当于一个同名的 key：value, 通过 store.getState().numReducer 获取对应的state
    stringReducer,
});

let store = createStore(rootReducer);
var unsubscribe;

export default class MyView extends Component{

      constructor(props) {
        super(props);
        this.state = {
            num: store.getState().numReducer,//获取numReducer对应的state
            array: store.getState().stringReducer,
        };
      }

    componentWillMount() {
        //注册监听
        unsubscribe =  store.subscribe(this.numChanged.bind(this));
    }

    componentWillUnMount() {
        //取消监听
        unsubscribe();
    }

    numChanged(){
          this.setState({
              num: store.getState().numReducer,//获取numReducer对应的state
              array: store.getState().stringReducer,
          });
      }

      render(){
          return(
              <div>
                  {this.state.num}
                  <button onClick={this.numTaped.bind(this)} >num Tap</button>
                  <button onClick={this.stringTaped.bind(this)} >String Tap</button>
                  {this.state.array}

              </div>
          );
      }

    numTaped(){
        store.dispatch(numAction(2))
      }

    stringTaped(){
        store.dispatch(stringAction('hello ~'))
    }
}

function numAction(num) {
    return {
        type: 'NUM',
        num: num,
    }
}

function stringAction(msg) {
    return {
        type: 'STRING',
        msg: msg,
    }
}
