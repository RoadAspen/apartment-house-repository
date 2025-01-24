/**
 * 智能会议纪要生成历史记录 二阶表格
 */
import type { IMomItem } from '@/api/llmMom';
import { Button, Table } from 'ant-design-vue';
import type { ColumnType } from 'ant-design-vue/es/table';
import { defineComponent, ref, toRefs } from 'vue';
import MomModal from './mom.modal';

export default defineComponent({
  name: 'SubMomHistoryTable',
  props: {
    dataSource: {
      required: true,
      type: Array<IMomItem>
    }
  },
  setup(props) {
    const { dataSource } = toRefs(props);
    const columns: ColumnType[] = [
      {
        key: 'momId',
        dataIndex: 'momId',
        title: '会议纪要ID'
      },
      {
        key: 'version',
        dataIndex: 'version',
        title: '版本'
      },
      {
        key: 'generatedTime',
        dataIndex: 'generatedTime',
        title: '生成时间'
      },
      {
        key: 'action',
        title: '操作'
      }
    ];
    const momsVisible = ref(false);
    /** 打開會議紀要結果彈窗 */
    const handleOpenMomsModal = () => {
      momsVisible.value = true;
    };
    /** 關閉會議紀要結果彈窗 */
    const handleCloseMomsModal = () => {
      momsVisible.value = false;
    };
    return () => (
      <>
        <Table
          columns={columns}
          dataSource={dataSource.value}
          pagination={false}
          v-slots={{
            bodyCell: ({
              column
            }: {
              column: ColumnType;
              record: IMomItem;
            }) => {
              if (column.key === 'action') {
                return (
                  <div>
                    <Button
                      onClick={() => {
                        handleOpenMomsModal();
                      }}
                      type="primary"
                    >
                      查看详情
                    </Button>
                  </div>
                );
              }
            }
          }}
        />
        <MomModal
          visible={momsVisible.value}
          handleClose={handleCloseMomsModal}
        />
      </>
    );
  }
});
