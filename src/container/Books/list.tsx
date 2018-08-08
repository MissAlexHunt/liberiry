import React from 'react'
import {Button} from 'antd'
import PubSub from 'pubsub-js'

interface IProps {
  listItem?: any
}

interface IState {
  tes?: any
}

export const DETSTR = 'addbooks'
export const DELSTR = 'delbooks'

export default class List extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      tes: ''
    }
    this.detailFn = this.detailFn.bind(this)
    this.deleteFn = this.deleteFn.bind(this)
  }
  detailFn() {
    PubSub.publish(DETSTR, this.props.listItem._id.$oid)
  }
  deleteFn() {
    PubSub.publish(DELSTR, this.props.listItem._id.$oid)
  }
  render() {
    return (
      <div style={{border: '1px solid #ddd', width: '400px', padding: '8px 10px', margin: '15px 0 0 15px' }}>
        <div style={{cursor: 'pointer'}} onClick={this.detailFn}>
          {this.props.listItem.name}
        </div>
        <div>
          {this.props.listItem.author}
        </div>
        <Button onClick={this.deleteFn}>删除</Button>
      </div>
    )
  }
}