<script>
	import { gsapStore } from '$lib/stores/gsap.js';
	import { onDestroy, onMount } from 'svelte';
	
	/**
	 * @type {HTMLVideoElement}
	 */
	let videoRef;
	let unsubscribe = () => {};
	let animationInitialized = false; // 防止重复初始化

	onMount(() => {
		unsubscribe = gsapStore.subscribe((gsapInstance) => {
			if (gsapInstance && !animationInitialized) {
				console.log('GSAP 已加载，开始初始化动画');
				initializeAnimation(gsapInstance);
				animationInitialized = true;
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
	async function initializeAnimation(gsapInstance) {
		console.log('开始初始化动画');
		const { gsap, ScrollTrigger } = gsapInstance;

		// 等待视频元素存在
		if (!videoRef) {
			console.log('视频元素还未准备好');
			return;
		}

		gsap.set('.first-vd-wrapper', { marginTop: '-150vh', opacity: 0 });

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.first-vd-wrapper',
				start: 'top top',
				end: '+=200% top',
				scrub: true,
				pin: true,
				onUpdate: (/** @type {{ progress: any; }} */ self) => {
					// 调试：输出滚动进度
					console.log('滚动进度:', self.progress);
				}
			}
		});

		tl.to('.hero-section', { delay: 0.5, opacity: 0, ease: 'power1.inOut' });
		tl.to('.first-vd-wrapper', { opacity: 1, duration: 2, ease: 'power1.inOut' });

		// 🔑 关键修复：确保视频准备好并开始播放
		const setupVideoAnimation = async () => {
			try {
				// 1. 等待视频元数据加载
				await new Promise((resolve, reject) => {
					if (videoRef.readyState >= 1) {
						resolve();
						return;
					}
					
					const onLoadedMetadata = () => {
						videoRef.removeEventListener('loadedmetadata', onLoadedMetadata);
						videoRef.removeEventListener('error', onError);
						resolve();
					};
					
					const onError = (e) => {
						videoRef.removeEventListener('loadedmetadata', onLoadedMetadata);
						videoRef.removeEventListener('error', onError);
						reject(e);
					};
					
					videoRef.addEventListener('loadedmetadata', onLoadedMetadata);
					videoRef.addEventListener('error', onError);
				});

				console.log('视频元数据已加载，时长:', videoRef.duration);

				// 2. 尝试播放视频（这样才能控制 currentTime）
				try {
					await videoRef.play();
					console.log('视频开始播放');
					
					// 3. 立即暂停，我们只需要播放状态来控制 currentTime
					videoRef.pause();
					console.log('视频已暂停，准备通过 currentTime 控制');
				} catch (playError) {
					console.log('自动播放失败（可能是浏览器策略），但仍可以控制 currentTime:', playError);
				}

				// 4. 添加视频控制动画
				tl.to(videoRef, {
					currentTime: videoRef.duration,
					duration: 3,
					ease: 'power1.inOut',
					onUpdate: function() {
						// 调试：输出当前播放时间
						console.log('当前播放时间:', videoRef.currentTime);
					}
				}, '<');

				console.log('视频动画已设置完成');

			} catch (error) {
				console.error('视频设置失败:', error);
			}
		};

		// 如果视频已经准备好就直接设置，否则等待
		if (videoRef.readyState >= 1) {
			setupVideoAnimation();
		} else {
			videoRef.addEventListener('loadedmetadata', setupVideoAnimation, { once: true });
		}
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
		/>
	</div>
</section>