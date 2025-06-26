<script setup lang="ts">
import type { Tables } from '~/types/supabase'

type SafetyArticle = Pick<Tables<'safety_articles'>, 'id' | 'title' | 'created_at'>

definePageMeta({
  title: 'Safety Measures',
  description: 'Browse our collection of road safety articles and tips',
})

const { data: articles, pending, error } = await useFetch<SafetyArticle[]>('/api/public/safety-articles', {
  lazy: true,
  server: false,
})

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-foreground mb-4">
          Safety Measures
        </h1>
        <p class="text-lg text-muted-foreground">
          Learn about road safety tips, best practices, and important measures to keep yourself and others safe on the road.
        </p>
      </div>

      <SafetyScreenMultipleArticlesSkeletons v-if="pending" />

      <div v-else-if="error" class="text-center py-12">
        <div class="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <h2 class="text-xl font-semibold text-destructive mb-2">
            Error Loading Articles
          </h2>
          <p class="text-sm text-muted-foreground">
            We're having trouble loading the safety articles. Please try again later.
          </p>
        </div>
      </div>

      <div v-else-if="articles && articles.length > 0" class="space-y-4">
        <Card
          v-for="article in articles"
          :key="article.id"
          class="hover:shadow-lg transition-shadow cursor-pointer"
          @click="navigateTo(`/safety/${article.id}`)"
        >
          <CardHeader>
            <CardTitle class="text-xl hover:text-primary transition-colors">
              {{ article.title }}
            </CardTitle>
            <CardDescription>
              Published on {{ formatDate(article.created_at) }}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div v-else class="text-center py-12">
        <div class="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
          <h2 class="text-xl font-semibold text-muted-foreground mb-2">
            No Articles Available
          </h2>
          <p class="text-sm text-muted-foreground">
            Safety articles will appear here once they are published.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
