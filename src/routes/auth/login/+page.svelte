<script>
    import { loginUser, loginWithGoogle } from '../../../lib/auth'
    import { goto } from '$app/navigation'
    import googleLogo from '$lib/asset/google.png'

    let email = ''
    let password = ''
    let errorMessage = ''

    const handleLogin = async () => {
        try {
            await loginUser(email, password)
            goto('/app')
        } catch (error) {
            if (error instanceof Error) {
                errorMessage = error.message
            } else {
                errorMessage = 'An unexpected error occurred'
            }
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
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
    <h1 class="text-2xl font-bold mb-4 text-primary-900 dark:text-white duration-200">Login</h1>
    <form on:submit|preventDefault={handleLogin} class="flex flex-col gap-4">
        <input bind:value={email} type="email" placeholder="Email" class="p-2 border border-primary-200 dark:border-transparent placeholder-primary-300 rounded-lg duration-200" />
        <input bind:value={password} type="password" placeholder="Password" class="p-2 border border-primary-200 dark:border-transparent placeholder-primary-300 rounded-lg duration-200" />
        <div class="w-full flex items-center justify-between gap-2">
            <button type="submit" class="w-[78%] bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
            <button type="button" on:click={handleGoogleLogin} class="w-[22%] bg-white text-white px-[10px] py-[10px] rounded-lg border border-primary-200 dark:border-transparent duration-200">
                <img src={googleLogo} alt="Google Logo" class="h-5 flex-shrink-0 pl-[1px] pt-[1px]" />
            </button>
        </div>
    </form>
    {#if errorMessage}
        <p class="text-red-500 mt-2">{errorMessage}</p>
    {/if}

    <p class="mt-4">
        <a href="/auth/register" class="text-blue-500 hover:underline">Register here</a>
    </p>
    <p class="mt-2">
        <a href="/auth/reset" class="text-blue-500 hover:underline">Reset password</a>
    </p>
</div>
