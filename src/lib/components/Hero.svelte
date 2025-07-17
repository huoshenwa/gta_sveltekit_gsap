<script>
	import ComingSoon from './ComingSoon.svelte';
	import { getMaskSettings } from '$lib/constants/index.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { gsapStore } from '$lib/stores/gsap.js';
	let { initialMaskPos, initialMaskSize, maskPos, maskSize } = getMaskSettings();
	let unsubscribe = () => {}; // 订阅函数返回一个无返回无参清理函数

	onMount(() => {
		console.log('onMount 开始执行');

		unsubscribe = gsapStore.subscribe((gsapInstance) => {
			// console.log('subscribe 回调被调用，值是:', gsapInstance);
			// console.log('typeof gsapInstance:', typeof gsapInstance);
			// console.log('gsapInstance 是否为 null:', gsapInstance === null);
			// console.log('gsapInstance 是否为 undefined:', gsapInstance === undefined);

			if (gsapInstance) {
				// console.log('GSAP 已加载，开始初始化动画');
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

		// 客户端重新获取准确的设置
		const settings = getMaskSettings();
		({ initialMaskPos, initialMaskSize, maskPos, maskSize } = settings);

		const { gsap, ScrollTrigger } = gsapInstance;

		// 你的动画代码
		gsap.set('.mask-wrapper', {
			maskPosition: initialMaskPos,
			maskSize: initialMaskSize
		});
		gsap.set('.mask-logo', { marginTop: '-100vh', opacity: 0 });
		gsap.set('.entrance-message', { marginTop: '0vh' });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.hero-section',
				start: 'top top',
				scrub: 2.5,
				end: '+=200%',
				pin: true,
				markers: true
			}
		});

		tl.to('.fade-out', { opacity: 0, ease: 'power1.inOut' })
			.to('.scale-out', {
				scale: 1,
				ease: 'power1.inOut'
			})
			.to('.mask-wrapper', { maskSize, ease: 'power1.inOut' }, '<')
			.to('.mask-wrapper', { opacity: 0 })
			.to(
				'.overlay-logo',
				{
					opacity: 1,
					onComplete: () => {
						gsap.to('.overlay-logo', { opacity: 0 });
					}
				},
				'<'
			)
			.to(
				'.entrance-message',
				{
					duration: 1,
					ease: 'power1.inOut',
					maskImage: 'radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)'
				},
				'<'
			);
	}
</script>

<section class="hero-section">
	<div class="size-full mask-wrapper">
		<img src="/images/hero-bg.webp" alt="background" class="scale-out" />
		<img src="/images/hero-text.webp" alt="hero-logo" class="title-logo fade-out" />
		<img src="/images/watch-trailer.png" alt="trailer" class="trailer-logo fade-out" />
		<div class="play-img fade-out">
			<img src="/images/play.png" alt="play" class="w-7 ml-1" />
		</div>
	</div>

	<div>
		<img src="/images/big-hero-text.svg" alt="logo" class="size-full object-cover mask-logo" />
	</div>

	<div class="fake-logo-wrapper">
		<img src="/images/big-hero-text.svg" class="overlay-logo" alt="sd" />
	</div>

	<ComingSoon />
</section>
