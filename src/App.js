import React, { Component } from 'react';
import { Input, Tabs, Table, Row, Col, Icon, Modal } from 'antd';
import logo from './logo.png';
import './App.css';
import axios from 'axios'
import _ from 'lodash'
const Search = Input.Search;
const TabPane = Tabs.TabPane;

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
      searchInput: '',
      candidateList: [],
      filteredList: [],
      successVisible: false,
      failureVisible: false
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
      this.setState({ failureVisible: true })
    } else {
      this.setState({ successVisible: true })
    }
  }

  renderSearchResult(){
    return(
      <Table columns={columns} dataSource={this.state.filteredList} style={{ margin: 20, padding: 20 }} />
    )
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
          <div className="App-corner">
            <img src={logo} className="App-logo" alt="logo"/>
          </div>
          <h1 className="Camp-name">YWC-15th</h1>
          <h1 className="App-title">อยากรู้ว่าตัวเองติดไหม ใส่ชื่อเลยยยย</h1>
          <Search
            placeholder="ค้นหารายชื่อ"
            style={{ width: 300, marginTop: 30, height: 40 }}
            onSearch={this.onSubmit}
            size='large'
          />
        </header>
        <Modal
          title="Modal"
          visible={this.state.successVisible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="close"
          closable={false}
          width={700}
        >
          {this.renderSearchResult()}
        </Modal>
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
