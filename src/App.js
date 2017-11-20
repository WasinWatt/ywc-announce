import React, { Component } from 'react';
import { Input, Tabs, Table } from 'antd';
import logo from './logo.png';
import './App.css';
import axios from 'axios'
import _ from 'lodash'
const Search = Input.Search;
const TabPane = Tabs.TabPane;

const columns = [{
  title: 'First Name',
  dataIndex: 'firstName',
  key: 'firstName',
}, {
  title: 'Last Name',
  dataIndex: 'lastName',
  key: 'lastName',
}, {
  title: 'ID',
  dataIndex: 'interviewRef',
  key: 'interviewRef',
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      candidateList: [],
      filteredList: []
    }
  }

  async componentWillMount() {
    const res = await axios('https://ywc15.ywc.in.th/api/interview')
    this.setState({ candidateList: res.data })
    console.log(this.state.candidateList)
  }

  onSubmit = (term) => {
    const words = _.split(term, ' ')
    if(words.length < 2) {
      const filteredList = _.filter(this.state.candidateList, candidate => {
        return (_.includes(candidate.firstName, words[0]) || _.includes(candidate.lastName, words[0]))
      })
      this.setState({ filteredList })
      console.log(filteredList)
    } else {
      const filteredList = _.filter(this.state.candidateList, candidate => {
        return (_.includes(candidate.firstName, words[0]) && _.includes(candidate.lastName, words[1]))
      })
      this.setState({ filteredList })
      console.log(filteredList)
    }
  }

  renderGroup(major){
    const filteredList = _.filter(this.state.candidateList, { major })
    return(
      <Table columns={columns} dataSource={filteredList}/>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ประกาศผลผู้มีสิทธิ์สัมภาษณ์</h1>
        </header>
        <Search
          placeholder="ค้นหารายชื่อ"
          style={{ width: 300 }}
          onSearch={this.onSubmit}
        />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Design" key="1">{this.renderGroup('design')}</TabPane>
          <TabPane tab="Content" key="2">{this.renderGroup('content')}</TabPane>
          <TabPane tab="Marketing" key="3">{this.renderGroup('marketing')}</TabPane>
          <TabPane tab="Programming" key="4">{this.renderGroup('programming')}</TabPane>
        </Tabs>
      </div>
    );
  }
}

export default App;
