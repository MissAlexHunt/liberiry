import React from 'react'
import {Checkbox, Button} from 'antd'

interface IState {
  isChecked: boolean
}

interface IProps {
  listItem?: any,
  delete?: (key: string) => void
}

class Item extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      isChecked: this.props.listItem.status
    }
    this.changeFn = this.changeFn.bind(this)
    this.delFn = this.delFn.bind(this)
  }
  changeFn() {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }
  delFn() {
    this.props.delete!(this.props.listItem.id)
  }
  render() {
    return (
      <div>
        <div style={{float: 'left', width: '220px', marginLeft: '15px'}}>
          <Checkbox checked={this.state.isChecked} onChange={this.changeFn}/>
          {this.props.listItem.con}
          <Button style={{float: 'right'}} onClick={this.delFn}>'删除'</Button>
        </div>
      </div>
    )
  }
}

export default Item