import React from 'react'
import Item from './item'
import Append from './append'

export interface ILi {
  id: string,
  con: string,
  status: boolean
}

interface IState {
  list: ILi[]
}

interface IProps {
  tm?: any
}

class TodoListCopy extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      list: [
        {
          id: '0',
          con: '日',
          status: false
        },
        {
          id: '1',
          con: '月',
          status: true
        }
      ]
    }
    this.deleteFn = this.deleteFn.bind(this)
    this.saveFn = this.saveFn.bind(this)
  }
  deleteFn(key: any) {
    const arr = this.state.list
    arr.map(item => {
      if (item.id === key) {
        const index = arr.indexOf(item)
        if (index > -1) {
          arr.splice(index, 1)
        }
      }
    })
    this.setState({
      list: arr
    })
  }
  saveFn(con: any) {
    const arr = this.state.list
    if (con !== '') {
      const item = {
        id: arr.length + '',
        con,
        status: false
      }
      arr.push(item)
      this.setState({
        list: arr
      })
    }
  }

  render() {
    return (
      <div style={{ width: 300 }}>
        <h2>todolist</h2>
        {this.state.list.map(item => {
          const color = item.status ? '#6cf' : '#fff'
          const style = {
            backgroundColor: color
          }
          return (
            <div key='item.id' style={style}>
              <Item listItem={item} delete={this.deleteFn}/>
            </div>
          )
        })}
        <Append save={this.saveFn}/>
      </div>
    )

  }
}

export default TodoListCopy