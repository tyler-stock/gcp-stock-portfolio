<script lang="ts">
    import { isDark } from "$lib/store/theme"
    import { page } from '$app/stores'
    import { resetChatTrigger } from '$lib/store/reset'

    $: buttons = [
        { href: "/", icon: "home" },
        // { href: "/app/component", icon: "extension" },
        ...($page.url.pathname !== '/app/chat' ? [{ href: "/app/chat", icon: "robot_2" }] : [])
    ]

    function toggleTheme() {
        isDark.update(n => !n)
    }

    function resetChat() {
        resetChatTrigger.set(true)
    }
    
</script>

<div class="group h-full w-full flex items-center justify-between {$isDark ? 'bg-[#171717]' : 'bg-primary-100 '} overflow-hidden whitespace-nowrap px-4 duration-300">
    <div class="w-full flex items-center justify-between">
        <div class="flex items-center justify-start py-2 pl-1 rounded-lg text-primary-800 dark:text-white/80 duration-300 select-none">
            <p class="whitespace-nowrap overflow-hidden text-left font-[700] text-lg tracking-wide -ml-[5px]">
                Tyler Stock
            </p>
        </div>
    </div>
    <div class="flex gap-2">
        <div class="flex items-center gap-2">
            {#each buttons as button}
                <a href={button.href} class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-200/50 dark:bg-[#212121] text-primary-800 dark:text-white/80 active:text-indigo-500 dark:active:text-indigo-500 duration-300 select-none">
                    <i class="material-symbols-rounded text-[24px]">{button.icon}</i>
                </a>
            {/each}
            {#if $page.url.pathname === '/app/chat'}
                <button on:click={resetChat} class="h-10 w-10 flex justify-center items-center gap-[10px] rounded-lg bg-primary-200/50 dark:bg-[#212121] text-primary-800 dark:text-white/80 active:text-indigo-500 dark:active:text-indigo-500 duration-300 select-none" >
                    <span class="material-symbols-rounded ">refresh</span>
                </button>
            {/if}
        </div>
        <div class="flex items-center gap-2">
            <button on:click={toggleTheme} class="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-200/50 dark:bg-[#212121] text-primary-800 dark:text-white/80 active:text-indigo-500 dark:active:text-indigo-500 duration-300 select-none">
                <i class="material-symbols-rounded text-[24px]">{$isDark ? 'dark_mode' : 'light_mode'}</i>
            </button>
            <a href="mailto:tylergstock@gmail.com" class="h-10 w-10 flex justify-center items-center duration-300 rounded-lg bg-primary-200/50 dark:bg-[#212121] text-primary-800 dark:text-white/80 active:text-indigo-500 dark:active:text-indigo-500">
                <i class="material-symbols-rounded text-[24px]">email</i>
            </a>
            <a href="https://www.linkedin.com/in/tyler-stock/" target="_blank" class="h-10 w-10 flex justify-center items-center duration-300 rounded-lg group bg-primary-200/50 dark:bg-[#212121] fill-primary-800 dark:fill-white/80 active:fill-indigo-500 dark:active:fill-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" class="mercado-match" width="24" height="24" focusable="false">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
            </a>
        </div>
    </div>
</div>