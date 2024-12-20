<template>
	<div class="login-form-wrapper">
		<div class="login-form-title">登录</div>
		<div class="login-form-sub-title">开始登录</div>
		<div class="login-form-error-msg">{{ errorMessage }}</div>
		<a-form
			ref="loginForm"
			:model="userInfo"
			class="login-form"
			layout="vertical"
			@submit="handleSubmit"
		>
			<a-form-item
				field="username"
				:rules="[{ required: true, message: '用户名' }]"
				:validate-trigger="['change', 'blur']"
				hide-label
			>
				<a-input v-model="userInfo.username" :placeholder="'请输入用户名'">
					<template #prefix>
						<icon-user />
					</template>
				</a-input>
			</a-form-item>
			<a-form-item
				field="password"
				:rules="[{ required: true, message: '密码' }]"
				:validate-trigger="['change', 'blur']"
				hide-label
			>
				<a-input-password
					v-model="userInfo.password"
					:placeholder="'请输入密码'"
					allow-clear
				>
					<template #prefix>
						<icon-lock />
					</template>
				</a-input-password>
			</a-form-item>
			<a-space :size="16" direction="vertical">
				<div class="login-form-password-actions">
					<a-checkbox
						checked="rememberPassword"
						:model-value="loginConfig.rememberPassword"
						@change="setRememberPassword as any"
					>
						记住密码
					</a-checkbox>
					<a-link>忘记密码</a-link>
				</div>
				<a-button type="primary" html-type="submit" long :loading="loading">
					登录
				</a-button>
				<a-button type="text" long class="login-form-register-btn">
					注册
				</a-button>
			</a-space>
		</a-form>
	</div>
</template>

<script lang="ts" setup>
	import { ref, reactive } from 'vue';
	import { useRouter } from 'vue-router';
	import { useStorage } from '@vueuse/core';

	const router = useRouter();
	const errorMessage = ref('');
	const loading = ref(false);

	const loginConfig = useStorage('login-config', {
		rememberPassword: true,
		username: 'admin', // 演示默认值
		password: 'admin', // demo default value
	});
	const userInfo = reactive({
		username: loginConfig.value.username,
		password: loginConfig.value.password,
	});

	const handleSubmit = async ({
		errors,
		values,
	}: {
		errors: Record<string, any> | undefined;
		values: Record<string, any>;
	}) => {};
	const setRememberPassword = (value: boolean) => {
		loginConfig.value.rememberPassword = value;
	};
</script>

<style lang="less" scoped>
	.login-form {
		&-wrapper {
			width: 320px;
		}

		&-title {
			color: var(--color-text-1);
			font-weight: 500;
			font-size: 24px;
			line-height: 32px;
		}

		&-sub-title {
			color: var(--color-text-3);
			font-size: 16px;
			line-height: 24px;
		}

		&-error-msg {
			height: 32px;
			color: rgb(var(--red-6));
			line-height: 32px;
		}

		&-password-actions {
			display: flex;
			justify-content: space-between;
		}

		&-register-btn {
			color: var(--color-text-3) !important;
		}
	}
</style>
