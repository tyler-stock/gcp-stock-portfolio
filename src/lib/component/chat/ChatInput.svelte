<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { writable } from 'svelte/store'

    export let inputMessage: string = ''
    export let isLoading = writable(false)
    
    const dispatch = createEventDispatcher()

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            dispatch('sendMessage')
            console.log('Input:', inputMessage)
        }
    }

    function handleClick() {
        dispatch('sendMessage')
    }
</script>

<div class="flex items-center relative border-2 border-primary-200 dark:border-[#2f2f2f] rounded-xl overflow-auto duration-300">
    <input
        type="text"
        bind:value={inputMessage}
        placeholder="Send a Message to GPT-4o..."
        class="flex-grow px-5 py-4 bg-primary-50 placeholder-primary-300 dark:placeholder-white/80 dark:text-white/80 focus:ring-0 border-none dark:bg-[#2f2f2f] duration-300"
        on:keydown={handleKeydown}
    />
    <button
        on:click={handleClick}
        class="absolute right-3 p-[2px] text-white rounded-lg duration-300 {inputMessage.length ? 'bg-neutral-700 dark:bg-white/80 ' : 'bg-primary-100 dark:bg-[#444]'} disabled:opacity-50"
        disabled={$isLoading}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="text-white dark:text-[#212121] duration-300" viewBox="0 0 32 32">
            <path fill="currentColor" fill-rule="evenodd" d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z" clip-rule="evenodd"></path>
        </svg>
    </button>
</div>
<p class="text-xs text-center text-primary-200 dark:text-white/40 pt-2 duration-300">Large Language Models (LLMs) can make mistakes. Consider checking the information.</p>