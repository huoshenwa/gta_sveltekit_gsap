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

		gsap.set('.lucia', { marginTop: '-60vh', opacity: 0 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.lucia',
				start: 'top top',
				end: 'bottom top',
				scrub: 2,
				pin: true
			}
		});

		tl.to('.lucia', { opacity: 1, duration: 1, ease: 'power1.inOut' });
		// 当视频的元数据加载完成时触发（比如视频时长、尺寸等信息）
		// 这个时候 video.duration 等属性就可以使用了
		videoRef.play();
		videoRef.pause();
		// 视频需要先 play 才能通过 currentTime 控制画面，然后立即 pause 并在 pause 事件中设置动画。
		videoRef.onpause = () => {
			tl.to(videoRef, { currentTime: videoRef.duration, duration: 3, ease: 'power1.inOut' }, '<');
		};
		// };
	}
</script>

<section class="lucia">
	<div class="h-dvh">
		<video
			bind:this={videoRef}
			muted
			playsInline
			preload="auto"
			src="/videos/output2.mp4"
			class="size-full object-cover second-vd"
			 style="object-position: 15% 0%"
		></video>
	</div>
</section>
