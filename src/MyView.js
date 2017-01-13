import React,{ Component } from 'react';
import {connect} from 'react-redux'

class View extends Component{
      render(){
          return(
              <div>
                  {this.props.num}
                  <button onClick={()=>this.props.onNumClick()} >num Tap</button>
                  <button onClick={()=>this.props.onStringClick('hello~')} >String Tap</button>
                  <button onClick={()=>this.props.onAsyncClick()} >异步请求</button>
                  {this.props.array}
              </div>
          );
      }

}

//mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行
//mapStateToProps的第一个参数总是state对象，还可以使用第二个参数ownProps，代表容器组件的props对象
const mapStateToProps = (state) => ({
    num: state.numReducer,
    array: state.stringReducer,
});

//mapDispatchToProps 方式1. 用对象
// const mapDispatchToProps =  ({
//     onNumClick: numAction,
//     onStringClick: stringAction,
// });

// mapDispatchToProps 方式2. 用方法
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onNumClick: () => {
            dispatch(numAction());
        },

        onStringClick: (msg) => {
            dispatch(stringAction(msg));
        },

        onAsyncClick: () => {
            // noThunkRequest(dispatch);  //not use thunk
            dispatch(thunkRequest());    //use thunk
        },
    };
};

//----thunk-------//这个方法是返回一个函数，所以要用thunk模块
const thunkRequest = () => (dispatch,getState) => {
    console.log('thunk 开始-------');
    dispatch(stringAction('thunk 请求成功~'));

    return  fetch('http://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('thunk请求成功-------',responseJson);
            dispatch(stringAction('thunk 请求成功~'));
        })
        .catch((error) => {
            console.error('thunk请求失败-------',error);
            dispatch(stringAction('thunk 请求成功~'));
        });
};


//-------no thunk------
function noThunkRequest(dispatch) {
    console.log('开始-------');
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

const MyView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(View);

export default MyView;

function numAction() {
    return {
        type: 'NUM',
        num: 1,
    }
}

function stringAction(msg) {
    return {
        type: 'STRING',
        msg: msg,
    }
}