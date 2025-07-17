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

		gsap.set('.first-vd-wrapper', { marginTop: '-150vh', opacity: 0 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.first-vd-wrapper',
				start: 'top top',
				end: '+=200% top',
				scrub: true,
				pin: true
			}
		});
		tl.to('.hero-section', { delay: 0.5, opacity: 0, ease: 'power1.inOut' });
		tl.to('.first-vd-wrapper', { opacity: 1, duration: 2, ease: 'power1.inOut' });
		// 当视频的元数据加载完成时触发（比如视频时长、尺寸等信息）
		// 这个时候 video.duration 等属性就可以使用了
		videoRef.play();
		videoRef.pause();
		// 视频需要先 play 才能通过 currentTime 控制画面，然后立即 pause 并在 pause 事件中设置动画。
		videoRef.onpause  = () => {
			tl.to(videoRef, { currentTime: videoRef.duration, duration: 3, ease: 'power1.inOut' }, '<');
		};
		// };
	}
</script>

<section class="first-vd-wrapper">
	<div class="h-dvh">
		<video
			bind:this={videoRef}
			muted
			playsInline
			preload="auto"
			src="/videos/output1.mp4"
			class="first-vd"
		></video>
	</div>
</section>
