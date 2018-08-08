import * as React from 'react'
import Ajax from '../../utils/Ajax'


interface IProps {
  test?: any
}

interface IState {
  userInfo?: any,
  userId?: any
}

export default class AjaxTest extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userInfo: {
        name: 'anonymous'
      }
    }
  }
  // componentDidMount() {
  //   Axios.get('/api/0.4/?randomapi').then(res => {
  //     if (res && res.status === 200) {
  //       const length = res.data.results.length
  //       this.setState({
  //         userInfo: res.data.results[length - 1].user
  //       })
  //     }
  //   })
  // }
  componentDidMount() {
    Ajax.get('/api/xiandu/categories', {}).then((res: any) => {
      if (res!.results!.length > 0) {
        this.setState({
          userId: res.results
        })
      }
    })
  }

  render() {
    let userName = ''
    const userInfoName = this.state.userInfo.name
    if (userInfoName.first || userInfoName.last) {
      userName = `${userInfoName.first} ${userInfoName.last}`
    } else {
      userName = userInfoName
    }
    return (
      <div>
        {userName ? `hello: ${userName}` : false}
        {
          this.state.userId && this.state.userId.__proto__.constructor === Array && this.state.userId.map(item => {
            return <div key={item._id}>{item.name}</div>
          })
        }
      </div>
    )
  }
}