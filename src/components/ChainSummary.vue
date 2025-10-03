<script lang="ts" setup>
import { useDashboard } from '@/stores';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const dashboardStore = useDashboard();
const conf = computed(() => dashboardStore.chains[props.name] || {});
</script>
<template>
  <RouterLink
    :to="`/${name}`"
    class="bg-base-100 border border-[var(--border-color)] flex items-center px-3 py-2 hover:bg-[var(--bg-hover)]"
    style="border-radius: var(--radius)"
  >
    <div class="w-8 h-8 rounded overflow-hidden flex-shrink-0">
      <img :src="conf.logo" class="w-full h-full object-cover" />
    </div>
    <div class="ml-3 text-sm flex-1 truncate text-main">
      {{ conf?.prettyName || props.name }}
    </div>
  </RouterLink>
</template>
