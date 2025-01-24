import Footer from '@/components/footer';
import LoginBanner from './components/banner';
import LoginForm from './components/login-form';

const login = () => {
  return (
    <div class="flex h-lvh w-full">
      <div class="fixed top-6 left-[22px] z-[1] inline-flex items-center">
        <img
          alt="logo"
          src="https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
        />
        <div class="mr-1 ml-1 !text-[linear-gradient(120deg, #bd34fe 30%, #41d1ff)] text-[30px] ">
          尚寓
        </div>
      </div>
      <LoginBanner />
      <div class="relative flex flex-1 items-center justify-center pb-[40px]">
        <div class="shadow-lg shadow-gray-500/50">
          <LoginForm />
        </div>
        <div class="absolute bottom-4 right-0 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default login;
