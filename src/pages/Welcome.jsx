import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome = () => {
  return (
    <PageContainer>
      <Card>
        <Typography.Title
          level={2}
          style={{
            textAlign: 'center',
          }}
        >
          <SmileTwoTone /> Cervix Management Platform <HeartTwoTone twoToneColor="#eb2f96" /> You
        </Typography.Title>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
