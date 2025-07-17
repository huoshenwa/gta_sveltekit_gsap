<script>
	import { gsapStore } from '$lib/stores/gsap.js';
	import { onDestroy, onMount } from 'svelte';
	/**
	 * @type {HTMLVideoElement}
	 */
	let videoRef; // 声明 videoRef 变量
	let unsubscribe = () => {}; // 订阅函数返回一个无返回无参清理函数
	onMount(() => {
		unsubscribe = gsapStore.subscribe((gsapInstance) => {
			if (gsapInstance) {
				initializeAnimation(gsapInstance);
			} else {
				console.log('GSAP 还未加载');
			}
		});
	});
	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
	/**
	 * @param {{ gsap: any; ScrollTrigger: any; }} gsapInstance
	 */
	function initializeAnimation(gsapInstance) {
		const { gsap, ScrollTrigger } = gsapInstance;
		gsap.set('.final-message', { marginTop: '-100vh', opacity: 0 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.final-message',
				start: 'top 30%',
				end: 'top 10%',
				scrub: true
			}
		});

		tl.to('.final-content', { opacity: 0, duration: 1, ease: 'power1.inOut' });
		tl.to('.final-message', { opacity: 1, duration: 1, ease: 'power1.inOut' });
	}
</script>

<section class="final-message">
	<div class="h-full col-center gap-10">
		<img src="/images/logo.webp" alt="logo" class="md:w-72 w-52" />

		<div>
			<h3 class="gradient-title">
				Coming <br /> May 26th <br /> 2026
			</h3>
		</div>

		<div class="flex-center gap-10">
			<img src="/images/ps-logo.svg" class="md:w-32 w-20" />
			<img src="/images/x-logo.svg" class="md:w-52 w-40" />
		</div>
	</div>
</section>
