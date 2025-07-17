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
				console.log('GSAP 已加载，开始初始化动画');
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
		console.log('开始初始化动画');
		const { gsap, ScrollTrigger } = gsapInstance;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.post-card',
				start: 'top center',
				end: 'bottom center',
				scrub: true
			}
		});
        // videoRef.play();
		// videoRef.pause();
		videoRef.onloadedmetadata = () => {
			tl.to(
				videoRef,
				{ currentTime: videoRef.duration, duration: 3, ease: 'power1.inOut' },
				'<'
			);
		};
	}
</script>

<section class="post-card">
	<div class="animated-gradient-bg"></div>

	<div class="post-card-wrapper group hover:rotate-1 hover:-[1.02] transition duration-700">
		<img src="/images/overlay.webp" alt="" />

		<video
			bind:this={videoRef}
			muted
			playsInline
			autoPlay
			preload="auto"
			src="/videos/postcard-vd.mp4"
		></video>

		<button class="group-hover:bg-yellow transation duration-700"> Explore Leonida Keys </button>
	</div>
</section>
