import { useStorage } from '@vueuse/core';
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const errorMessage = ref('');
    const loading = ref(false);
    const loginConfig = useStorage('login-config', {
      rememberPassword: true,
      username: 'admin', // 演示默认值
      password: 'admin' // demo default value
    });
    const userInfo = reactive({
      username: loginConfig.value.username,
      password: loginConfig.value.password
    });

    const handleSubmit = async () => {
      // 登录逻辑
    };

    const setRememberPassword = (value: boolean) => {
      loginConfig.value.rememberPassword = value;
    };

    return () => (
      <div class="w-[320px] p-4">
        <div class="text-[24px] text-bold text-[var(--color-text-1)] text-center">
          登录
        </div>
        <div class="text-[16px] text-[var(--color-text-3)]  text-center">
          开始登录
        </div>
        <div class="h-8 text-[rgb(var(--red-6))]">{errorMessage.value}</div>
        <a-form
          ref="loginForm"
          model={userInfo}
          class="login-form"
          layout="vertical"
          onSubmit={handleSubmit}
        >
          <a-form-item
            field="username"
            rules={[{ required: true, message: '用户名不能为空' }]}
            validateTrigger={['change', 'blur']}
            hideLabel
          >
            <a-input
              value={userInfo.username}
              onInput={(e: Event) =>
                (userInfo.username = (e.target as HTMLInputElement).value)
              }
              placeholder="请输入用户名"
            >
              <icon-user />
            </a-input>
          </a-form-item>
          <a-form-item
            field="password"
            rules={[{ required: true, message: '密码不能为空' }]}
            validateTrigger={['change', 'blur']}
            hideLabel
          >
            <a-input-password
              value={userInfo.password}
              onInput={(e: Event) =>
                (userInfo.password = (e.target as HTMLInputElement).value)
              }
              placeholder="请输入密码"
              allowClear
            >
              <icon-lock />
            </a-input-password>
          </a-form-item>
          <a-space size="16" direction="vertical">
            <div class="flex justify-between">
              <a-checkbox
                checked={loginConfig.value.rememberPassword}
                onChange={(e: Event) =>
                  setRememberPassword((e.target as HTMLInputElement).checked)
                }
              >
                记住密码
              </a-checkbox>
              <a-link>忘记密码</a-link>
            </div>
            <a-button
              type="primary"
              html-type="submit"
              long
              loading={loading.value}
            >
              登录
            </a-button>
            <a-button type="text" long class="!text-[var(--color-text-3)]">
              注册
            </a-button>
          </a-space>
        </a-form>
      </div>
    );
  }
});
