/**
 * 智能会议纪要
 */
import request from '@/utils/request';

/**
 * 上传
 * @param file
 * @returns
 */
export const uploadAudioFile = (file: File) => {
  return request({
    url: '/api/v1/audios',
    method: 'post',
    data: {
      file: file,
      title: '会议纪要'
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
/** 音频状态枚举 */
export enum AudioMomsStatusEnum {
  /** （音頻已上傳）音頻轉譯中。 */
  transcribing = 'transcribing',
  /** （音頻已轉譯，等待生成會議紀要。） */
  pendingSummary = 'pendingSummary',
  /** （會議紀要正在生成中。） */
  generatingSummary = 'generatingSummary',
  /** （會議紀要已生成完成。） */
  summaryGenerated = 'summaryGenerated'
}
export interface IMomItem {
  /** 紀要唯一標識，UUID */
  momId: string;
  /** 紀要版本，如 "V1"、"V2"、"V3"。*/
  version: string;
  /** 紀要生成時間，格式為 YYYY-MM-DD HH24:MI:SS。 */
  generatedTime: string;
}
/** 轉譯id */
export type TranscriptId = string | null;
/** 单个音频信息 */
export interface IAudioItem {
  /** 音頻唯一標識，UUID */
  id: string;
  /** 音頻標題。 */
  title: string;
  /** 音頻時長（秒）。 */
  durationSeconds: number;
  /** 音頻文件大小（字節）。 */
  sizeBytes: number;
  /** 音頻格式，如 MP3。 */
  format: string;
  /** 音頻獲取路由，完整 URL。 */
  url: string;
  /** 音頻上傳時間，格式為 YYYY-MM-DD HH24:MI:SS。 */
  uploadedTime: string;
  /** 音頻狀態。  */
  status: AudioMomsStatusEnum;
  /** 轉譯初始文本的 ID，若未轉譯則為 null。 */
  transcriptId: TranscriptId;
  /** 預置的會議紀要生成 Prompt 列表，包含三個字串元素。 */
  prompts: string[];
  /** 紀要列表，若未生成則為空列表。 */
  moms: IMomItem[];
}
/**
 * 获取音频上传列表
 * @param file
 * @returns
 */
export const getAudioList = (): Promise<{ audios: IAudioItem[] }> => {
  return request({
    url: '/api/v1/audios',
    method: 'get'
  });
};

/**
 * 音频转换为文本,发起任务
 * @param audioId {string} 音頻的唯一標識，UUID
 * @returns
 */
export const transcriptAudio = (audioId: string): Promise<any> => {
  return request({
    url: `/api/v1/audios/${audioId}/transcripts`,
    method: 'post'
  });
};
/** 单个句子 */
export interface ITranscriptTextItem {
  /**句子在文本中的順序，由 1 開始遞增。 */
  rowNum: number;
  /** 句子的文本內容。 */
  content: string;
}
/** 获取转译文本接口返回值 */
export interface ITranscriptResponse {
  /** 轉譯文本 ID，UUID，無轉譯文本時為 null。 */
  transcriptId: string;
  /** 完整文本內容，無轉譯文本時為 null。 */
  text: string;
  /** 句子對象列表，無轉譯文本時為空數組。 */
  sentences: ITranscriptTextItem[];
}

/**
 * 轉譯文本查詢
 * @param transcriptId 轉譯文本唯一標識，UUID。
 * @returns
 */
export const getTranscriptById = (
  transcriptId: string
): Promise<ITranscriptResponse> => {
  return request({
    url: `/api/v1/transcripts/${transcriptId}`,
    method: 'get'
  });
};

/**
 * 轉譯文本编辑
 * @param transcriptId 轉譯文本唯一標識，UUID。
 * @param rowNum 句子在文本中的順序，由 1 開始遞增。
 * @returns
 */
export const editTranslateText = (params: {
  transcriptId: string;
  rowNum: number;
  content: string;
}) => {
  const { transcriptId, rowNum, content } = params;
  return request({
    url: `/api/v1/transcripts/${transcriptId}/sentences/${rowNum}`,
    method: 'put',
    data: {
      content: content
    }
  });
};

/**
 * 文本紀要生成
 * @param transcriptId {string} 轉譯文本唯一標識，UUID。
 * @param promptKeyWord {string} 選用的會議紀要生成風格的關鍵字。
 * @param rowNum 包含用戶選擇的行 num 列表（用於紀要生成的實際文本拼接）。

 * @returns
 */
export const createMoms = (params: {
  transcriptId: string;
  promptKeyWord: string;
  rowNum: number[];
}): Promise<string> => {
  const { transcriptId, promptKeyWord, rowNum } = params;

  return request({
    url: `/api/v1/transcripts/${transcriptId}/moms`,
    method: 'post',
    data: {
      promptKeyWord,
      rowNum
    }
  });
};
interface IMoms {
  /** 紀要唯一標識，UUID。 */
  momId: string;
  /** 紀要版本，如 "V1"、"V2"、"V3"… */
  version: string;
  /** 紀要完整文本內容。 */
  content: string;
  /** 紀要生成時間，格式為 YYYY-MM-DD HH24:MI:SS。 */
  generatedTime: string;
}
/**
 * 文本紀要查詢
 * @param transcriptId
 * @returns
 */
export const getMomsByTranscriptId = (
  transcriptId: string
): Promise<{ moms: IMoms }> => {
  return request({
    url: `/api/v1/transcripts/${transcriptId}/moms`,
    method: 'get'
  });
};
