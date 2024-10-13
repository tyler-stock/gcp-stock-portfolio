<script lang="ts">
    import { isMobile } from "$lib/store/device"
    
</script>

{#if !$isMobile}
    <div>
        <div class="h-20 flex justify-between mx-4 text-primary-900 border-b border-primary-100 dark:border-neutral-600 dark:text-white/80 duration-300">
            <p class="flex items-center justify-center py-1 pl-4 gap-3 font-[500]"><i class="material-symbols-rounded">home</i> Home</p>
            <div class="flex items-center gap-4">
                <div class="flex justify-center items-center gap-3 pr-2">
                    <a href="mailto:tylergstock@gmail.com" class="h-10 w-10 flex justify-center items-center duration-200 rounded-lg text-primary-800 hover:bg-primary-100 dark:hover:bg-[#2f2f2f] dark:text-white/80 hover:text-indigo-500 dark:hover:text-indigo-500 active:text-white dark:active:text-white">
                        <i class="material-symbols-rounded text-[24px]">email</i>
                    </a>
                    <a href="https://www.linkedin.com/in/tyler-stock/" target="_blank" class="h-10 w-10 flex justify-center items-center duration-200 rounded-lg group fill-primary-800 dark:fill-white/80 hover:fill-indigo-500 dark:hover:fill-indigo-500 active:fill-white dark:active:fill-white hover:bg-primary-100/75 dark:hover:bg-[#2f2f2f]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" class="mercado-match" width="24" height="24" focusable="false">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
{/if}

<div class="flex flex-col px-10 py-8 gap-6 text-primary-900 dark:text-white/80">
    <div class="flex items-center justify-between">
        <div class="flex flex-col gap-4">
            <span class="flex items-center gap-4">
                <p class="text-4xl font-[700]">Welcome to Tyler Stock's Portfolio!</p>
                <i class="material-symbols-rounded hover:text-indigo-500 dark:hover:text-indigo-500 hover:animate-spin select-none">sentiment_satisfied</i>
            </span>
        </div>
        
    </div>

    <div class="flex flex-col gap-4">
        <span class="flex items-center gap-2 select-none">
            <i class="material-symbols-rounded">handyman</i>
            <p class="">In Progress...</p>
        </span>
    </div>

</div>