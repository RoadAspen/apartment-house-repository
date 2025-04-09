/**
 * 转义文本弹窗
 */
import {
  createMoms,
  editTranslateText,
  getTranscriptById,
  type ITranscriptTextItem,
  type TranscriptId
} from '@/api/llmMom';
import { Button, Checkbox, Input, message, Modal } from 'ant-design-vue';
import { debounce } from 'lodash';
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  type PropType,
  type Ref
} from 'vue';

export default defineComponent({
  name: 'TranslateModal',
  props: {
    handleClose: {
      type: Function as PropType<() => void>, // 泛型函数,
      required: true,
      default: () => {}
    },
    visible: {
      required: true,
      type: Boolean,
      default: false
    },
    transcriptId: {
      type: [String, null] as PropType<TranscriptId>,
      default: ''
    }
  },
  setup(props) {
    const { visible, transcriptId } = toRefs(props);
    const sentenceList: Ref<ITranscriptTextItem[]> = ref([]);
    const originalText: Ref<string> = ref('');
    const createdSummary: Ref<string> = ref('');
    const promptKeyWord: Ref<string> = ref('');
    const editRowNum: Ref<number> = ref(-1);

    onMounted(() => {
      (async () => {
        // if (!transcriptId.value) return;
        try {
          const res = await getTranscriptById(transcriptId.value || 'xxxxxx');
          sentenceList.value = res.sentences;
          transcriptId.value = res.transcriptId;
          originalText.value = res.text;
        } catch (error) {
          console.log('error', error);
        }
      })();
    });

    /** 选择列表 */
    const checkList: Ref<ITranscriptTextItem[]> = ref([]);

    /** 点击生成摘要 */
    const handleGenerateSummary = async () => {
      try {
        if (!transcriptId.value) return;
        const result = await createMoms({
          transcriptId: transcriptId.value,
          promptKeyWord: promptKeyWord.value,
          rowNum: checkList.value.map((check) => check.rowNum)
        });
        createdSummary.value = result;
      } catch (error) {}
    };
    /** 复制摘要 */
    const handleCopy = async () => {
      if (!createdSummary.value) return;
      try {
        await navigator.clipboard.writeText(createdSummary.value);
        message.success('复制成功');
      } catch (error) {}
    };

    /** 双击修改 */
    const handleDoubleClick = (rowNum: number) => {
      editRowNum.value = rowNum;
    };

    /** 更改选择项 */
    const handleEditText = debounce(
      async (params: { rowNum: number; content: string }) => {
        if (!transcriptId.value) return;
        try {
          const data = await editTranslateText({
            transcriptId: transcriptId.value,
            rowNum: params.rowNum,
            content: params.content
          });
          if (data) {
            message.success('修改成功');
            sentenceList.value = sentenceList.value.map((item) => {
              if (item.rowNum === params.rowNum) {
                return { ...item, content: params.content };
              }
              return item;
            });
          }
        } catch (error) {
          sentenceList.value = sentenceList.value.map((item) => {
            if (item.rowNum === params.rowNum) {
              return { ...item, content: params.content };
            }
            return item;
          });
          message.error('修改失败');
        }
      },
      300
    );

    return () => {
      return (
        <Modal
          open={visible.value}
          closable={true}
          centered={true}
          width={1400}
          title="会议纪要生成"
          onOk={() => {
            props.handleClose();
          }}
          footer={null}
          onCancel={props.handleClose}
          zIndex={1000}
          destroyOnClose={true}
        >
          <div class="flex h-[800px] p-4 flex-row">
            <div class="flex flex-col flex-1">
              <div class="h-5 font-bold border-b">
                <Checkbox
                  checked={checkList.value.length === sentenceList.value.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      checkList.value = sentenceList.value;
                    } else {
                      checkList.value = [];
                    }
                  }}
                >
                  全选
                </Checkbox>
              </div>
              <div class="flex-1 h-full overflow-auto">
                {sentenceList.value?.map((sentence) => {
                  return (
                    <div class="flex py-2" key={sentence.rowNum}>
                      <Checkbox
                        checked={
                          !!checkList.value.find(
                            (check) => check.rowNum === sentence.rowNum
                          )
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            checkList.value.push(sentence);
                          } else {
                            checkList.value = checkList.value.filter(
                              (check) => check.rowNum !== sentence.rowNum
                            );
                          }
                        }}
                      />
                      {editRowNum.value === sentence.rowNum ? (
                        <Input
                          class="ml-2"
                          value={sentence.content}
                          onChange={(e) =>
                            handleEditText({
                              rowNum: sentence.rowNum,
                              content: e.target.value || ''
                            })
                          }
                        />
                      ) : (
                        <span
                          class="ml-2"
                          onDblclick={() => handleDoubleClick(sentence.rowNum)}
                        >
                          {sentence.content}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div class="w-[400px] h-full flex flex-col">
              <div class="w-full">
                <div class="h-[400px] w-full border-[1px] border-gray-500 rounded-md p-2 overflow-auto">
                  {checkList.value.reduce((a, b) => a + b.content, '')}
                </div>
                <div class="flex justify-end">
                  <Button class="m-2" onClick={handleGenerateSummary}>
                    点击生成
                  </Button>
                </div>
              </div>
              <div class="flex-1 flex flex-col">
                <div class="h-6 flex justify-between">
                  <div class="leading-6 text-[16px] font-bold">生成结果：</div>
                  <Button onClick={handleCopy} size="small">
                    复制
                  </Button>
                </div>
                <div class="h-[280px]  w-full border-[1px] border-gray-500 rounded-md p-2 overflow-auto">
                  {createdSummary.value}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      );
    };
  }
});
