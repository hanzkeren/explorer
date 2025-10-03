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
  <div class="border border-[var(--border-color)] bg-base-100 p-4 transition-all duration-200 hover:border-primary hover:shadow-sm" style="border-radius: 6px">
    <div class="text-xs text-secondary mb-2 font-medium uppercase tracking-wide">
      {{ props.title }}
    </div>
    <div class="text-2xl font-semibold text-main mb-1">
      {{ props.stats || '-' }}
    </div>
    <div v-if="props.change" :class="isPositive ? 'text-yes' : 'text-no'" class="text-xs font-medium">
      {{ isPositive ? `+${props.change}` : props.change }}%
    </div>
  </div>
</template>
