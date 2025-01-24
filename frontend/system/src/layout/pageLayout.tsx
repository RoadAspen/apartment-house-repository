import { defineComponent } from 'vue';
import Aside from './aside';
import Header from './header';

const PageLayout = defineComponent({
  name: 'PageLayout',
  setup(props, { slots }) {
    return {
      render() {
        return (
          <div class="flex flex-col h-screen w-full overflow-hidden">
            <Header />
            <div class="flex flex-1">
              <Aside />
              <section class="flex flex-1 overflow-hidden">
                {slots.default && slots.default()}
              </section>
            </div>
          </div>
        );
      }
    };
  }
});

export default PageLayout;
