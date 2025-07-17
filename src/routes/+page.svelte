<script>
	import '../app.css';
	import '../index.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Hero, NavBar, FirstVideo, Jason, SecondVideo, Lucia, PostCard,Final,Outro } from '$components';
	let gsap;
	let ScrollTrigger;

	onMount(async () => {
		if (browser) {
			// 1. 禁用滚动恢复
			// if ('scrollRestoration' in history) {
			// 	history.scrollRestoration = 'manual';
			// }
			// 2. 强制滚动到顶部
			window.scrollTo(0, 0);
			// 方案1：动态导入GSAP和插件（推荐）
			const gsapModule = await import('gsap');
			const scrollTriggerModule = await import('gsap/ScrollTrigger');

			gsap = gsapModule.default;
			ScrollTrigger = scrollTriggerModule.ScrollTrigger;

			// 注册插件
			gsap.registerPlugin(ScrollTrigger);

			// 现在可以安全地使用GSAP和ScrollTrigger
		}
	});
</script>

<main>
	<NavBar />
	<Hero />
	<FirstVideo />
	<Jason />
	<SecondVideo />
	<Lucia />
	<PostCard />
	<Final/>
	<Outro/>
</main>

<style>
	/* @reference "tailwindcss";
	:global(html) {
		background-color: theme(--color-gray-100);
	} */
</style>
