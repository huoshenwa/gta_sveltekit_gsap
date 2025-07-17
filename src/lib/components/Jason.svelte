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
		gsap.set('.jason', { marginTop: '-80vh' });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: '.jason',
					start: 'top 90%',
					end: '10% center',
					scrub: 2
				}
			})
			.to('.first-vd', { opacity: 0, duration: 1, ease: 'power1.inOut' });
            // 就一个动画貌似可以直接写：
		// gsap.to('.first-vd', {
		// 	opacity: 0,
		// 	duration: 1,
		// 	ease: 'power1.inOut',
		// 	scrollTrigger: {
		// 		trigger: '.jason',
		// 		start: 'top 90%',
		// 		end: '10% center',
		// 		scrub: 2
		// 	}
		// });
		gsap.to(
			'.jason .img-box',
			{
				scrollTrigger: {
					trigger: '.jason',
					start: 'top center',
					end: '80% center',
					scrub: 2
				},
				y: -300,
				duration: 1,
				ease: 'power1.inOut'
			},
			'<'
		);
	}
</script>

<section class="jason">
	<div class="max-w-lg jason-content">
		<h1>Jason Duval</h1>
		<h2>Jason wants an easy life, but things just keep getting harder.</h2>
		<p>
			Jason grew up around grifters and crooks. After a stint in the Army trying to shake off his
			troubled teens, he found himself in the Keys doing what he knows best, working for local drug
			runners. It might be time to try something new.
		</p>

		<div class="jason-2">
			<img src="/images/jason-2.webp" alt="" />
		</div>
	</div>

	<div class="space-y-5 mt-96 img-box">
		<div class="jason-1">
			<img src="/images/jason-1.webp" alt="" />
		</div>
		<div class="jason-3">
			<img src="/images/jason-3.webp" alt="" />
		</div>
	</div>
</section>
