<template>
	<div class="flex h-lvh w-full">
		<div class="logo">
			<img
				alt="logo"
				src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
			/>
			<div class="logo-text">尚寓</div>
		</div>
		<LoginBanner />
		<div class="relative flex flex-1 items-center justify-center pb-[40px]">
			<div class="content-inner">
				<LoginForm />
			</div>
			<div class="absolute bottom-4 right-0 w-full">
				<Footer />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import Footer from '@/components/footer/index.vue';
	import LoginBanner from './components/banner.vue';
	import LoginForm from './components/login-form.vue';
</script>

<style lang="less" scoped>
	.logo {
		position: fixed;
		top: 24px;
		left: 22px;
		z-index: 1;
		display: inline-flex;
		align-items: center;

		&-text {
			margin-right: 4px;
			margin-left: 4px;
			color: var(--color-fill-1);
			font-size: 20px;
		}
	}
</style>
