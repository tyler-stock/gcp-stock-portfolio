<script>
    import { resetPassword } from '../../../lib/auth'

    let email = ''
    let errorMessage = ''
    let successMessage = ''

    const handleReset = async () => {
        try {
            await resetPassword(email)
            successMessage = 'Password reset email sent!'
            errorMessage = ''
        } catch (error) {
            if (error instanceof Error) {
                errorMessage = error.message
                successMessage = ''
            } else {
                errorMessage = 'An unexpected error occurred'
                successMessage = ''
            }
        }
    }
</script>

<div class="flex flex-col items-center justify-center h-full">
    <h1 class="text-2xl font-bold mb-4 dark:text-white">Reset</h1>
    <form on:submit|preventDefault={handleReset} class="flex flex-col gap-4">
        <input bind:value={email} type="email" placeholder="Email" class="p-2 rounded-lg border border-primary-200 dark:border-transparent duration-200" />
        <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-lg">Send Reset Email</button>
    </form>
    {#if errorMessage}
        <p class="text-red-500 mt-2">{errorMessage}</p>
    {/if}
    {#if successMessage}
        <p class="text-green-500 mt-2">{successMessage}</p>
    {/if}

    <p class="mt-4">
        <a href="/auth/login" class="text-blue-500 hover:underline">Login here</a>
    </p>
</div>
