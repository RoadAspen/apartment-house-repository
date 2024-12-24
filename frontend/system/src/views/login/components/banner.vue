<template>
	<div class="flex items-center justify-center h-full w-[550px] bg-[#00308f]">
		<div class="flex flex-col items-center justify-center">
			<div class="font-bold text-[20px] line-[28px] text-white mb-3">
				公寓后端管理系统
			</div>
			<div
				class="margin-top-[10px] text-[14px] line-[22px] text-[var(--color-text-3)]"
			>
				提供一站式的公寓管理解决方案
			</div>
			<img class="w-[320px] mt-[30px]" :src="bannerImage" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import bannerImage from '@/assets/images/login-banner.png';
</script>

<style lang="less" scoped></style>
