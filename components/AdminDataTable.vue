<script setup lang="ts" generic="T extends Record<string, any>">
import type { ColumnConfig } from '@/types/admin/dataTableColumns'
import { ref } from 'vue'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Props {
  title: string
  description?: string
  data: T[]
  columns: ColumnConfig[]
  loading?: boolean
  error?: string | null
  apiEndpoint: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  refresh: []
}>()

const editingItem = ref<T | null>(null)
const isCreating = ref(false)
const creatingError = ref<string | null>(null)
const newItem = ref<Partial<T>>({})
const deletingItem = ref<T | null>(null)
const isSubmitting = ref(false)

async function handleCreate() {
  if (isSubmitting.value)
    return

  isSubmitting.value = true
  try {
    await $fetch(props.apiEndpoint, {
      method: 'POST',
      body: newItem.value,
    })

    newItem.value = {}
    isCreating.value = false
    emit('refresh')
  }
  catch (error) {
    console.error('Create error:', error)
    if (error && typeof error === 'object' && 'message' in error) {
      creatingError.value = error.message as string
    }
  }
  finally {
    isSubmitting.value = false
  }
}

async function handleUpdate(item: T) {
  if (isSubmitting.value)
    return

  isSubmitting.value = true
  try {
    const idField = getIdField(item)
    await $fetch(`${props.apiEndpoint}/${item[idField]}`, {
      method: 'PUT',
      body: editingItem.value,
    })

    editingItem.value = null
    emit('refresh')
  }
  catch (error) {
    console.error('Update error:', error)
  }
  finally {
    isSubmitting.value = false
  }
}

async function handleDelete(item: T) {
  if (isSubmitting.value)
    return

  isSubmitting.value = true
  try {
    const idField = getIdField(item)
    await $fetch(`${props.apiEndpoint}/${item[idField]}`, {
      method: 'DELETE',
    })

    deletingItem.value = null
    emit('refresh')
  }
  catch (error) {
    console.error('Delete error:', error)
  }
  finally {
    isSubmitting.value = false
  }
}

function getIdField(item: T): string {
  // For greek_cities table, use 'name' as the ID field
  if ('name' in item && !('id' in item)) {
    return 'name'
  }
  return 'id'
}

function startEdit(item: T) {
  editingItem.value = { ...item }
}

function cancelEdit() {
  editingItem.value = null
}

function startCreate() {
  newItem.value = {}
  isCreating.value = true
  creatingError.value = null
}

function cancelCreate() {
  newItem.value = {}
  isCreating.value = false
  creatingError.value = null
}

function formatValue(value: any, column: ColumnConfig) {
  if (value === null || value === undefined)
    return '-'

  if (column.type === 'date') {
    return new Date(value).toLocaleString()
  }

  return String(value)
}

function isEditing(item: T) {
  const idField = getIdField(item)
  return editingItem.value && editingItem.value[idField] === item[idField]
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <CardTitle>{{ title }}</CardTitle>
          <CardDescription v-if="description">
            {{ description }}
          </CardDescription>
        </div>
        <Button :disabled="isCreating || loading" @click="startCreate">
          Add New
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div v-if="error" class="text-red-500 p-4 text-center">
        Error: {{ error }}
      </div>

      <div v-else-if="loading" class="space-y-3">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
      </div>

      <div v-else class="space-y-4">
        <Card v-if="isCreating" class="border-green-200">
          <CardHeader>
            <CardTitle class="text-lg">
              Create New {{ title.slice(0, -1) }}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div v-for="column in columns.filter(col => col.editable)" :key="column.key">
                <label class="text-sm font-medium">{{ column.label }}</label>
                <Input
                  v-if="column.type === 'text' || column.type === 'number'"
                  v-model="(newItem as any)[column.key]"
                  :type="column.type === 'number' ? 'number' : 'text'"
                  class="mt-1"
                />
                <Input
                  v-else-if="column.type === 'date'"
                  v-model="(newItem as any)[column.key]"
                  type="date"
                  class="mt-1"
                />
                <Select v-else-if="column.type === 'select'" v-model="(newItem as any)[column.key]">
                  <SelectTrigger class="mt-1 w-full">
                    <SelectValue :placeholder="`Select ${column.label}`" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="option in column.options" :key="option" :value="option">
                      {{ option }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div class="flex gap-2 mt-4">
              <Button :disabled="isSubmitting" @click="handleCreate">
                {{ isSubmitting ? 'Creating...' : 'Create' }}
              </Button>
              <Button variant="outline" :disabled="isSubmitting" @click="cancelCreate">
                Cancel
              </Button>
            </div>
            <div v-if="creatingError" class="text-red-500 p-4 text-center">
              Error: {{ creatingError }}
            </div>
          </CardContent>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead v-for="column in columns" :key="column.key">
                {{ column.label }}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in data" :key="getIdField(item)">
              <TableCell v-for="column in columns" :key="column.key" class="max-w-[200px] h-full break-words">
                <template v-if="isEditing(item) && column.editable">
                  <Input
                    v-if="column.type === 'text' || column.type === 'number'"
                    v-model="(editingItem as any)![column.key]"
                    :type="column.type === 'number' ? 'number' : 'text'"
                    class="w-full"
                  />
                  <Input
                    v-else-if="column.type === 'date'"
                    v-model="(editingItem as any)![column.key]"
                    type="date"
                    class="w-full"
                  />
                  <Select v-else-if="column.type === 'select'" v-model="(editingItem as any)![column.key]">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="option in column.options" :key="option" :value="option">
                        {{ option }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </template>
                <template v-else>
                  <div class="break-words whitespace-normal">
                    {{ formatValue(item[column.key], column) }}
                  </div>
                </template>
              </TableCell>
              <TableCell>
                <div class="flex gap-2">
                  <template v-if="isEditing(item)">
                    <Button size="sm" :disabled="isSubmitting" @click="handleUpdate(item)">
                      {{ isSubmitting ? 'Saving...' : 'Save' }}
                    </Button>
                    <Button size="sm" variant="outline" :disabled="isSubmitting" @click="cancelEdit">
                      Cancel
                    </Button>
                  </template>
                  <template v-else>
                    <Button size="sm" variant="outline" @click="startEdit(item)">
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger as-child>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this record.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction @click="handleDelete(item)">
                            {{ isSubmitting ? 'Deleting...' : 'Delete' }}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </template>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div v-if="data.length === 0" class="text-center py-8 text-muted-foreground">
          No data available
        </div>
      </div>
    </CardContent>
  </Card>
</template>
