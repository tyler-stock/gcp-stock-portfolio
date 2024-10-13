<script lang="ts">
    import { isMobile } from "$lib/store/device"

    export let onSelect: (suggestion: string) => void

    const suggestions = [
        { icon: 'drafts', text: 'Draft an email to a potential customer', color: '#5564EF' },
        { icon: 'bar_chart', text: 'Summarize the latest trends in AI tech', color: '#FF5D9D' },
        { icon: 'folder', text: 'Generate a project plan with milestones', color: '#009399' },
        { icon: 'cloud', text: 'Explain a technical concept like im 5', color: '#007CFB' },
        { icon: 'lightbulb', text: 'Invent modern and new business ideas', color: '#cfc350' },
        { icon: 'sentiment_satisfied', text: 'Come up with a witty business joke', color: '#526372' }
    ]
</script>

<div class="grid grid-cols-2 gap-4 select-none">
    {#each suggestions as { icon, text, color }}
        <button class="flex border border-primary-200 dark:border-[#444] text-primary-500 dark:text-white/50 hover:bg-primary-100/25 hover:border-primary-300/75 dark:hover:bg-[#2f2f2f] text-sm text-left rounded-lg p-4 duration-100 whitespace-nowrap" on:click={() => onSelect(text)}>
            <div class="w-full flex items-start gap-3 pr-2">
                <i class="material-symbols-rounded text-[18px]" style="color: {color}">{icon}</i>
                <div class="w-full truncate flex items-center text-sm -mt-[1px]">{text}</div>
            </div>
        </button>
    {/each}
</div>