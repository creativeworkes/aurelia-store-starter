import { Aurelia, PLATFORM } from 'aurelia-framework';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';
import state from './state/state';

Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(au) {
  au.use.standardConfiguration();
  au.use.developmentLogging();
  au.use.plugin(PLATFORM.moduleName('aurelia-store'), { initialState: state});

  await au.start();
  await au.setRoot(PLATFORM.moduleName('app'));
}
