import { Dispatch, FC, SetStateAction } from 'react';
import { DataSource } from '../../utils/tableData';
import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface ListTabelProps {
  columns: ColumnsType<DataSource>;
  dataSource: DataSource[];
  setSelectedQuizzes: Dispatch<SetStateAction<DataSource[]>>;
}

export const ListTabel: FC<ListTabelProps> = ({
  columns,
  dataSource,
  setSelectedQuizzes,
}) => {
  return (
    <>
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
            rowSelection={{
              type: 'checkbox',
              onSelect: (_record, _selected, selectedRows) => {
                setSelectedQuizzes(selectedRows);
              },
              onSelectAll: (_selected, selectedRows, _changeRows) => {
                setSelectedQuizzes(selectedRows);
              },
            }}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </div>
      </ConfigProvider>
    </>
  );
};
