import { Capacitor } from '@capacitor/core';

export const getIsNativePlatform = () => Capacitor.isNativePlatform();

export const shouldHideMobileApp = () => getIsNativePlatform();
