import { FC, useEffect, useState } from 'react';
import {
  createColumns,
  createDataSource,
  DataSource,
} from '../../utils/tableData';
import { ConfigProvider, notification, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useWindowWidth } from '../../hook/windowWidth';
import { SelectionSelectFn } from 'antd/es/table/interface';

interface ListTabelProps {
  onSelect: SelectionSelectFn<DataSource>;
}

export const ListTabel: FC<ListTabelProps> = ({ onSelect }) => {
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
      {dataSource.length === 0 && (
        <Spin fullscreen tip="Loading..." size="large" />
      )}
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
            rowSelection={{ type: 'checkbox', onSelect }}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </ConfigProvider>
    </>
  );
};
