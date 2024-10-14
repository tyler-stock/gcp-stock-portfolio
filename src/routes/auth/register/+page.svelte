<script>
    import { registerUser } from '../../../lib/auth'
    import { goto } from '$app/navigation'

    let email = ''
    let password = ''
    let confirmPassword = ''
    let errorMessage = ''

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            errorMessage = 'Passwords do not match'
            return
        }

        try {
            await registerUser(email, password)
            goto('/app')
        } catch (error) {
            if (error instanceof Error) {
                errorMessage = error.message
            } else {
                errorMessage = 'An unexpected error occurred'
            }
        }
    }
</script>

<div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-2xl font-bold mb-4 dark:text-white">Register</h1>
    <form on:submit|preventDefault={handleRegister} class="flex flex-col gap-4">
        <input bind:value={email} type="email" placeholder="Email" class="p-2 border rounded-lg border-primary-200 dark:border-transparent duration-200" />
        <input bind:value={password} type="password" placeholder="Password" class="p-2 border rounded-lg border-primary-200 dark:border-transparent duration-200" />
        <input bind:value={confirmPassword} type="password" placeholder="Confirm Password" class="p-2 border rounded-lg border-primary-200 dark:border-transparent duration-200" />
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg">Register</button>
    </form>
    {#if errorMessage}
        <p class="text-red-500 mt-2">{errorMessage}</p>
    {/if}
    
    <p class="mt-4">
        <a href="/auth/login" class="text-blue-500 hover:underline">Login here</a>
    </p>
    <p class="mt-2">
        <a href="/auth/reset" class="text-blue-500 hover:underline">Reset password</a>
    </p>
</div>
