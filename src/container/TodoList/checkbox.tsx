import React from 'react'

interface IState {
  SummitMessage?: string
}

export interface IProps {
  item?: any,
  finishedChange?: any,
  totalChange?: any
}

class ListItem extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)

    this.handleFinished = this.handleFinished.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleFinished() {
    let status = this.props.item.status
    status = (status === 0 ? 1 : 0)
    const obj = {
      id: this.props.item.id,
      name: this.props.item.name,
      status
    }
    this.props.finishedChange(obj) // 执行父组件传来的方法
  }

  handleDelete() {
    this.props.totalChange(this.props.item) // 执行父组件传来的方法
  }

  render() {
    const item = this.props.item

    const unfinish = {
      backgroundColor: '#DFFCB5',
      color: '#2EB872',
    }

    const finish = {
      backgroundColor: '#FFFA9D',
      color: '#FF9A3C',
      textDecoration: 'line-through'
    }

    const itemStyle = item.status === 0 ? unfinish : finish

    return (
      <li key={item.id} style={itemStyle}>
        <span onClick={this.handleFinished} id={item.id} className='check-btn' style={{ backgroundColor: item.status === 0 ? '#fff' : '#A1EAFB' }} />
        <span>{item.name}</span>
        <span onClick={this.handleDelete} className='delete-btn'>删除</span>
      </li>
    )
  }
}

export default ListItem