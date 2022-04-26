import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { testTable } from '@/api/test';
import { rule } from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-layout';
import BasicForm from '../form';

const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'owner', // 后端属性匹配
    copyable: true, // 是否允许复制
    ellipsis: true, // 是否自动缩略
    tip: '标题过长会自动收缩'
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true, // 过滤图标的展示
    onFilter: true, // 进行实质性筛选动作
    valueType: 'select',// 对渲染的选择器选择
    valueEnum: { // 对非汉字数据进行可视化翻译
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  //  只是展示在表格里边
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    sorter: true, // 排序
    hideInSearch: true, // 隐藏查询条件
  },
  // 只展示在查询条件里边
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          console.log(record);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

export default function MyList () {
  const actionRef = useRef();
  const [showDetail, setShowDetail] = useState(false);

  const testTest = async () => {
    const data = await testTable(1, 10)
    return data
  }

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={testTest}
        rowKey="key"
        search={{ labelWidth: 'auto' }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{ pageSize: 10 }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setShowDetail(true)}>
            新建
          </Button>
        ]}
      />
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setShowDetail(false);
        }} >
        <BasicForm />
      </Drawer>
    </PageContainer>
  )
}



