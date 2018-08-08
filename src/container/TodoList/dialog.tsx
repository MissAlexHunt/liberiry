import React from 'react'

interface IState {
  SummitMessage?: string
}

export interface IProps {
  nums?: any,
  addNewTask?: any
}

class Dialog extends React.Component<IProps, IState> {
  myRef
  constructor(props: IProps, state: IState) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.myRef = React.createRef()
  }

  handleClick() {
    const len = this.props.nums
    const newid = len > 0 ? len : 0
    const value = this.myRef.current.value
    if (value !== '') {
      const obj = {
        id: newid,
        name: value,
        status: 0
      }
      this.myRef.current.value = ''
      this.props.addNewTask(obj)
    }
  }
  render() {
    return (

      <div className='dialog'>
        <div>
          <h3>Task</h3>
          <input type='text' ref={this.myRef} placeholder='你想做点什么' />
        </div>
        <div>
          <input type='button' value='Save Task' onClick={this.handleClick} />
        </div>
      </div>

    )
  }
}

export default Dialog