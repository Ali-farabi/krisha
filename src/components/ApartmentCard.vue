<script setup lang="ts">
import type { Apartment } from '../types/apartment'

defineProps<{
  apartment: Apartment
}>()
</script>

<template>
  <el-card class="card" shadow="hover">
    <el-image
      :src="apartment.image"
      fit="cover"
      loading="lazy"
      class="card-image"
    >
      <template #error>
        <div class="card-fallback">Нет изображения</div>
      </template>
    </el-image>

    <div class="card-body">
      <div class="card-address">{{ apartment.address }}</div>
      <div class="card-meta">
        <el-tag type="info" effect="plain">{{ apartment.area }} м²</el-tag>
        <el-tag type="success" effect="plain">{{ apartment.rooms }} комн.</el-tag>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.card :deep(.el-card__body) {
  padding: 0;
}

.card-image {
  width: 100%;
  height: 180px;
  display: block;
  background: #e5e7eb;
}

.card-fallback {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-weight: 600;
  background: #e5e7eb;
}

.card-body {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-address {
  font-weight: 600;
  color: #111827;
}

.card-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
