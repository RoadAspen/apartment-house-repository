/**
 * icoder
 */
import request, { getUrlByParams } from '@/utils/request';

/** 开通ip人员 */
export interface User {
  /** 工号 */
  emp_no: string;
  /** 名字 */
  emp_name: string;
  /** 厂区 */
  site: string;
  /** 部级部门 */
  dept: string;
  /** 机能处 */
  fun_div: string;
  /** 机能处 code */
  fun_div_code: string;
  /** 事业处 */
  division: string;
  /** 事业处 code */
  division_code: string;
  /** 用户ip地址 */
  emp_ip: string[];
  /** 用户邮箱 */
  emp_mail: string;
  /** 创建人 */
  create_by: string;
  /** 创建时间 */
  create_time: string;
  /** 更新人 */
  update_by: string;
  /** 更新时间 */
  update_time: string;
  /** 0 未删除 1 已删除 */
  del_flag: 0 | 1;
  /** 备注 */
  remark: string;
}
/**
 * 获取用户列表
 * @param params emp_no 用户工号
 * @param params dept 部门名称
 * @param params fun_div 处级名称
 * @param params site 厂区
 * @param params page 页码
 * @param params page_size 每页条数
 * @returns
 */
export const getUserList = (params: {
  emp_no?: string;
  dept?: string;
  fun_div?: string;
  site?: string;
  page?: number;
  page_size?: number;
}): Promise<{ result: User[]; total: number }> => {
  console.log('params', params);

  return request({
    url: getUrlByParams('/icoder-gateway/v1/users', params),
    method: 'get'
  });
};

/**
 * 新增用户信息
 * @param emp_no 用户工号
 * @param emp_ip IP地址
 * @returns
 */
export const addUser = (data: {
  emp_no: string;
  emp_ip: string[];
}): Promise<User[]> => {
  return request({
    url: '/icoder-gateway/v1/users/create',
    method: 'post',
    data: data
  });
};

/**
 * 更新用户ip
 * @param emp_no 用户工号
 * @returns
 */
export const updateUser = (data: {
  emp_no: string;
  emp_ip: string[];
}): Promise<User[]> => {
  return request({
    url: `/icoder-gateway/v1/users/${data.emp_no}`,
    method: 'put',
    data: {
      emp_ip: data.emp_ip
    }
  });
};

/**
 * @description 切换账号状态
 * @params emp_no 人员工号
 * @params del_flag 账号状态
 */
export const toggleUserStatus = (emp_no: string, del_flag: number) => {
  return request({
    url: `/icoder-gateway/v1/users/toggle/${emp_no}/${del_flag}`,
    method: 'post'
  });
};
