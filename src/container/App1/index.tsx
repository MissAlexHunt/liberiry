import * as React from 'react'
import { Input, Button} from 'antd'

interface IProps {
  test?: any
}

interface IState {
  content?: string
}

class App1 extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      content : ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.alertFn = this.alertFn.bind(this)
  }
  handleInput(evt) {
    if (evt.target.value) {
      this.setState({
        content: evt.target.value
      })
    }
  }
  alertFn(evt) {
    alert('test')
  }
  // componentWillMount(){

  // }
  // componentDidMount(){

  // }
  // componentWillReceiveProps(nextProp: IProps){
  //   if (nextProp.test !== this.props.test){

  //   }
  // }
  // componentWillUnmount(){

  // }
  render () {
    return(
      <div>
        <Input onChange= {this.handleInput}/>
        <span>{this.state.content}</span>
        <Button onClick= {this.alertFn}>弹出按钮</Button>
      </div>
    )
  }
}
export default App1