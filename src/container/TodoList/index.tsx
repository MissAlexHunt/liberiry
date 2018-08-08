import React from 'react'
import ListItem from './checkbox'
import Dialog from './dialog'
// import './main.css'

interface IState {
  list?: any,
  finished?: any
}

export interface IProps {
  item?: any
}

class TodoList extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)
        // 初始任务列表
        this.state = {
            list: [{
                id: 0,
                name: '天天',
                status: 0
            }, {
                id: 1,
                name: '月月',
                status: 0
            }, {
                id: 2,
                name: '年年',
                status : 0
            }],
            finished: 0
        }
        this.updateFinished = this.updateFinished.bind(this)
        this.addTask = this.addTask.bind(this)
    }
    
    // 添加新任务，在组件中以props的形式传递给子组件
    addTask (newitem) {
        const allTask = this.state.list
        allTask.push(newitem)
        this.setState({
            list: allTask
        })
    }
    // 更新完成的任务，在组件中以props的形式传递给子组件
    updateFinished (todoItem) {
        let sum = 0
        this.state.list.forEach( (item) => {
            if (item.id === todoItem.id) {
                item.status = todoItem.status
            }
            if (item.status === 1) {
                sum++
            }
        })
        this.setState({
            finished: sum
        })
    }

    render () {
        return (
            <div className='container'>
                <h1>TodoList</h1>
                <ul>
                    { this.state.list.map ((item, index) =>
                        <ListItem 
                            item={item}  
                            finishedChange={this.updateFinished} 
                            key={index}
                        />
                    )}
                </ul>
                <Dialog addNewTask={this.addTask} nums={this.state.list.length}/>
            </div>
        )
    }
}

export default TodoList