<script setup lang="ts">
	import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
	<router-view v-slot="{ Component }">
		<transition>
			<component :is="Component" />
		</transition>
	</router-view>
</template>
