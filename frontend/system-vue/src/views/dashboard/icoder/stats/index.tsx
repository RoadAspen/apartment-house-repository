import { useStatsStore } from '@/stores/stats'; // 引入 Pinia store
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Spin,
  Table
} from 'ant-design-vue';
import { defineComponent } from 'vue';

// 引入 ECharts 相关组件

export default defineComponent({
  name: 'StatsPage',
  setup() {
    const statsStore = useStatsStore(); // 使用 Pinia store
    const fetchStatsData = async () => {
      // 获取数据的时间范围
      const { startDate, endDate } = statsStore;

      // 调用 Pinia store 中的 fetchStatsData 方法
      await statsStore.fetchStatsData(startDate, endDate);
    };

    // 日期选择变化时的回调函数
    const onDateChange = (dates: any) => {
      statsStore.startDate = dates[0].format('YYYY-MM-DD');
      statsStore.endDate = dates[1].format('YYYY-MM-DD');
    };

    // 配置每日请求统计的折线图
    const lineChartConfig = {
      xAxis: {
        type: 'category',
        data: statsStore.dailyRequests.map((item: any) => item.date) // 日期
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: statsStore.dailyRequests.map((item: any) => item.count), // 请求数量
          type: 'line',
          smooth: true
        }
      ]
    };

    // 配置请求类型统计的饼图
    const pieChartConfig = {
      series: [
        {
          type: 'pie',
          radius: '70%',
          data: [
            { value: statsStore.cmplRequests, name: 'CMPL Requests' },
            { value: statsStore.chatcmplRequests, name: 'ChatCMPL Requests' }
          ],
          emphasis: {
            itemStyle: {
              borderWidth: 3,
              borderColor: '#fff',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    // 用户请求次数 Top10 的表格列配置
    const userTableColumns = [
      { title: '用户ID', dataIndex: 'emp_no', key: 'emp_no' }, // 用户 ID
      { title: '请求次数', dataIndex: 'request_count', key: 'request_count' } // 请求次数
    ];

    // 返回组件渲染内容
    return () => (
      <div style={{ padding: '20px' }}>
        {/* 统计概览卡片 */}
        <Card title="统计概览" bordered={false}>
          <Row gutter={16}>
            <Col span={8}>
              <h3>开通人数总数: {statsStore.totalUsers}</h3>
            </Col>
            <Col span={8}>
              <h3>活跃人数总数: {statsStore.activeUsers}</h3>
            </Col>
            <Col span={8}>
              <h3>请求总数: {statsStore.totalRequests}</h3>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <h3>采纳总数: {statsStore.acceptedRequests}</h3>
            </Col>
            <Col span={8}>
              <h3>采纳率: {statsStore.acceptanceRate}%</h3>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              {/* 日期选择组件 */}
              <DatePicker.RangePicker
                onChange={onDateChange} // 日期变化时调用
                format="YYYY-MM-DD" // 格式
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={8}>
              {/* 获取数据按钮 */}
              <Button type="primary" onClick={fetchStatsData}>
                获取数据
              </Button>
            </Col>
          </Row>
        </Card>

        {/* 数据加载时显示加载动画 */}
        <Spin spinning={statsStore.loading}>
          {/* 每日请求统计折线图 */}
          <Card title="每日请求统计" bordered={false}>
            <div
              ref={siteChartRef}
              option={lineChartConfig}
              style={{ height: '400px' }}
            />
          </Card>

          <Row gutter={16}>
            <Col span={12}>
              {/* 请求类型统计饼图 */}
              <Card title="请求类型统计" bordered={false}>
                <VueECharts
                  option={pieChartConfig}
                  style={{ height: '400px' }}
                />
              </Card>
            </Col>
            <Col span={12}>
              {/* 用户请求次数 Top10 表格 */}
              <Card title="用户请求次数 Top10" bordered={false}>
                <Table
                  dataSource={statsStore.userTop10}
                  columns={userTableColumns}
                  rowKey="emp_no"
                  pagination={{ pageSize: 10 }} // 分页
                />
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
    );
  }
});
