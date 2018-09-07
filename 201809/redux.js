function createStore(reducer) {
  let state
  let listeners = []
  const subscribe = listener => listeners.push(listener)
  const getStore = () => store
  //生成更新数据
  const dispatch = (action) => {
    
    
    // state = stateChanger(state, action)
    // 纯函数 reducer
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }
  //初始化state
  dispatch({})
  return { getStore, dispatch, subscribe}
}

let appState = {
  title:  {text: 'a', color: 'red'}
}

const reducer = (state, action) => {
  if (!state) {
    return {
      title:  {text: 'a', color: 'red'}
    }
  }
  switch(action.type) {
    case 'UPDATE_TEXT':
      return {
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    default: return state 
  }
}
// function reducer(state, action) {
//   // 初始化state和swtich case
// }
// // 生成store
// const store = createStore(reducer)
// // 监听store发生改变
// store.subscribe(() => renderApp(store.getState()))
// // 首次渲染
// renderApp(store.getState())
// // 后面随意dispatch 修改数据
// store.dispatch(...)

// context getChildContext 设置context

//connect
// mapStateToProps 告知connect如何去store取数据
// mapDispatchToProps 告知connect如何去获取整合状态
const connect = (mapStateToProps,mapDispatchToProps) => (wrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropsTypes.object
    }
    constructor() {
      this.state = {allprops: {}}
      super()
    }
    componentWillMount () {
      const {store} = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }
    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.this.props) :{}
      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.this.props) :{}
      this.setState({
        allprops: {
          ...stateProps,
          ...dispatchProps,
          ...this.prosp
        }
      })
    }
    render () {
      return <wrappedComponent {...this.state.allprops}/>
    }
  }
  return Connect
}

const mapStateToProps = (state) => {
  return {
    color: state.color
  }
}
header = connect(mapStateToProps)(header)


// provider 取代context
// provider 将子组件渲染出来 将传入的props.store 放到context上
class Provider extends Component {
  static propTypes = {
    children: PropsTypes.any,
    store: PropsTypes.object
  }
  static childContextType = {
    store: PropTypes.object
  }
  getChildContext() {
    return {store: this.props.store}
  }
  render () {
    return <div>{this.props.children}</div>
  }
}
React.Render(
  <Provider store={store}>
    <Index/>
  </Provider>,
  document.getElementById('root')
)

