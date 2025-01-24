import {
  AudioMomsStatusEnum,
  getAudioList,
  type IAudioItem,
  type TranscriptId
} from '@/api/llmMom';
import type { TableColumnsType } from 'ant-design-vue';
import { Button, Table, Tag } from 'ant-design-vue';
import type { ColumnType } from 'ant-design-vue/es/table';
import { defineComponent, onMounted, ref, type Ref } from 'vue';
import SubMomHistoryTable from './subMomHistoryTable';
import TranslateModal from './translate.modal';

/**
 * 音频列表
 */
export default defineComponent({
  name: 'Moms',
  setup() {
    const audioList: Ref<IAudioItem[]> = ref([]);
    /** 获取音频列表数据 */
    const getAudioListData = async () => {
      try {
        const res = await getAudioList();
        audioList.value = res.audios || [];
      } catch (error) {
        console.log('error', error);
      }
    };

    onMounted(() => {
      getAudioListData();
    });

    const columns: TableColumnsType = [
      {
        title: '標題',
        key: 'title',
        dataIndex: 'title',
        width: 200
      },
      {
        title: '時長（秒）',
        key: 'durationSeconds',
        dataIndex: 'durationSeconds',
        width: 150
      },
      {
        title: '文件大小（字節）',
        key: 'sizeBytes',
        dataIndex: 'sizeBytes',
        width: 200
      },
      {
        title: '格式',
        key: 'format',
        dataIndex: 'format',
        width: 150
      },
      {
        title: 'URL',
        key: 'url',
        width: 300,
        dataIndex: 'url'
      },
      {
        title: '上傳時間',
        key: 'uploadedTime',
        width: 200,
        dataIndex: 'uploadedTime'
      },
      {
        title: '狀態',
        key: 'status',
        width: 150,
        dataIndex: 'status'
      },
      {
        title: '操作',
        key: 'action'
      }
    ];

    const translateVisible = ref(false);
    const transcriptId: Ref<TranscriptId> = ref(null);
    const handleClose = () => {
      translateVisible.value = false;
    };
    const handleOpen = (id: TranscriptId) => {
      console.log('打开模板');

      translateVisible.value = true;
      transcriptId.value = id;
    };

    const handleUpload = async () => {
      console.log('上传音频');
    };

    return () => (
      <div class="p-10 flex flex-col h-full w-full">
        <h1>智能会议纪要</h1>
        <div class="w-full flex justify-end">
          <Button onClick={handleUpload} type="primary">
            上传音频
          </Button>
        </div>
        <div class=" flex-1 py-10 overflow-auto">
          <Table
            columns={columns}
            dataSource={audioList.value}
            pagination={{ pageSize: 20 }}
            rowKey={(record) => record.id}
            scroll={{ y: 'max-content' }}
            v-slots={{
              headerCell: ({ column }: { column: ColumnType }) => {
                if (column.key === 'title') {
                  return <span>{column.title}</span>;
                }
              },
              bodyCell: ({
                column,
                record
              }: {
                column: ColumnType;
                record: IAudioItem;
              }) => {
                // 转译状态
                if (column.key === 'status') {
                  switch (record.status) {
                    case AudioMomsStatusEnum.transcribing:
                      return <Tag color="#f50">转译中</Tag>;
                    case AudioMomsStatusEnum.pendingSummary:
                      return <Tag color="#2db7f5">转译已完成</Tag>;
                    case AudioMomsStatusEnum.generatingSummary:
                      return <Tag color="#87d068">正在生成会议纪要</Tag>;
                    case AudioMomsStatusEnum.summaryGenerated:
                      return <Tag color="#108ee9">會議紀要已生成</Tag>;
                    default:
                      return <span>{record.status}</span>;
                  }
                }
                if (column.key === 'action') {
                  return (
                    <div>
                      <Button
                        type="primary"
                        disabled={
                          record.status === AudioMomsStatusEnum.transcribing
                        }
                        onClick={() => handleOpen(record.transcriptId)}
                      >
                        {record.moms?.length
                          ? '再次生成会议纪要'
                          : '生成会议纪要'}
                      </Button>
                    </div>
                  );
                }
              },
              expandedRowRender: ({ record }: { record: IAudioItem }) => {
                if (record.moms?.length) {
                  return <SubMomHistoryTable dataSource={record.moms || []} />;
                } else {
                  return null;
                }
              }
            }}
          />
        </div>
        <TranslateModal
          visible={translateVisible.value}
          transcriptId={transcriptId.value}
          handleClose={handleClose}
        />
      </div>
    );
  }
});
