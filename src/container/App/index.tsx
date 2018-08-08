import * as React from 'react'
import { Button } from 'antd'
import './App.scss'
// import logo from './logo.svg'
import MaptalksCom from '../../components/mapComponents/MaptalksCom'
import Summit, { PUBSTRING } from '../../components/Summit'
import Web from '../../components/Web'
import FaBeer from 'react-icons/lib/fa/beer'
import App1 from '../App1'
import AjaxTest from '../../components/Ajax'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import PubSub from 'pubsub-js'
interface IState {
  SummitMessage?: string
  WebMessage?: string
  EchartOption?: any
}
export interface IProps {
  empty?: any
}

class App extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      SummitMessage: '',
      WebMessage: '',
      EchartOption: this.getOption()
    }
    this.receiveFromSummit = this.receiveFromSummit.bind(this)
    this.receiveFromWeb = this.receiveFromWeb.bind(this)
    this.getOption = this.getOption.bind(this)
  }
  public say() {
    alert('test')
  }
  public receiveFromSummit(content: any) {
    this.setState({
      WebMessage: content
    }, () => {
      console.log(`父容器收到信息，内容为：${this.state.WebMessage}`)
    })
  }
  receiveFromWeb(content: any) {
    this.setState({
      SummitMessage: content
    })
  }
  getOption() {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
  }
  componentDidMount() {
    PubSub.subscribe(PUBSTRING, (msg, data) => {
      this.setState({
        EchartOption: data
      })
    })
    const option = {
      title: {
        text: 'ECharts 入门示例2'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    const myEcharts = echarts.init(document.getElementById('chart'))
    myEcharts.setOption(option)
  }
  public render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={require('./image/logo.svg')} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcomes to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <App1 />
        <Button onClick={this.say}> antd test</Button>
        <Summit message={this.state.SummitMessage} onSay={this.receiveFromSummit} />
        <h3>分割线哈</h3>
        <AjaxTest />
        <h3> Lets go for a <FaBeer size={40} color='#a24b' />? </h3>
        <Web message={this.state.WebMessage} onSendMessage={this.receiveFromWeb} />
        <MaptalksCom mapStyle={{ height: '500px' }} />
        <ReactEcharts
          option={this.state.EchartOption!}
          notMerge={true}
          lazyUpdate={true} />
        <div id='chart' style={{ width: '100%', height: '300px' }} />
      </div>
    )
  }
}

export default App
