import { writable } from 'svelte/store'

export const isMobile = writable(false)

if (typeof window !== 'undefined') {
    const userAgent = navigator.userAgent || navigator.vendor
    if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
        isMobile.set(true)
    }
}