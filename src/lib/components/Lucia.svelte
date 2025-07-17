<script>
	import { gsapStore } from '$lib/stores/gsap.js';
	import { onDestroy, onMount } from 'svelte';
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
		console.log('开始初始化动画');

		const { gsap, ScrollTrigger } = gsapInstance;

		// 你的动画代码
		gsap.set('.lucia-life', { marginTop: '-80vh' });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: '.lucia-life',
					start: 'top 80%',
					end: '10% center',
					scrub: 2
				}
			})
			.to('.second-vd', { opacity: 0, duration: 1, ease: 'power1.inOut' });

		gsap.to(
			'.lucia-life .img-box',
			{
				scrollTrigger: {
					trigger: '.lucia-life',
					start: 'top center',
					end: '80% center',
					scrub: 2
				},
				y: -200,
				duration: 1,
				ease: 'power1.inOut'
			},
			'<'
		);
	}
</script>

<section class="lucia-life">
	<div class="flex flex-col gap-5 items-end img-box lg:1/2 ps-10 mt-96">
		<div class="lucia-1">
			<img src="/images/lucia-1.webp" alt="" />
		</div>
		<div class="lucia-3">
			<img src="/images/lucia-3.webp" alt="" />
		</div>
	</div>

	<div class="lg:w-1/2 lucia-life-content">
		<div class="max-w-xl lg:ps-32 ps-10">
			<h1>Lucia Caminos</h1>
			<h2>Lucia’s father taught her to fight as soon as she could walk.</h2>
			<p>
				Life has been coming at her swinging ever since. Fighting for her family landed her in the
				Leonida Penitentiary. Sheer luck got her out. Lucia’s learned her lesson — only smart moves
				from here.
			</p>
		</div>

		<div class="lucia-2">
			<img src="/images/lucia-2.webp" alt="" />
		</div>

		<p class="max-w-xl lg:ps-32 ps-10">
			More than anything, Lucia wants the good life her mom has dreamed of since their days in
			Liberty City — but instead of half-baked fantasies, Lucia is prepared to take matters into her
			own hands.
		</p>
	</div>
</section>
