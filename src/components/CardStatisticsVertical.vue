<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { controlledComputed } from '@vueuse/core';

interface Props {
  title: string;
  color?: string;
  icon: string;
  stats: string;
  change?: number;
  subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
});

const isPositive = controlledComputed(
  () => props.change,
  () => Math.sign(props.change || 0) === 1
);
</script>

<template>
  <div class="border border-[var(--border-color)] bg-base-100 p-3" style="border-radius: var(--radius)">
    <div class="text-xs text-secondary mb-1">
      {{ props.title }}
    </div>
    <div class="text-xl font-semibold text-main">
      {{ props.stats || '-' }}
    </div>
    <div v-if="props.change" :class="isPositive ? 'text-yes' : 'text-no'" class="text-xs mt-1">
      {{ isPositive ? `+${props.change}` : props.change }}%
    </div>
  </div>
</template>
