import { type User } from '@/api/icoder';
import { useUserStore } from '@/stores/user';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tag,
  message
} from 'ant-design-vue';
import type { ColumnType } from 'ant-design-vue/es/table';
import { defineComponent, onMounted, reactive, ref, type Reactive } from 'vue';

export default defineComponent({
  name: 'icoder',
  setup() {
    const userStore = useUserStore();
    const userForm: Reactive<{ emp_no: string; emp_ip: string[] }> = reactive({
      emp_no: '',
      emp_ip: []
    });
    /** 编辑弹窗 */
    const isModalVisible = ref(false);
    /** 是否是编辑态 */
    const isEditing = ref(false);

    onMounted(() => {
      userStore.getUserList({ page: 1 });
    });
    /** 筛选查询请求 */
    const handleSearch = async () => {
      await userStore.getUserList({ page: 1 });
    };

    /** 清空筛选项 */
    const handleReset = () => {
      Object.assign(userStore.filters, {
        emp_no: '',
        dept: '',
        site: '',
        fun_div: '',
        del_flag: ''
      });
      userStore.getUserList({ page: 1 });
    };
    /** 新增用户 */
    const handleAdd = () => {
      isEditing.value = false;
      userForm.emp_no = '';
      userForm.emp_ip = [];
      isModalVisible.value = true;
    };

    /** 点击编辑 */
    const handleEdit = (record: User) => {
      isEditing.value = true;
      userForm.emp_no = record.emp_no;
      userForm.emp_ip = record.emp_ip;
      isModalVisible.value = true;
    };

    /** 点击切换用户状态 */
    const handleToggleUserStatus = async (emp_no: string, del_flag: number) => {
      await userStore.changeUserStatus(emp_no, del_flag);
    };

    const handleOk = async () => {
      try {
        if (isEditing.value) {
          await userStore.updateUserInfo(userForm);
        } else {
          await userStore.createUser(userForm);
        }
        handleSearch();
        isModalVisible.value = false;
      } catch (error) {
        console.log(error);
      }
    };

    const tableColumn: ColumnType<User>[] = [
      {
        title: '工号',
        key: 'emp_no',
        dataIndex: 'emp_no'
      },
      {
        title: '姓名',
        dataIndex: 'emp_name'
      },
      {
        title: '厂区',
        dataIndex: 'site'
      },
      {
        title: '部门',
        dataIndex: 'dept'
      },
      {
        title: '处级',
        dataIndex: 'fun_div'
      },
      {
        title: 'ip地址',
        dataIndex: 'emp_ip',
        customRender({ value }) {
          return value.join(',');
        }
      },
      {
        title: '状态',
        dataIndex: 'del_flag',
        customRender({ value }) {
          if (value === 0) {
            return <Tag color="#1f952d">正常</Tag>;
          } else {
            return <Tag color="#c7c8c9">停用</Tag>;
          }
        }
      },
      {
        title: '操作',
        key: 'action'
      }
    ];
    return () => (
      <div class="flex flex-col h-full overflow-hidden">
        <div class="px-5 pt-5 pb-2 flex-shrink-0 bg-white">
          <Form layout="inline">
            <Row gutter={[16, 16]}>
              <Col>
                <Form.Item
                  label="工号"
                  style={{ 'magin-bottom': '20px!important' }}
                >
                  <Input
                    value={userStore.filters.emp_no}
                    onChange={(e) => {
                      userStore.changeFilter('emp_no', e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="厂区">
                  <Input
                    value={userStore.filters.site}
                    onChange={(e) => {
                      userStore.changeFilter('site', e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="部门">
                  <Input
                    value={userStore.filters.dept}
                    onChange={(e) => {
                      userStore.changeFilter('dept', e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="处级部门">
                  <Input
                    value={userStore.filters.fun_div}
                    onChange={(e) => {
                      userStore.changeFilter('fun_div', e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="账号状态">
                  <Select
                    style={{ width: '80px' }}
                    value={userStore.filters.del_flag}
                    onSelect={(value: any) => {
                      userStore.changeFilter('del_flag', value);
                    }}
                    allowClear={true}
                    onClear={() => {
                      userStore.changeFilter('del_flag', '');
                    }}
                  >
                    <Select.Option value={0}>正常</Select.Option>
                    <Select.Option value={1}>停用</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button type="primary" onClick={handleSearch}>
                    搜索
                  </Button>
                  <Button class="ml-2 mr-5" onClick={handleReset}>
                    重置
                  </Button>
                  <Button type="primary" onClick={handleAdd}>
                    新增用户
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div class="flex-1 p-2 overflow-auto">
          <Table
            columns={tableColumn}
            dataSource={userStore.userList}
            rowKey={(record: User) => record.emp_no}
            bordered={true}
            pagination={{
              current: userStore.pagination.current,
              pageSize: userStore.pagination.pageSize,
              total: userStore.total
            }}
            onChange={(pagination) => {
              userStore.pagination.current = pagination.current || 1;
              userStore.pagination.pageSize = pagination.pageSize || 10;
              userStore.getUserList();
            }}
            scroll={{ y: 'max-content' }}
            v-slots={{
              bodyCell: ({
                column,
                record
              }: {
                column: ColumnType;
                record: User;
              }) => {
                if (column.key === 'action') {
                  return (
                    <span>
                      <Button type="link" onClick={() => handleEdit(record)}>
                        编辑
                      </Button>
                      <Button
                        type="link"
                        danger={record.del_flag === 1 ? false : true}
                        onClick={() =>
                          handleToggleUserStatus(
                            record.emp_no,
                            record.del_flag === 0 ? 1 : 0
                          )
                        }
                      >
                        {record.del_flag === 0 ? '停用' : '启用'}
                      </Button>
                    </span>
                  );
                }
              }
            }}
          />
        </div>

        <Modal
          open={isModalVisible.value}
          onOk={handleOk}
          onCancel={() => (isModalVisible.value = false)}
          title={isEditing.value ? '编辑' : '新增'}
        >
          <Form ref="formRef" model={userForm} layout="vertical">
            <Form.Item label="工号">
              <Input
                value={userForm.emp_no}
                disabled={isEditing.value}
                placeholder="请输入工号"
                onChange={(e) => {
                  if (e.target.value) {
                    userForm.emp_no = e.target.value;
                  } else {
                    message.error('ip不能为空');
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="IP地址">
              <Input
                value={userForm.emp_ip.join(',')}
                placeholder="请输入ip地址，多个ip用英文逗号隔开"
                onChange={(e) => {
                  if (e.target.value) {
                    userForm.emp_ip = e.target.value.split(',');
                  } else {
                    message.error('ip不能为空');
                  }
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
});
