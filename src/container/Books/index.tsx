import React from 'react'
import { Button, Input } from 'antd'
import List, { DELSTR, DETSTR } from './list'
import Ajax from '../../utils/Ajax'
interface IProps {
  test?: any
}

interface IState {
  resData?: any
  detail?: any
  books?: any
  bookData?: any
  addFlag?: any
}

export default class Books extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      resData: [],
      detail: 'none',
      books: 'block',
      bookData: [],
      addFlag: 'none'
    }
    this.allBooksFn = this.allBooksFn.bind(this)
    this.lastFn = this.lastFn.bind(this)
    this.addBookFn = this.addBookFn.bind(this)
    this.saveFn = this.saveFn.bind(this)
  }
  componentWillMount() {
    this.allBooksFn()
  }
  componentDidMount() {
    PubSub.subscribe(DELSTR, (msg, data) => {
      Ajax.get('/books/' + data + '/delete', {}).then((res: any) => {
        if (res!) {
          this.allBooksFn()
        }
      })
    })
    PubSub.subscribe(DETSTR, (msg, data) => {
      this.setState({
        detail: 'block',
        books: 'none'
      })
      Ajax.get('/books/' + data, {}).then((res: any) => {
        if (res!.data!.length > 0) {
          this.setState({
            bookData: res.data[0]
          })
        }
      })
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(DELSTR, DETSTR)
  }
  allBooksFn() {
    Ajax.get('/books', {}).then((res: any) => {
      if (res!.data!.length > 0) {
        this.setState({
          resData: res.data
        })
      }
    })
  }
  addBookFn() {
    this.setState({
      addFlag: 'block'
    })
  }
  lastFn() {
    this.setState({
      detail: 'none',
      books: 'block'
    })
  }
  saveFn() {
    const dom = document.getElementById('addBookForm')
    const inputs = dom!.getElementsByTagName('input')
    const len = inputs.length
    let param = ''
    let str = ''
    for (let i = 0; i < len; i++) {
      param += inputs[i].value + '&'
    }
    if (param !== '') {
      const arr = param.split('&')
      str += 'name=' + arr[0] + '&'
      str += 'author=' + arr[0] + '&'
      str += 'labels=' + arr[0] + '&'
      str += 'content=' + arr[0]
    }
    Ajax.get('/books/add?' + str, {}).then((res: any) => {
      if (res!) {
        alert('添加成功')
      }
    }).then(() => {
      this.setState({
        addFlag: 'none'
      })
      this.allBooksFn()
    })
  }
  render() {
    return (
      <div>
        <div style={{ display: this.state.books }}>
          <Button onClick={this.addBookFn} style={{ margin: '15px 0 0 15px' }}>添加</Button>
          {this.state.resData.map((item, index) => {
            return (
              <div key={index}>
                <List listItem={item} />
              </div>
            )
          })}
        </div>
        <div style={{ width: '100%', minHeight: '100%', padding: '15px', position: 'absolute', left: '0', top: '0', backgroundColor: '#333', display: this.state.addFlag }}>
          <form id='addBookForm' style={{ width: '500px', height: '300px', margin: '100px auto', borderRadius: '5px', padding: '15px', backgroundColor: '#fff' }}>
            <div style={{ marginTop: '15px' }}>
              <label style={{ width: '50px' }}>书名：</label>
              <Input name='name' style={{ width: '350px' }} />
            </div>
            <div style={{ marginTop: '15px' }}>
              <label style={{ width: '50px' }}>作者：</label>
              <Input name='author' style={{ width: '350px' }} />
            </div>
            <div style={{ marginTop: '15px' }}>
              <label style={{ width: '50px' }}>标签：</label>
              <Input name='labels' style={{ width: '350px' }} />
            </div>
            <div style={{ marginTop: '15px' }}>
              <label style={{ width: '50px' }}>简介：</label>
              <Input name='content' style={{ width: '350px' }} />
            </div>
            <Button style={{ margin: '15px 0 0 15px' }} onClick={this.saveFn}>确定</Button>
          </form>
        </div>
        <div style={{ width: '500px', border: '1px solid #ddd', minHeight: '150px', margin: '15px', padding: '15px', display: this.state.detail }}>
          <Button onClick={this.lastFn} style={{ marginTop: '15px' }}>返回</Button>
          <div>
            {this.state.bookData.name}
          </div>
          <div>
            {this.state.bookData.author}
          </div>
          <div>
            {this.state.bookData.labels}
          </div>
          <div>
            {this.state.bookData.content}
          </div>
        </div>
      </div>
    )
  }
}