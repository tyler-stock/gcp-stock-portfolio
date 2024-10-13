declare module 'markdown-it' {
    interface MarkdownIt {
        render: (markdown: string) => string
    }

    const MarkdownIt: {
        new (): MarkdownIt
    }

    export default MarkdownIt
}