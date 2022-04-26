import React, { useState } from 'react'
import { history } from 'umi';
import { Tabs } from 'antd'
import { set } from 'lodash';

const { TabPane } = Tabs;
export default function TabView () {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState([{
    title: '首页',
    key: '/welcome'
  }]);

  const onChange = activeKey => {
    // this.setState({ activeKey }, function () {
    //   history.push({ pathname: activeKey });
    // });
    setActiveKey(activeKey)
  };

  const onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  const remove = targetKey => {
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const temPanes = panes.filter(pane => pane.key !== targetKey);
    if (temPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = temPanes[lastIndex].key;
      } else {
        activeKey = temPanes[0].key;
      }
    }
    setPanes(temPanes)
    setActiveKey(activeKey)
  };
  return (
    <div>
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}
