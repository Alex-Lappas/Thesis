<script setup lang="ts">
import type { Tables } from '~/types/supabase'
import { ArrowLeft, CalendarIcon, ChevronLeft } from 'lucide-vue-next'

type SafetyArticle = Tables<'safety_articles'>

const route = useRoute()

definePageMeta({
  title: 'Safety Article',
  description: 'Read detailed road safety information and tips',
})

const { data: article, pending, error } = await useFetch<SafetyArticle>(`/api/public/safety-articles/${route.params.id}`, {
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

watchEffect(() => {
  if (article.value) {
    useHead({
      title: `${article.value.title} - Road Safety`,
      meta: [
        { name: 'description', content: article.value.title },
      ],
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <Button
          variant="ghost"
          class="hover:bg-muted"
          @click="navigateTo('/safety')"
        >
          <ChevronLeft class="w-4 h-4 mr-2" />
          Back to Safety Articles
        </Button>
      </div>

      <SafetyScreenSingleArticleSkeleton v-if="pending" />

      <div v-else-if="error" class="text-center py-12">
        <div class="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <h2 class="text-xl font-semibold text-destructive mb-2">
            Article Not Found
          </h2>
          <p class="text-sm text-muted-foreground mb-4">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button variant="outline" @click="navigateTo('/safety')">
            View All Articles
          </Button>
        </div>
      </div>

      <article v-else-if="article" class="max-w-4xl mx-auto">
        <header class="mb-8">
          <h1 class="text-4xl font-bold text-foreground mb-4">
            {{ article.title }}
          </h1>
          <div class="flex items-center text-muted-foreground text-sm">
            <CalendarIcon class="w-4 h-4 mr-2" />
            <time :datetime="article.created_at">
              Published on {{ formatDate(article.created_at) }}
            </time>
          </div>
        </header>

        <div class="prose prose-lg max-w-none">
          <Card class="p-8">
            <div
              class="article-content"
              v-html="article.description"
            />
          </Card>
        </div>

        <div class="mt-8 text-center">
          <Button variant="outline" size="lg" @click="navigateTo('/safety')">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to All Articles
          </Button>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.article-content :deep(h1) {
  font-size: 1.875rem; /* text-2xl equivalent */
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--foreground);
}

.article-content :deep(h2) {
  font-size: 1.5rem; /* text-xl equivalent */
  font-weight: 600;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
  color: var(--foreground);
}

.article-content :deep(h3) {
  font-size: 1.25rem; /* text-lg equivalent */
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  color: var(--foreground);
}

.article-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.625;
  color: var(--foreground);
}

.article-content :deep(ul) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.article-content :deep(ul) li {
  margin-bottom: 0.5rem;
}

.article-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  list-style-type: decimal;
}

.article-content :deep(ol) li {
  margin-bottom: 0.5rem;
}

.article-content :deep(li) {
  color: var(--foreground);
}

.article-content :deep(strong) {
  font-weight: 600;
  color: var(--foreground);
}

.article-content :deep(em) {
  font-style: italic;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
  color: var(--muted-foreground);
}

.article-content :deep(a) {
  color: var(--primary);
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-content :deep(img) {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
  max-width: 100%;
  height: auto;
}

.article-content :deep(code) {
  background-color: var(--muted);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}

.article-content :deep(pre) {
  background-color: var(--muted);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.article-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
}
</style>
