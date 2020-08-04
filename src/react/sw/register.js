export const register = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    }).catch(console.log);
    navigator.serviceWorker.addEventListener('message', async ({ data }) => {
      if (data.type === 'activated') {
        console.log('updated'); // ignore
      }
    });
  }
};
