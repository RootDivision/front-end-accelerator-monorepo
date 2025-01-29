import angular from 'angular-eslint';

import { config as baseConfig } from './base.js';

export const angularConfig = [...baseConfig, ...angular.configs.tsRecommended];
