<template>
  <button style="position: relative" ref="iconpicker_fontawesome_vue2" >
    <i
      @click="model = !model"
      ref="boxIcon"
      :class="[
        !currentIcon || currentIcon == '' ? 'fas fa-icons' : currentIcon,
        'opacity-80 hover:opacity-100 transition-opacity delay-100',
      ]"
      :style="{
        fontSize: size,
        color: color,
      }"
    ></i>
    <!-- Dropdown menu -->
    <template v-if="boxIcon">
      <transition>
        <div
          v-if="model"
          ref="boxModal"
          class="z-20 pb-2 absolute max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-700"
          :style="getStyle()"
        >
          <div
            class="block px-4 py-4 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white"
          >
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <i class="fas fa-search" />
              </div>
              <input
                type="search"
                id="default-search"
                v-model="search"
                class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="searchPlaceholder"
                required
              />
            </div>
          </div>
          <div
            style="height: 40px"
            class="grid pb-1 grid-cols-4 px-4 font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white"
          >
            <p
              @click="styleIcon = 'solid'"
              :class="[
                styleIcon === 'solid'
                  ? 'rounded bg-gray-300 dark:bg-gray-900'
                  : 'bg-white dark:bg-gray-700',
              ]"
              class="w-full h-full flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 uppercase text-xs text-gray-800 dark:text-white cursor-pointer"
            >
              Solid
            </p>
            <p
              @click="styleIcon = 'regular'"
              :class="[
                styleIcon === 'regular'
                  ? 'rounded bg-gray-300 dark:bg-gray-900'
                  : 'bg-white dark:bg-gray-700',
              ]"
              class="w-full h-full flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 uppercase text-xs text-gray-800 dark:text-white cursor-pointer"
            >
              Regular
            </p>
            <p
              @click="styleIcon = 'brands'"
              :class="[
                styleIcon === 'brands'
                  ? 'rounded bg-gray-300 dark:bg-gray-900'
                  : 'bg-white dark:bg-gray-700',
              ]"
              class="w-full h-full flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 uppercase text-xs text-gray-800 dark:text-white cursor-pointer"
            >
              Brands
            </p>
            <p
              @click="styleIcon = 'all'"
              :class="[
                styleIcon === 'all'
                  ? 'rounded bg-gray-300 dark:bg-gray-900'
                  : 'bg-white dark:bg-gray-700',
              ]"
              class="w-full h-full flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800 uppercase text-xs text-gray-800 dark:text-white cursor-pointer"
            >
              All
            </p>
          </div>
          <div
            class="sweet-iconpicker divide-y divide-gray-100 dark:divide-gray-700 p-2 pb-4 h-[calc(100%_-_110px)] overflow-auto flex justify-center items-start"
          >
            <div class="flex flex-wrap justify-start items-start gap-2">
              <button
                @click="changeIcon(item.icon)"
                v-for="item in icons"
                :key="item.icon"
                :style="{
                  width: iconListSize + 'px',
                  height: iconListSize + 'px',
                  fontSize: iconListSize / 2 + 'px',
                  color: iconListColor,
                }"
                :class="[
                  item.icon == currentIcon
                    ? 'scale-95   dark:border-gray-600 opacity-100 bg-gray-200'
                    : 'dark:border-white opacity-95 bg-white dark:bg-gray-700',
                ]"
                class="rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-200 hover:scale-105 focus:scale-95 transition-all delay-75"
              >
                <i :class="item.icon" />
              </button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </button>
</template>
<script setup>
import { defineProps, defineEmits, ref, computed, onMounted } from "vue";
import useIcons from "@/composables/useIcons";
const props = defineProps({
  icons: {
    type: Array,
    default: () => [],
  },
  icon: {
    type: String,
    default: "fas fa-icon",
  },
  version: {
    type: [String, Number],
    default: 5,
  },
  size: {
    type: [String, Number],
    default: 25,
  },
  color: {
    type: [String, Number],
    default: "#097079",
  },
  height: {
    type: Number,
    default: 400,
  },
  width: {
    type: Number,
    default: 300,
  },
  searchPlaceholder: {
    type: String,
    default: "Type icon name and tap enter",
  },
  iconListSize: {
    type: Number,
    default: 35,
  },
  iconListColor: {
    type: String,
    default: "#097079",
  },
});
const iconpicker_fontawesome_vue2 = ref(null);
const emit = defineEmits(["update:icon"]);
const currentIcon = computed({
  get() {
    return props.icon;
  },
  set(newvalue) {
    emit("update:icon", newvalue);
  },
});
const styleIcon = ref("solid");
function getSize() {
  if (typeof props.size === "number") {
    return props.size + "px";
  } else if (typeof props.size === "string") {
    return props.size.includes("px") || props.size.includes("%")
      ? props.size
      : props.size + "px";
  } else {
    return "25px";
  }
}


const color = computed(() => props.color);
const size = computed(() => getSize());
const iconListColor = computed(() => props.iconListColor);

const model = ref(true);
const search = ref("");
const boxIcon = ref(null);
const boxModal = ref(null);

function getStyle() {
  let style = {
    height: props.height + "px",
    width: props.width + "px",
    overflowY: "auto",
  };
  if (iconpicker_fontawesome_vue2.value) {
    const iconRect = boxIcon.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const btnRect = iconpicker_fontawesome_vue2.value.getBoundingClientRect();

    console.log(btnRect)

    //console.log(windowHeight - iconRect.top + iconRect.height);

    if (windowHeight - iconRect.top + iconRect.height < props.height) {
      style["top"] = `-${props.height + btnRect.height}px`;
    }else{
      style["top"] = `${btnRect.height}px`
    }
  }
  return style;
}

const icons = computed(() =>
  useIcons(search.value, props.version, currentIcon.value, styleIcon.value, props.icons)
);

function changeIcon(icon) {
  currentIcon.value = icon;
  model.value = false;
}

function onBlur(e) {
  if (
    iconpicker_fontawesome_vue2.value &&
    !iconpicker_fontawesome_vue2.value.contains(e.target)
  ) {
    model.value = false;
  }
}
onMounted(() => {
  window.document.addEventListener("click", onBlur);
});
</script>
<style scoped>
/* width */
.sweet-iconpicker::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.sweet-iconpicker::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
.sweet-iconpicker::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
.sweet-iconpicker::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
