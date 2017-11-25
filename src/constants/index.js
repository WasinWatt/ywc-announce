const tableColumns = [{
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
}]

const specialTableColumns = [{
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
}, {
  title: 'รอบสัมภาษณ์',
  dataIndex: 'time',
  key: 'time'
}]

const breakPoints = {
  content: 25,
  design: 20,
  marketing: 18,
  programming: 23
}

export {
  tableColumns, specialTableColumns, breakPoints
}