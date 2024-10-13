import { writable } from 'svelte/store'
import type { ChatMessage } from '../types'

export const messages = writable<ChatMessage[]>([])