<script lang="ts">
    import "../app.css";
    import { onMount } from 'svelte'
    import { isDark } from "$lib/store/theme"
    import { isMobile } from "$lib/store/device"
    import NavDesktop from "$lib/component/base/NavDesktop.svelte"
    import NavMobile from "$lib/component/base/NavMobile.svelte"

    onMount(() => {
        document.body.classList.toggle('dark', $isDark)
    })

    $: {
        if (typeof window !== 'undefined') {
            document.body.classList.toggle('dark', $isDark)
        }
    }

</script>

<div class="{$isMobile ? 'h-screen w-screen flex flex-col relative' : 'h-screen flex'}">
    {#if !$isMobile}
        <NavDesktop />
    {/if}
    {#if $isMobile}
    <div class="h-20">
        <NavMobile  />
    </div>
    {/if}
    <div class="h-full w-full bg-primary-50 dark:bg-[#212121] duration-300 overflow-hidden">
        <slot />
    </div>
</div>