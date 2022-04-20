import { Message } from '@arco-design/web-vue';

export default function useLocale() {
  const changeLocale = (value: string) => {
    localStorage.setItem('arco-locale', value);
    Message.success('切换为中文');
  };
  return {
    currentLocale,
    changeLocale,
  };
}
