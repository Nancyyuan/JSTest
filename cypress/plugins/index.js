/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
//const task = require('cypress-skip-and-only-ui/task',
/**
 * @type {Cypress.PluginConfig}
 */

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');
//const { initPlugin } = require('cypress-plugin-snapshots/plugin');


module.exports = (on, config) => {
  
  require('@cypress/code-coverage/task')(on, config)
  on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
  
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // Windows
      if (config.env.videoToUse == 'fakevideo') {
        launchOptions.args.push('--use-fake-device-for-media-stream')
      }
      else if (config.env.videoToUse == 'barelymoving') {
        launchOptions.args.push('--use-file-for-fake-video-capture=E:\\website_DWT\\cyp-hello\\cypress\\fixtures\\barelymoving.y4m')
      }
      else if (config.env.videoToUse == 'stillallbarcodetypesimage') {
        launchOptions.args.push('--use-file-for-fake-video-capture=E:\\website_DWT\\cyp-hello\\cypress\\fixtures\\stillallbarcodetypesimage.y4m')
      }
      else if (config.env.videoToUse == 'OneD') {
        launchOptions.args.push('--use-file-for-fake-video-capture=E:\\website_DWT\\cyp-hello\\cypress\\fixtures\\OneD.y4m')
      }
      else if (config.env.videoToUse == '2D'){
        launchOptions.args.push('--use-file-for-fake-video-capture=E:\\website_DWT\\cyp-hello\\cypress\\fixtures\\2D.y4m')
      }
      else if (config.env.videoToUse == 'GS1DATA'){
        launchOptions.args.push('--use-file-for-fake-video-capture=E:\\website_DWT\\cyp-hello\\cypress\\fixtures\\GS1Data.y4m')
      }
      else {//barcodeformat2
        //launchOptions.args.push('--use-file-for-fake-video-capture=E:\\website_DWT\\cyp-hello\\cypress\\fixtures\\barcodeformat2.y4m')
        launchOptions.args.push('--use-fake-device-for-media-stream')
      }
    }
   // launchOptions.args.push('--start-fullscreen')
    return launchOptions
  })
  //on('task', require('cypress-skip-and-only-ui/task'))
  addMatchImageSnapshotPlugin(on, config);
  return config;
}