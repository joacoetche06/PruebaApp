import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pruebaapp.etchegaray',
  appName: 'prueba-app-etchegaray',
  webDir: 'dist/prueba-app-etchegaray/browser',
  plugins: {
    SplashScreen: {
      // Muestra el splash screen durante 3 segundos como mínimo.
      launchShowDuration: 3000,
      launchAutoHide: false,
      androidScaleType: 'FIT_CENTER',
      // Usar solo las propiedades necesarias para el sistema moderno.
      // El color de fondo y el tipo de escala ahora se definen en styles.xml
      // androidSplashResourceName: 'my_splash',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
    },
  },
};

export default config;
