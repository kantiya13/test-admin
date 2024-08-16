export default defineNuxtRouteMiddleware(async (to, from) => {
    const supabase = useSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        if (to.path === '' || to.path === '/') {
            return navigateTo('/login')
        }
    }
})
