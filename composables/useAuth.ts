export function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      return { data, error: null }
    }
    catch (error) {
      console.error('Login error:', error)
      return {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred during login',
      }
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      await navigateTo('/admin/login')
      return { error: null }
    }
    catch (error) {
      console.error('Logout error:', error)
      return {
        error: error instanceof Error ? error.message : 'An error occurred during logout',
      }
    }
  }

  const isAuthenticated = computed(() => !!user.value)

  const userEmail = computed(() => user.value?.email)

  return {
    user: readonly(user),
    login,
    logout,
    isAuthenticated,
    userEmail,
  }
}
