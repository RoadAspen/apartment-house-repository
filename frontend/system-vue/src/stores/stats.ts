import { getSummary } from '@/api/icoder'; // 你可以根据项目需要修改这里的api工具
import { defineStore } from 'pinia';
import { ref } from 'vue';

// 定义 Pinia store
export const useStatsStore = defineStore('stats', () => {
  /**
   * 开通用户总数
   */
  const totalUsers = ref(0);
  /**
   * 近七日活跃用户数
   */
  const activeUsers = ref(0);

  // 获取开通人数和活跃人数
  const fetchUserStats = async () => {
    try {
      const response = await getSummary();
      totalUsers.value = response.data.total_users;
      activeUsers.value = response.data.active_users;
    } catch (error) {
      console.error('Error fetching user stats', error);
    } finally {
      loading.value = false;
    }
  };

  // 获取请求总数
  const fetchRequestCounts = async () => {
    loading.value = true;
    try {
      const response = await getSummary();
      totalRequests.value = response.data.total_requests;
      cmplRequests.value = response.data.cmpl_requests;
      chatcmplRequests.value = response.data.chatcmpl_requests;
    } catch (error) {
      console.error('Error fetching request counts', error);
    } finally {
      loading.value = false;
    }
  };

  // 计算采纳率
  const fetchAcceptanceStats = async () => {
    loading.value = true;
    try {
      const response = await getSummary();
      acceptanceRate.value = response.data.acceptance_rate;
      acceptedRequests.value = response.data.accepted_requests;
    } catch (error) {
      console.error('Error fetching acceptance stats', error);
    } finally {
      loading.value = false;
    }
  };

  // 获取每日请求次数
  const fetchDailyRequests = async () => {
    loading.value = true;
    try {
      const response = await getSummary();
      dailyRequests.value = response.data.daily_requests;
    } catch (error) {
      console.error('Error fetching daily requests', error);
    } finally {
      loading.value = false;
    }
  };

  // 获取用户请求次数 Top10
  const fetchUserTop10 = async () => {
    loading.value = true;
    try {
      const response = await getSummary();
      userTop10.value = response.data.top_users;
    } catch (error) {
      console.error('Error fetching user top10', error);
    } finally {
      loading.value = false;
    }
  };

  // 将所有 API 调用拆成单独的方法，可以根据需求进行调用
  const fetchStatsData = async () => {
    await fetchUserStats();
    await fetchRequestCounts();
    await fetchAcceptanceStats();
    await fetchDailyRequests();
    await fetchUserTop10();
  };

  // 返回 store 中的所有状态和方法
  return {
    totalUsers,
    activeUsers,
    totalRequests,
    cmplRequests,
    chatcmplRequests,
    acceptanceRate,
    acceptedRequests,
    dailyRequests,
    userTop10,
    loading,
    fetchUserStats,
    fetchRequestCounts,
    fetchAcceptanceStats,
    fetchDailyRequests,
    fetchUserTop10,
    fetchStatsData
  };
});
