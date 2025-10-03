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
    class="group bg-base-100 border border-[var(--border-color)] flex items-center px-4 py-3 transition-all duration-200 hover:border-primary hover:shadow-sm"
    style="border-radius: 6px"
  >
    <div class="w-9 h-9 rounded overflow-hidden flex-shrink-0 ring-1 ring-[var(--border-color)] group-hover:ring-primary transition-all">
      <img :src="conf.logo" class="w-full h-full object-cover" />
    </div>
    <div class="ml-3 text-sm flex-1 truncate text-main font-medium">
      {{ conf?.prettyName || props.name }}
    </div>
  </RouterLink>
</template>
