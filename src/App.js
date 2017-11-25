import React, { Component } from 'react'

import axios from 'axios'
import _ from 'lodash'
import Scroll from 'react-scroll'
import { Input, Tabs, Table, Row, Col, Icon, Modal, Button } from 'antd'
import logo from './assets/logo.png'
import './App.css'

const Element = Scroll.Element
const scroller = Scroll.scroller

const Search = Input.Search
const TabPane = Tabs.TabPane

const columns = [{
  title: 'รหัสสัมภาษณ์',
  dataIndex: 'interviewRef',
  key: 'interviewRef',
}, {
  title: 'ชื่อจริง',
  dataIndex: 'firstName',
  key: 'firstName',
}, {
  title: 'นามสกุล',
  dataIndex: 'lastName',
  key: 'lastName',
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateList: [],
      filteredList: []
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
      this.setState({ filteredList })
    } else {
      filteredList = _.filter(this.state.candidateList, candidate => {
        return (_.includes(candidate.firstName, words[0]) && _.includes(candidate.lastName, words[1]))
      })
      this.setState({ filteredList })
    }
    if (filteredList.length === 0) {
      console.log('FUCK')
      Modal.error({
        title: 'Sorry :( ไม่มีชื่ออ่ะครับ',
        okText: 'close',
        content: 'ปีหน้ามาสมัครใหม่น้าา'
      })
    } else {
      Modal.success({
        title: 'Congratulation! ติดค่ายแล้วจ้าา',
        okText: 'close',
        content: (
          <div>
            <Table columns={columns} dataSource={filteredList} />
          </div>
        )
      })
    }
  }

  renderGroup(major){
    const filteredList = _.filter(this.state.candidateList, { major })
    const breakPoint = major === 'content' ? 25 : major === 'design' ? 20 : major === 'marketing' ? 18 : 23
    const firstHalfList = _.take(filteredList, breakPoint)
    const secondHalfList = _.drop(filteredList, breakPoint)
    return(
      <Row>
        <Col span={12}>
          <h1>สัมภาษณ์รอบเช้า 9.00-12.00</h1>
          <Table columns={columns} dataSource={firstHalfList} style={{ margin: 20, padding: 20 }}/>
        </Col>
        <Col span={12}>
          <h1>สัมภาษณ์รอบบ่าย 13.00-18.00</h1>
          <Table columns={columns} dataSource={secondHalfList} style={{ margin: 20, padding: 20 }}/>
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
            <img src={logo} className="App-logo" alt="logo"/>
            </Col>
            <Col span={5}>
            <Button ghost size="large" style={{ margin: 20 }} onClick={() => scroller.scrollTo('allCandidate', {
              duration: 1000,
              delay: 100,
              smooth: true,
              offset: 0
            })}>ดูผลทั้งหมด</Button>
            </Col>
          </Row>
          <h1 className="Camp-name">YWC-15th</h1>
          <h1 className="App-title"><b>อยากรู้ว่าตัวเองติดไหม ใส่ชื่อเลยยยย</b></h1>
          <Search
            placeholder="ค้นหารายชื่อ"
            style={{ width: 300, marginTop: 70, height: 40 }}
            onSearch={this.onSubmit}
            size='large'
          />
        </header>
        <div className="App-info">
          <Element name="information" />
          <Row style={{marginTop: 20}}>
            <h1> รายละเอียดการสัมภาษณ์ </h1>
            <h2>การสัมภาษณ์จะจัดขึ้นใน<b><u>วันที่ 26 พฤศจิกายน 2560 ณ อาคาร ซี.พี.ทาวเวอร์ 1 (สีลม)</u></b><br/>
            ซึ่งจะแบ่งออกเป็น 2 รอบ คือ <b><u>รอบช่วงเช้าตั้งแต่เวลา 9.00 น. ถึง 12.00 น.</u></b> 
            และ <b><u>รอบช่วงบ่ายตั้งแต่เวลา 13.00 น. ถึง 18.00 น.</u></b></h2>
          </Row>
          
          <Row style={{ marginTop: 20, textAlign: "left", marginLeft:50, marginRight: 50 }}>
            <h1> สิ่งที่ต้องเตรียมมาในวันสัมภาษณ์ </h1>
            <h2>1. บัตรประชาชนสำหรับการแลกบัตรเข้าอาคาร ซี.พี.ทาวเวอร์ 1 (สีลม) และ บัตรนักศึกษาสำหรับการลงทะเบียนสัมภาษณ์ กรุณาแต่งกายด้วยชุดนักศึกษา</h2>
            <h2>2. การบ้านและสิ่งที่กรรมการสาขากำหนดไว้ กรุณาอ่านรายละเอียดการบ้านและสิ่งที่กรรมการให้เตรียมมาให้ครบถ้วน หากสาขาใดต้องใช้โน้ตบุ๊ค ควรชาร์ตแบตเตอรี่และเตรียมอินเทอร์เน็ตส่วนตัวมาให้พร้อม เนื่องจากสถานที่ไม่มีบริการอินเทอร์เน็ตให้ใช้</h2>
            <h2>3. Portfolio สามารถนำมาประกอบการสัมภาษณ์ได้ สำหรับน้อง ๆ สาขาดีไซน์จะต้องนำ Portfolio มาด้วยทุกคน</h2>
          </Row>

          <Row style={{ marginTop: 20, textAlign: "left", marginLeft: 50, marginRight: 50 }}>
            <Col span={16}>
              <h1> การเดินทางมาสัมภาษณ์ </h1>
              <h2>1. ด้วยรถไฟฟ้า BTS สามารถลงสถานีศาลาแดง ณ ทางออกที่ 2</h2>
              <h2>2. ด้วยรถไฟฟ้า MRT สามารถลงสถานีสีลม ณ ทางออกที่ 2 โดยเดินเรียบทางเท้าไปตามถนนสีลม</h2>
              <h2>3. ด้วยรถประจำทาง สามารถขึ้นใช้บริการสาย 15, 77, 155, 504, 177, 76</h2>
            </Col>
            <Col span={8}>
              <h1> สอบถามเพิ่มเติมติดต่อ </h1>
              <h2><b>พี่เบ๊บ:</b> 064-174-7080</h2>
              <h2><b>พี่ฟง:</b> 092-458-7067</h2>
              <h2><b>พี่เบนซ์:</b> 085-666-7571</h2>
            </Col>
          </Row>
        </div>
        <Element name="allCandidate" />
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="file-text" />Content</span>} key="1">{this.renderGroup('content')}</TabPane>
          <TabPane tab={<span><Icon type="edit" />Design</span>} key="2">{this.renderGroup('design')}</TabPane>
          <TabPane tab={<span><Icon type="area-chart" />Marketing</span>} key="3">{this.renderGroup('marketing')}</TabPane>
          <TabPane tab={<span><Icon type="desktop" />Programming</span>} key="4">{this.renderGroup('programming')}</TabPane>
        </Tabs>

      </div>
    );
  }
}

export default App;
