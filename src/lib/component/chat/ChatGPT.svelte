<script lang="ts">
    import { onMount, afterUpdate } from 'svelte'
    import { messages } from '$lib/store/openAIMessages'
    import type { ChatMessage } from '$lib/types'
    import { writable, get } from 'svelte/store'
    import { sendMessageToOpenAI } from '$lib/model/openai'
    import { formatHTML } from '$lib/util/htmlFormatter'
    import ChatSuggestions from './ChatSuggestions.svelte'
    import ChatHeader from './ChatHeader.svelte'
    import ChatInput from './ChatInput.svelte'
    import { isMobile } from "$lib/store/device"
    import { resetChatTrigger } from '$lib/store/reset'

    let inputMessage = ''
    let isLoading = writable(false)
    let currentAssistantMessage = writable('')
    let streamStarted = writable(false)
    let chatContainer: HTMLDivElement
    let abortController: AbortController | null = null

    function suggestedMessage(suggestion: string) {
        inputMessage = suggestion
        sendMessage()
    }

    async function sendMessage() {
        if (inputMessage.trim() === '' || get(isLoading)) return

        abortController?.abort()

        abortController = new AbortController()

        const newMessage: ChatMessage = { role: 'user', content: inputMessage }

        messages.update((msgs) => [...msgs, newMessage])

        inputMessage = ''
        isLoading.set(true)
        streamStarted.set(false)
        currentAssistantMessage.set('')

        try {
            const currentMessages: ChatMessage[] = get(messages)

            await sendMessageToOpenAI(
                currentMessages, 
                (content) => {
                    streamStarted.set(true)
                    currentAssistantMessage.set(content)
                },
                abortController.signal
            )

            const assistantMessage: ChatMessage = { role: 'assistant', content: get(currentAssistantMessage) }

            if (get(messages).some(msg => msg.content === assistantMessage.content && msg.role === 'assistant')) {
                console.log('Duplicate message detected, not adding again.')
            } else {
                messages.update((msgs) => [...msgs, assistantMessage])
                console.log('Output:', assistantMessage.content)
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    console.log('Request aborted')
                } else {
                    console.error('Error communicating with OpenAI:', error.message)
                }
            } else {
                console.error('An unexpected error occurred:', error)
            }
        } finally {
            isLoading.set(false)
        }
    }


    function resetChat() {
        abortController?.abort()
        messages.set([
            {
                role: 'assistant',
                content: `Hey! 👋 I'm Tyler's AI. I'm ready to help if you have any questions, need advice, or just want to chat.`
            } as ChatMessage
        ])
        inputMessage = ''
        currentAssistantMessage.set('')
        isLoading.set(false)
        streamStarted.set(false)
    }

    $: if ($resetChatTrigger) {
        resetChat()
        resetChatTrigger.set(false)
    }

    afterUpdate(() => {
        chatContainer?.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
        })
    })

    onMount(() => {
        resetChat()
    })

</script>

<div class="flex flex-col h-full w-full pb-3">
    {#if !$isMobile}
        <ChatHeader on:reset={resetChat} />
    {/if}
    
    <div bind:this={chatContainer} class="flex-grow flex flex-col items-start gap-2 overflow-auto overflow-x-hidden p-8">
        {#each $messages as message}
            <div class="flex items-center justify-start px-6 py-4 rounded-xl bg-primary-100 dark:bg-[#2f2f2f] duration-300 {message.role === 'user' ? 'self-end' : 'self-start'}">
                <div class="prose dark:prose-invert duration-300">
                    {@html formatHTML(message.content)}
                </div>
            </div>
        {/each}

        {#if $isLoading}
            <div class="flex items-start px-6 py-4 rounded-xl dark:text-white bg-primary-100 dark:bg-[#2f2f2f] duration-300">
                {#if !$streamStarted}
                    <div class="flex items-center">
                        <i class="flex items-center material-symbols-rounded text-[18px] animate-spin text-primary-900 dark:text-white/80 ">progress_activity</i>
                    </div>
                {:else}
                    <p class="prose dark:prose-invert duration-300">
                        {@html formatHTML($currentAssistantMessage)}
                    </p>
                {/if}
            </div>
        {/if}
    </div>

    <div class="flex flex-col px-8">
        {#if !$isMobile}
            {#if $messages.length === 1 && $messages[0].role === 'assistant'}
                <div class="py-6 flex self-center items-center">
                    <ChatSuggestions onSelect={suggestedMessage} />
                </div>
            {/if}
        {/if}
        <ChatInput
            bind:inputMessage={inputMessage}
            {isLoading}
            on:sendMessage={sendMessage}
        />
    </div>
    
</div>

<style>
	.prose {
		max-width: none;
        --tw-prose-hr: #b5c5cc;
        --tw-prose-bullets: #b5c5cc;
        --tw-prose-quote-borders: #b5c5cc;
        --tw-prose-pre-code: #b5c5cc;
        --tw-prose-th-borders: #b5c5cc;
        --tw-prose-td-borders: #b5c5cc;
	}
</style>