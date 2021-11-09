import Vue from 'vue';
import {ThisTypedComponentOptionsWithRecordProps} from 'vue/types/options';

interface Data {

}
interface Methods {

}
interface Computed {

}
interface Props {

}
type CustomComponentOptions = ThisTypedComponentOptionsWithRecordProps<
  Vue,
  Data,
  Methods,
  Computed,
  Props
  >

export default Vue.extend ({
  methods: {
    sayHello() {
      console.log('Hello!');
    }
  }

} as CustomComponentOptions);
