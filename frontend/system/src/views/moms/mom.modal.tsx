/**
 * 會議紀要結果彈窗
 */
import { getMomsByTranscriptId, type TranscriptId } from '@/api/llmMom';
import { Modal } from 'ant-design-vue';
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
  type PropType,
  type Ref
} from 'vue';

export default defineComponent({
  name: 'MomsModal',
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
      required: true,
      type: [String, null] as PropType<TranscriptId>,
      default: null
    }
  },
  setup(props) {
    const { visible, transcriptId } = toRefs(props);
    const summary: Ref<string> = ref('');

    /** 文本紀要查詢 */
    const handleGetMomsByTranscriptId = async () => {
      try {
        if (transcriptId.value) {
          const res = await getMomsByTranscriptId(transcriptId.value);
          console.log('文本紀要查詢', res);
        }
      } catch (error) {}
    };

    onMounted(() => {
      if (transcriptId.value) {
        handleGetMomsByTranscriptId();
      }
    });

    watch(
      () => transcriptId.value,
      (newVal) => {
        if (newVal) {
          handleGetMomsByTranscriptId();
        }
      }
    );

    return () => {
      return (
        <Modal
          open={visible.value}
          closable={true}
          centered={true}
          width={400}
          title="会议纪要详情"
          onOk={() => {
            props.handleClose();
          }}
          footer={null}
          onCancel={props.handleClose}
          zIndex={1001}
        >
          <div class="flex h-[400px] p-4 flex-row">{summary.value}</div>
        </Modal>
      );
    };
  }
});
