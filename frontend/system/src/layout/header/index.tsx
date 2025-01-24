import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Header',

  setup() {
    return () => (
      <div class="h-16 w-full flex flex-col justify-center items-center bg-gray-200">
        Header
      </div>
    );
  }
});
