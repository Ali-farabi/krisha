<script setup lang="ts">
import ApartmentCard from './ApartmentCard.vue'
import type { Apartment } from '../types/apartment'

const props = defineProps<{
  apartments: Apartment[]
}>()
</script>

<template>
  <div v-if="props.apartments.length" class="grid">
    <ApartmentCard
      v-for="apartment in props.apartments"
      :key="apartment.id"
      :apartment="apartment"
    />
  </div>

  <el-empty v-else description="Ничего не найдено" class="grid-empty" />
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.grid-empty {
  border: 1px dashed #d1d5db;
  border-radius: 16px;
  background: #fff;
  padding: 24px;
}
</style>
