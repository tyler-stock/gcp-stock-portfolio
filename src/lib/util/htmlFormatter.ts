import DOMPurify from 'dompurify'
import { marked } from 'marked'

export function formatHTML(content: string): string {
    const dirty = marked(content) as string
    return DOMPurify.sanitize(dirty)
}