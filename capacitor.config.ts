// capacitor.config.ts

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
      backgroundColor: '#4748a6',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER',
      showSpinner: true,
      splashFullScreen: false,
      splashImmersive: false,
      useDialog: false,
      layoutName: 'launch_screen',
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
    },
  },
};

export default config;
