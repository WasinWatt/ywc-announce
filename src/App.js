import React, { Component } from 'react'

import axios from 'axios'
import _ from 'lodash'
import Scroll from 'react-scroll'
import { Input, Tabs, Table, Row, Col, Icon, Modal, Button } from 'antd'
import logo from './assets/logo.png'
import Information from './Components/Information'
import './App.css'
import { tableColumns, specialTableColumns, breakPoints } from './constants'

const Element = Scroll.Element
const scroller = Scroll.scroller

const Search = Input.Search
const TabPane = Tabs.TabPane

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateList: []
    }
  }

  async componentWillMount() {
    const res = await axios('https://ywc15.ywc.in.th/api/interview')
    this.setState({ candidateList: _.sortBy(res.data, ['interviewRef']) })
    console.log(this.state.candidateList)
  }

  hideModal = () => {
    this.setState({
      successVisible: false,
      failureVisible: false
    });
  }

  onSubmit = (term) => {
    const words = _.split(term, ' ')
    let filteredList = []
    if (words.length < 2) {
      filteredList = _.filter(this.state.candidateList, candidate => {
        return (_.includes(candidate.firstName, words[0]) || _.includes(candidate.lastName, words[0]))
      })
    } else {
      filteredList = _.filter(this.state.candidateList, candidate => {
        return (_.includes(candidate.firstName, words[0]) && _.includes(candidate.lastName, words[1]))
      })
    }
    if (filteredList.length === 0) {
      console.log('FUCK')
      Modal.error({
        title: (
          <h2>Sorry :( ไม่มีชื่ออ่ะครับ</h2>
        ),
        okText: 'close',
        content: (
          <h3>พิมชื่อผิดรึป่าวว :)</h3>
        )
      })
    } else {
      filteredList = _.map(filteredList, (candidate, index) => {
        let time = 'บ่าย'
        if (index <= breakPoints[candidate.major]) {
          time = 'เช้า'
        }
        return Object.assign({}, candidate, { time })
      })
      Modal.success({
        title: (
          <h2>Congratulation! ติดสัมภาษณ์แล้วจ้าา</h2>
        ),
        okText: 'close',
        width: 600,
        content: (
          <div style={{paddingTop: 10, marginRight: 25}}>
            <Table columns={specialTableColumns} dataSource={filteredList} />
          </div>
        )
      })
    }
  }

  renderGroup(major){
    const filteredList = _.filter(this.state.candidateList, { major })
    console.log(breakPoints)
    const firstHalfList = _.take(filteredList, breakPoints[major])
    const secondHalfList = _.drop(filteredList, breakPoints[major])
    return(
      <Row>
        <Col span={12}>
          <h1 style={{ fontSize: 25 }}><b>สัมภาษณ์รอบเช้า 9.00 น. - 12.00 น.</b></h1>
          <Table columns={tableColumns} dataSource={firstHalfList} style={{ margin: 20, padding: 20 }}/>
        </Col>
        <Col span={12}>
          <h1 style={{ fontSize: 25 }}><b>สัมภาษณ์รอบบ่าย 13.00 น. - 18.00 น.</b></h1>
          <Table columns={tableColumns} dataSource={secondHalfList} style={{ margin: 20, padding: 20 }}/>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Row>
            <Col span={5} />
            <Col span={5}>
            <Button ghost size="large" style={{margin: 20}} onClick={() => scroller.scrollTo('information', {
              duration: 1000,
              delay: 100,
              smooth: true,
              offset: 0
            })}>รายละเอียด</Button>
            </Col>
            <Col span={4}>
              <a href="https://ywc15.ywc.in.th"><img src={logo} className="App-logo" alt="logo"/></a>
            </Col>
            <Col span={5}>
            <Button ghost size="large" style={{ margin: 20 }} onClick={() => scroller.scrollTo('allCandidates', {
              duration: 1000,
              delay: 100,
              smooth: true,
              offset: 0
            })}>ดูผลทั้งหมด</Button>
            </Col>
          </Row>
          <h1 className="Camp-name">YWC-15th</h1>
          <h1 className="App-title"><b>อยากรู้ว่าตัวเองติดสัมภาษณ์ไหม ใส่ชื่อเลยยย</b></h1>
          <Search
            placeholder="ค้นหารายชื่อ"
            style={{ width: 300, marginTop: 70, height: 40 }}
            onSearch={this.onSubmit}
            size='large'
          />
        </header>
        <Information />
        <div className="App-all-candidates">
          <Element name="allCandidates" />
          <h1 style={{ marginBottom: 10, fontSize: 30 }}><b> รายชื่อผู้ติดสัมภาษณ์ทั้งหมด </b></h1>
          <Tabs defaultActiveKey="1" >
            <TabPane tab={<span><Icon type="file-text" />Content</span>} key="1">{this.renderGroup('content')}</TabPane>
            <TabPane tab={<span><Icon type="edit" />Design</span>} key="2">{this.renderGroup('design')}</TabPane>
            <TabPane tab={<span><Icon type="area-chart" />Marketing</span>} key="3">{this.renderGroup('marketing')}</TabPane>
            <TabPane tab={<span><Icon type="desktop" />Programming</span>} key="4">{this.renderGroup('programming')}</TabPane>
          </Tabs>
        </div>

      </div>
    );
  }
}

export default App;
