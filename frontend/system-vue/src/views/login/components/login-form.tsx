import { useStorage } from '@vueuse/core';
import { Button, Checkbox, Form, FormItem } from 'ant-design-vue';
import { Link } from 'ant-design-vue/es/anchor';
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
      router.push('/dashboard/moms');
    };

    const setRememberPassword = (value: boolean) => {
      loginConfig.value.rememberPassword = value;
    };

    return () => (
      <div class="w-[320px] p-4">
        <div class="text-[24px] text-[var(--color-text-1)] text-center">
          登录
        </div>
        <div class="h-8 text-[rgb(var(--red-6))]">{errorMessage.value}</div>
        <Form
          ref="loginForm"
          model={userInfo}
          class="login-form"
          layout="vertical"
          onSubmit={handleSubmit}
        >
          <FormItem
            name="username"
            rules={[{ required: true, message: '用户名不能为空' }]}
            validateTrigger={['change', 'blur']}
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
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
            validateTrigger={['change', 'blur']}
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
          </FormItem>
          <div>
            <div class="flex justify-between mb-2">
              <Checkbox
                checked={loginConfig.value.rememberPassword}
                onChange={(e) =>
                  setRememberPassword((e.target as HTMLInputElement).checked)
                }
              >
                记住密码
              </Checkbox>
              <Link>忘记密码</Link>
            </div>
            <Button
              class="w-full mb-2"
              type="primary"
              html-type="submit"
              loading={loading.value}
            >
              登录
            </Button>
            <Button class="w-full !text-[var(--color-text-3)]">注册</Button>
          </div>
        </Form>
      </div>
    );
  }
});
