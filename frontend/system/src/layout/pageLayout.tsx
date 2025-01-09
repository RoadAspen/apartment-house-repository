import { defineComponent } from 'vue';

const PageLayout = defineComponent({
  name: 'PageLayout',
  setup(props, { slots }) {
    return () => (
      <div class="flex flex-col h-screen w-full overflow-hidden">
        {slots.default?.()}
      </div>
    );
  }
});

export default PageLayout;
