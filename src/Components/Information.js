import React, { Component } from 'react'
import Scroll from 'react-scroll'
import { Input, Tabs, Table, Row, Col, Icon, Modal, Button } from 'antd'
const Element = Scroll.Element
const scroller = Scroll.scroller

const Information = () => {
  return (
    <div className="App-info" style={{ margin: 50 }}>
      <Element name="information" />
      <Row>
        <h1 style={{ marginBottom: 10, fontSize: 30 }}><b> รายละเอียดการสัมภาษณ์ </b></h1>
        <h2>การสัมภาษณ์จะจัดขึ้นใน<b><u>วันที่ 26 พฤศจิกายน 2560 ณ อาคาร ซี.พี.ทาวเวอร์ 1 (สีลม)</u></b><br />
          ซึ่งจะแบ่งออกเป็น 2 รอบ คือ <b><u>รอบช่วงเช้าตั้งแต่เวลา 9.00 น. ถึง 12.00 น.</u></b>
          และ <b><u>รอบช่วงบ่ายตั้งแต่เวลา 13.00 น. ถึง 18.00 น.</u></b></h2>
      </Row>

      <Row style={{ marginTop: 30, textAlign: "left", marginLeft: 50, marginRight: 50 }}>
        <h1 style={{ marginBottom: 10 }}><b> สิ่งที่ต้องเตรียมมาในวันสัมภาษณ์ </b></h1>
        <h2>1. บัตรประชาชนสำหรับการแลกบัตรเข้าอาคาร ซี.พี.ทาวเวอร์ 1 (สีลม) และ บัตรนักศึกษาสำหรับการลงทะเบียนสัมภาษณ์ กรุณาแต่งกายด้วยชุดนักศึกษา</h2>
        <h2>2. การบ้านและสิ่งที่กรรมการสาขากำหนดไว้ กรุณาอ่านรายละเอียดการบ้านและสิ่งที่กรรมการให้เตรียมมาให้ครบถ้วน หากสาขาใดต้องใช้โน้ตบุ๊ค ควรชาร์ตแบตเตอรี่และเตรียมอินเทอร์เน็ตส่วนตัวมาให้พร้อม เนื่องจากสถานที่ไม่มีบริการอินเทอร์เน็ตให้ใช้</h2>
        <h2>3. Portfolio สามารถนำมาประกอบการสัมภาษณ์ได้ สำหรับน้อง ๆ สาขาดีไซน์จะต้องนำ Portfolio มาด้วยทุกคน</h2>
      </Row>

      <Row style={{ marginTop: 30, textAlign: "left", marginLeft: 50, marginRight: 50 }}>
        <Col span={18}>
          <h1 style={{ marginBottom: 10 }}><b> การเดินทางมาสัมภาษณ์ </b></h1>
          <h2>1. ด้วยรถไฟฟ้า BTS สามารถลงสถานีศาลาแดง ณ ทางออกที่ 2</h2>
          <h2>2. ด้วยรถไฟฟ้า MRT สามารถลงสถานีสีลม ณ ทางออกที่ 2 โดยเดินเรียบทางเท้าไปตามถนนสีลม</h2>
          <h2>3. ด้วยรถประจำทาง สามารถขึ้นใช้บริการสาย 15, 77, 155, 504, 177, 76</h2>
        </Col>
        <Col span={6}>
          <h1 style={{ marginBottom: 10 }}><b> สอบถามเพิ่มเติมติดต่อ </b></h1>
          <h2><b>พี่เบ๊บ:</b> 064-174-7080</h2>
          <h2><b>พี่ฟง:</b> 092-458-7067</h2>
          <h2><b>พี่เบนซ์:</b> 085-666-7571</h2>
        </Col>
      </Row>
    </div>
  )
}

export default Information
