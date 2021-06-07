import Image from "./src/muddyImage.vue";
Image.install = function (Vue) {
  Vue.component(Image.name, Image);
};

export default Image;
