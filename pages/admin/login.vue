<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

definePageMeta({
  layout: false,
  middleware: 'auth',
})

const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const { error } = await login(email.value, password.value)

    if (error) {
      errorMessage.value = error
    }
    else {
      await navigateTo('/admin/dashboard')
    }
  }
  catch (error) {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
    console.error('Login error:', error)
  }
  finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl font-bold text-center">
          Admin Login
        </CardTitle>
        <CardDescription class="text-center">
          Enter your credentials to access the admin panel.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="w-full"
            :disabled="isLoading"
            @keyup.enter="handleLogin"
          />
        </div>
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium">Password</label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full"
            :disabled="isLoading"
            @keyup.enter="handleLogin"
          />
        </div>
        <Button
          class="w-full"
          :disabled="isLoading"
          @click="handleLogin"
        >
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Sign In</span>
        </Button>
        <p v-if="errorMessage" class="text-sm text-red-600 text-center">
          {{ errorMessage }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
