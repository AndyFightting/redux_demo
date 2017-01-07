import React,{ Component } from 'react';
import {connect} from 'react-redux'

class View extends Component{
      render(){
          return(
              <div>
                  {this.props.num}
                  <button onClick={()=>this.props.onNumClick(3)} >num Tap</button>
                  <button onClick={()=>this.props.onStringClick('hello ~')} >String Tap</button>
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
const mapDispatchToProps =  ({
    onNumClick: numAction,
    onStringClick: stringAction,
});

//mapDispatchToProps 方式2. 用方法
// const mapDispatchToProps = (dispatch,ownProps) => {
//     return {
//         onNumClick: () => {
//             dispatch({
//                 type: 'NUM',
//                 num: 1,
//             });
//         },
//
//         onStringClick: () => {
//             dispatch({
//                 type: 'STRING',
//                 msg: 'hello ~',
//             });
//         },
//     };
// };

const MyView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(View);

export default MyView;

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