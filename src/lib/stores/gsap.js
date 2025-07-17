import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createGSAPStore() {
    // 明确指定类型，允许 null 或 GSAP 对象 

    const { subscribe, set } = writable();

    if (browser) {
        (async () => {
            const [gsapModule, scrollTriggerModule] = await Promise.all([
                import('gsap'),
                import('gsap/ScrollTrigger')
            ]);

            const gsap = gsapModule.default;
            const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

            gsap.registerPlugin(ScrollTrigger);

            // 现在这里不会报错了
            set({ gsap, ScrollTrigger });
            console.log('✅ GSAP 加载完成！');
        })();
    }

    return { subscribe };
}

export const gsapStore = createGSAPStore();