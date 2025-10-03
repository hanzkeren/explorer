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
    class="bg-base-100 hover:border-primary border border-[var(--border-color)] flex items-center px-4 py-4 transition-all"
    style="border-radius: var(--radius)"
  >
    <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
      <img :src="conf.logo" class="w-full h-full object-cover" />
    </div>
    <div class="ml-4 text-base flex-1 truncate capitalize text-main font-medium">
      {{ conf?.prettyName || props.name }}
    </div>
  </RouterLink>
</template>
