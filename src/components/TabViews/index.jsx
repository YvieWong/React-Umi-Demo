import React, { useEffect, useState } from 'react'
import { history, useLocation, withRouter } from 'umi';
import { Tabs } from 'antd'
import { getTotalRouter } from '@/utils'
import './index.less'

const { TabPane } = Tabs;
function TabView () {
  const location = useLocation().pathname
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState([]);

  useEffect(() => {
    const route = getTotalRouter(location)
    add(route)
  }, [location])

  const onChange = activeKey => {
    // this.setState({ activeKey }, function () {
    //   history.push({ pathname: activeKey });
    // });
    console.log(activeKey, 111);
    setActiveKey(activeKey)
    history.push(activeKey)
  };

  const onEdit = (targetKey, action) => {
    console.log(activeKey, 222);
    remove(targetKey)
  };

  const add = (obj) => {
    console.log(obj, 333);
    let newArr = panes
    const result = newArr.find(item => {
      return item.path === obj.path
    })
    if (!result) {
      setPanes(() => {
        newArr.push(obj)
        return newArr
      })
    }
    setActiveKey(obj.path)
  };

  const remove = targetKey => {
    console.log(targetKey, 4444);
    let lastIndex, active;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const temPanes = panes.filter(pane => pane.path !== targetKey);
    if (temPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        active = temPanes[lastIndex].path;
      } else {
        active = temPanes[0].path;
      }
    }
    setPanes(temPanes)
    setActiveKey(active)
  };
  return (
    <div id="TabView">
      <Tabs
        hideAdd
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.name} key={pane.path}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}
export default withRouter(TabView)

