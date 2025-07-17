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
		gsap.set('.final-content', { opacity: 0 });
        
		gsap.timeline({
			scrollTrigger: {
				trigger: '.final',
				start: 'top top',
				end: '90% top',
				scrub: true,
				pin: true
			}
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.final',
				start: 'top 80%',
				end: '90% top',
				scrub: true
			}
		});

		tl.to('.final-content', { opacity: 1, duration: 1, scale: 1, ease: 'power1.inOut' });
		videoRef.play();
		videoRef.pause();
		videoRef.onpause = () => {
			tl.to(videoRef, { currentTime: videoRef.duration, duration: 3, ease: 'power1.inOut' }, '<');
		};
	}
</script>

<section class="final">
	<div class="final-content size-full">
		<video
			bind:this={videoRef}
			muted
			playsInline
			preload="auto"
			src="/videos/output3.mp4"
			class="size-full object-cover"
		></video>
	</div>
</section>
