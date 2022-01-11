<template>
  <div
    ref="container"
    :style="{'height': height + 'px', 'width': '100%'}"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { useCreateScript } from "@/hooks";

const SCRIPT_URL =
  "https://webapi.amap.com/maps?v=1.4.15&key=105cf39901013fea95481e22648eeb4f";
export default defineComponent({
  setup() {
    const container = ref<HTMLDivElement | null>(null);
    const height = ref(0);
    const { createScriptPromise } = useCreateScript(SCRIPT_URL);
    const initMap = () => {
      height.value =
        container.value?.parentElement?.getBoundingClientRect().height || 0;
      createScriptPromise.then(() => {
        const aMap = (window as any).AMap;
        new aMap.Map(container.value, {
          zoom: 10,
          center: [116.397428, 39.90923],
          viewMode: "2D",
          pitch: 75,
        });
      });
    };
    onMounted(initMap);
    return { container, height };
  },
});
</script>
