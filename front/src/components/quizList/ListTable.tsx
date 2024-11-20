import { useEffect, useState } from 'react';
import {
  createColumns,
  createDataSource,
  DataSource,
} from '../../utils/tableData';
import { ConfigProvider, notification, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useWindowWidth } from '../../hook/windowWidth';

export const ListTabel = () => {
  const [columns, setColumns] = useState<ColumnsType<DataSource>>([]);
  const [dataSource, setDataSource] = useState<DataSource[]>([]);
  const width = useWindowWidth();
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const fetchDataSource = async () => {
      const dataSource = await createDataSource(api);
      if (dataSource) {
        setDataSource(dataSource);
      }
    };
    fetchDataSource();
  }, []);

  useEffect(() => {
    setColumns(createColumns(width));
  }, [width]);
  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: '#18181b',
              borderColor: '#000000',
              colorText: '#ffffff',
              headerBg: '#18181b',
              headerColor: '#ffffff',
              rowSelectedBg: '#38bdf8',
              rowSelectedHoverBg: '#64ccfa',
            },
          },
        }}
      >
        <div>
          <Table
            rowSelection={{ type: 'checkbox' }}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </ConfigProvider>
    </>
  );
};
