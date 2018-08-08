import React from 'react'
import ILi from './index'
import { Input, Button } from 'antd'

interface IState {
  item?: ILi
}

interface IProps {
  save?: (con?: any) => void
}

class Append extends React.Component<IProps, IState> {
  myRef
  constructor(props: IProps, state: IState) {
    super(props)
    this.myRef = React.createRef()
    this.clickFn = this.clickFn.bind(this)
  }
  clickFn() {
    const val = this.myRef.current.input.value
    if (this.props.save) {
      this.props.save(val)
      this.myRef.current.input.value = ''
    }
  }
  render() {
    return (
      <div style={{clear: 'both'}}>
        <label style={{float: 'left'}}>请输入：</label>
        <Input style={{float: 'left', width: '150px'}} ref={this.myRef}/>
        <Button style={{float: 'left'}} onClick={this.clickFn}>保存</Button>
      </div>
    )
  }
}

export default Append