const cypress = require('cypress')
const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')
const fs = require('fs');
let dbr = require("../node_modules/dynamsoft-node-barcode/dist/dbr.js");

function ota(objectA){
  var  arr=[];
  for(var i in objectA){
      arr.push(objectA[i]);
  }
  return arr
}

function getFileList(testFolder){
  var arr=[];
  fs.readdirSync(testFolder).forEach(file => {
      //console.log(testFolder+file)
      arr.push(testFolder+file)
  });
  return arr
}
async function runTests() {
  await fse.remove('mochawesome-report') // remove the report folder
  await cypress.run({
    browser: 'chrome',
    env: { 
      'videoToUse': 'OneD',
      //'barcodeformats': ota(dbr.EnumBarcodeFormat)
    },
    spec: 'cypress/integration/DBRScanner/Test_oneD_by_scan.js',
    config: { trashAssetsBeforeRuns: false }
  })

  await cypress.run({
    browser: 'chrome',
    env: { 'videoToUse': 'stillallbarcodetypesimage' },
    spec: 'cypress/integration/DBRScanner/Test_UI_elements.js',
    config: { trashAssetsBeforeRuns: false }
  })

  
  await cypress.run({
    browser: 'chrome',
    env: { 
      'videoToUse': '2D',
      'barcodeformats': ota(dbr.EnumBarcodeFormat)
   },
    spec: 'cypress/integration/DBRScanner/Test_2D_by_device.js',
    config: { trashAssetsBeforeRuns: false }
  })
  await cypress.run({
    browser: 'chrome',
    env: { 
      'videoToUse': 'GS1DATA',
   },
    spec: 'cypress/integration/DBRScanner/Test_GS1Data_by_session.js',
    config: { trashAssetsBeforeRuns: false }
  })
  await cypress.run({
    browser: 'chrome',
    env: { 
      'videoToUse': 'barcodeformat2',
      //'barcodeformats_2': ota(dbr.EnumBarcodeFormat_2)
   },
    spec: 'cypress/integration/DBRScanner/Test_postalcode_Dotcode_licenseinvalid.js',
    config: { trashAssetsBeforeRuns: false }
  })

  await cypress.run({
    browser: 'chrome',
    env: { 'videoToUse': 'fakevideo' },
    spec: 'cypress/integration/DBRScanner/Test_cameraControlwithfakedevice.js,cypress/integration/DBRScanner/defaults-testpage.js',
    config: { trashAssetsBeforeRuns: false }
  })
  
  await cypress.run({
    browser: 'chrome',
    env: { 'videoToUse': 'barelymoving' },
    spec: 'cypress/integration/DBRScanner/Test_scansettings_barelymoving.js',
    config: { trashAssetsBeforeRuns: false }
  })

  await cypress.run({
    browser: 'chrome',
    spec: 'cypress/integration/DBRReader/Test_resultStructure.js',
    config: { trashAssetsBeforeRuns: false }
  })
  await cypress.run({
    browser: 'chrome',
    env: { 
      'videoToUse': 'barcodeformat2',
      'fileList': getFileList("./cypress/fixtures/bitdepth/")
   },
    spec: 'cypress/integration/DBRReader/Test_decodeAPIs_imageTypes.js',
    config: { trashAssetsBeforeRuns: false }
  })
  await cypress.run({
    browser: 'chrome',
    env: { 'videoToUse': 'barelymoving' },
    spec: 'cypress/integration/Test_settings.js',
    config: { trashAssetsBeforeRuns: false }
  })
  await cypress.run({
    browser: 'chrome',
    spec: 'cypress/integration/Test_Enumcheck.js',
    config: { trashAssetsBeforeRuns: false }
  })
  
  await cypress.run({
    browser: 'chrome',
    spec: 'cypress/integration/Test_wasmLoadTime.js',
    config: { trashAssetsBeforeRuns: false }
  })
  const jsonReport = await merge() // generate JSON report
  await generator.create(jsonReport)
  process.exit() // exit with the number of failed tests
}

runTests()