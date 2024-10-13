<script lang="ts">
    import { isDark } from "$lib/store/theme"
    import { writable } from 'svelte/store'

    function toggleTheme() {
        isDark.update(n => !n)
    }

    const isPinned = writable(false)

    function togglePin() {
        isPinned.update(pinned => !pinned)
    }

    const buttons = [
        { href: "/", icon: "home", label: "Home" },
        // { href: "/app/component", icon: "extension", label: "Components" },
        { href: "/app/chat", icon: "robot_2", label: "AI Chat" }
    ]
    
</script>

<aside class="group flex flex-col justify-between {$isDark ? 'bg-[#171717]' : 'bg-primary-100 '} overflow-hidden whitespace-nowrap px-4 duration-300 {($isPinned ? 'w-[325px]' : 'w-[72px] hover:w-[325px]')}">
    <div class="flex flex-col gap-4">
        <div class="">
            <div class="h-20 w-full flex items-center justify-between border-b border-primary-200 dark:border-neutral-600 duration-300">
                <div class="w-[80%] flex items-center justify-start p-2 rounded-lg text-primary-800 dark:text-white/80 duration-200 select-none">
                    <p class="material-symbols-rounded text-[24px] duration-300 group-hover:w-0 group-hover:overflow-hidden {$isPinned ? 'hidden' : ''}">title</p>
                    <p class="whitespace-nowrap overflow-hidden text-left font-[700] text-lg tracking-wide  {$isPinned ? '' : 'w-0 group-hover:w-auto'}">
                        Tyler Stock
                    </p>
                </div>
                <div class="{$isPinned ? '' : 'hidden group-hover:block'}">
                    <button on:click={togglePin} class="flex p-2 px-[9px] rounded-lg hover:bg-white dark:hover:bg-[#212121] text-primary-800 dark:text-white/80 duration-100">
                        <i class="material-symbols-rounded text-[24px] relative">
                            dock_to_right
                            {#if $isPinned}
                                <svg width="20px" height="20px" viewBox="0 0 20 20"  class="absolute left-[2px] top-[2px] bottom-0 rotate-180 fill-none dark:fill-none stroke-primary-800 dark:stroke-white/80">
                                    <path d="M6.66666 7.5L9.16666 10L6.66666 12.5" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transition: 0.4s;"></path>
                                </svg>
                            {/if}
                        </i>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col gap-2 items-start">
            {#each buttons as button}
                <a href={button.href} class="flex items-center rounded-lg p-2 gap-3 hover:bg-white dark:hover:bg-[#212121] group-hover:w-full text-primary-800 dark:text-white/80 duration-200 select-none">
                    <i class="material-symbols-rounded text-[24px]">{button.icon}</i>
                    <span class="text-sm font-[500] {$isPinned ? '' : 'hidden group-hover:block'}">{button.label}</span>
                </a>
            {/each}
        </div>
    </div>
    <div class="w-full flex justify-between pb-6">
        <button class="w-[80%] flex items-center justify-start p-2 rounded-lg hover:bg-white dark:hover:bg-[#212121] text-primary-800 dark:text-white/80 duration-200">
            <i class="material-symbols-rounded text-[24px]">person</i>
            <p class="text-sm text-left {($isPinned ? 'overflow-visible pl-2' : 'w-0 overflow-hidden group-hover:w-full group-hover:pr-3 group-hover:pl-2 group-hover:truncate group-hover:overflow-visible')}">Tyler Stock</p>
        </button>
        <div>
            <div class="{$isPinned ? '' : 'hidden group-hover:block'}">
                <button on:click={toggleTheme} class="h-full flex p-2 rounded-lg hover:bg-white dark:hover:bg-[#212121] text-primary-800 dark:text-white/80 duration-200">
                    <i class="material-symbols-rounded text-[24px]">{$isDark ? 'dark_mode' : 'light_mode'}</i>
                </button>
            </div>
        </div>
    </div>
</aside>