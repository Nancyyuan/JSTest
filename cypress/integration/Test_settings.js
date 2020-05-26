describe('compact wasm settings', function () {
    beforeEach(function () {
        
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false);
        cy.window().its('scanner').should('exist');
        cy.window().its('scanner').as('scanner');
        cy.window().its('reader').as('reader');
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke('close')
        cy.reload(true)
    })  

    it('scanner default runtimesettings_speed', ()=>{
        var expectedvalue = "barcodeFormatIds\n234883071\nbarcodeFormatIds_2\n0\nbinarizationModes\n2,0,0,0,0,0,0,0\ndeblurLevel\n0\nexpectedBarcodesCount\n0\nfurtherModes\n[object Object]\nintermediateResultSavingMode\n1\nintermediateResultTypes\n0\nlocalizationModes\n2,0,0,0,0,0,0,0\nmaxAlgorithmThreadCount\n4\nminBarcodeTextLength\n0\nminResultConfidence\n0\npdfRasterDPI\n300\npdfReadingMode\n1\nregion\n[object Object]\nresultCoordinateType\n1\nreturnBarcodeZoneClarity\n0\nscaleDownThreshold\n2300\nscaleUpModes\n1,0,0,0,0,0,0,0\nterminatePhase\n32\ntextResultOrderModes\n1,2,4,0,0,0,0,0\ntimeout\n10000";
        var expectedfuthermode = "accompanyingTextRecognitionModes\n0,0,0,0,0,0,0,0\nbarcodeColourModes\n1,0,0,0,0,0,0,0\nbarcodeComplementModes\n0,0,0,0,0,0,0,0\ncolourClusteringModes\n0,0,0,0,0,0,0,0\ncolourConversionModes\n1,0,0,0,0,0,0,0\ndeformationResistingModes\n0,0,0,0,0,0,0,0\ndpmCodeReadingModes\n0,0,0,0,0,0,0,0\ngrayscaleTransformationModes\n2,0,0,0,0,0,0,0\nimagePreprocessingModes\n2,0,0,0,0,0,0,0\nregionPredetectionModes\n2,0,0,0,0,0,0,0\ntextAssistedCorrectionMode\n2\ntextFilterModes\n2,0,0,0,0,0,0,0\ntextureDetectionModes\n2,0,0,0,0,0,0,0";
        var expectedRegion = "regionBottom\n0\nregionLeft\n0\nregionMeasuredByPercentage\n0\nregionRight\n0\nregionTop\n0";
        cy.window().its('scanner').invoke('getRuntimeSettings').then((settings)=>{
            cy.window().invoke('settingsToStr', settings).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
            cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                expect(res.join('\n')).eq(expectedfuthermode)
            })            
            cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                expect(res.join('\n')).eq(expectedRegion)
            })
        })
        cy.window().its('scanner').invoke('updateRuntimeSettings','speed').then(function () {
            cy.window().its('scanner').invoke('getRuntimeSettings').then((settings)=>{
                cy.window().invoke('settingsToStr', settings).then((res)=>{
                    expect(res.join('\n')).eq(expectedvalue)
                })
                cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                    expect(res.join('\n')).eq(expectedfuthermode)
                })            
                cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                    expect(res.join('\n')).eq(expectedRegion)
                })
            })
        })
    })

    it('reader default runtimesettings_coverage', ()=>{
        var expectedvalue = "barcodeFormatIds\n234883071\nbarcodeFormatIds_2\n0\nbinarizationModes\n2,0,0,0,0,0,0,0\ndeblurLevel\n9\nexpectedBarcodesCount\n512\nfurtherModes\n[object Object]\nintermediateResultSavingMode\n1\nintermediateResultTypes\n0\nlocalizationModes\n2,16,4,8,0,0,0,0\nmaxAlgorithmThreadCount\n4\nminBarcodeTextLength\n0\nminResultConfidence\n0\npdfRasterDPI\n300\npdfReadingMode\n1\nregion\n[object Object]\nresultCoordinateType\n1\nreturnBarcodeZoneClarity\n0\nscaleDownThreshold\n100000\nscaleUpModes\n1,0,0,0,0,0,0,0\nterminatePhase\n32\ntextResultOrderModes\n1,2,4,0,0,0,0,0\ntimeout\n100000";
        var expectedfuthermode = "accompanyingTextRecognitionModes\n0,0,0,0,0,0,0,0\nbarcodeColourModes\n1,0,0,0,0,0,0,0\nbarcodeComplementModes\n0,0,0,0,0,0,0,0\ncolourClusteringModes\n0,0,0,0,0,0,0,0\ncolourConversionModes\n1,0,0,0,0,0,0,0\ndeformationResistingModes\n0,0,0,0,0,0,0,0\ndpmCodeReadingModes\n0,0,0,0,0,0,0,0\ngrayscaleTransformationModes\n2,0,0,0,0,0,0,0\nimagePreprocessingModes\n2,0,0,0,0,0,0,0\nregionPredetectionModes\n2,0,0,0,0,0,0,0\ntextAssistedCorrectionMode\n2\ntextFilterModes\n2,0,0,0,0,0,0,0\ntextureDetectionModes\n2,0,0,0,0,0,0,0";
        var expectedRegion = "regionBottom\n0\nregionLeft\n0\nregionMeasuredByPercentage\n0\nregionRight\n0\nregionTop\n0";
        cy.window().its('reader').invoke('getRuntimeSettings').then((settings)=>{
            cy.window().invoke('settingsToStr', settings).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
            cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                expect(res.join('\n')).eq(expectedfuthermode)
            })            
            cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                expect(res.join('\n')).eq(expectedRegion)
            })
        })
        cy.window().its('reader').invoke('updateRuntimeSettings','coverage').then(function () {
            cy.window().its('reader').invoke('getRuntimeSettings').then((settings)=>{
                cy.window().invoke('settingsToStr', settings).then((res)=>{
                    expect(res.join('\n')).eq(expectedvalue)
                })
                cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                    expect(res.join('\n')).eq(expectedfuthermode)
                })            
                cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                    expect(res.join('\n')).eq(expectedRegion)
                })
            })
        })
    }) 
    
    it('check reader balance preset', function () {
        var expectedvalue = "barcodeFormatIds\n234883071\nbarcodeFormatIds_2\n0\nbinarizationModes\n2,0,0,0,0,0,0,0\ndeblurLevel\n5\nexpectedBarcodesCount\n512\nfurtherModes\n[object Object]\nintermediateResultSavingMode\n1\nintermediateResultTypes\n0\nlocalizationModes\n2,16,0,0,0,0,0,0\nmaxAlgorithmThreadCount\n4\nminBarcodeTextLength\n0\nminResultConfidence\n0\npdfRasterDPI\n300\npdfReadingMode\n1\nregion\n[object Object]\nresultCoordinateType\n1\nreturnBarcodeZoneClarity\n0\nscaleDownThreshold\n100000\nscaleUpModes\n1,0,0,0,0,0,0,0\nterminatePhase\n32\ntextResultOrderModes\n1,2,4,0,0,0,0,0\ntimeout\n100000";
        var expectedfuthermode = "accompanyingTextRecognitionModes\n0,0,0,0,0,0,0,0\nbarcodeColourModes\n1,0,0,0,0,0,0,0\nbarcodeComplementModes\n0,0,0,0,0,0,0,0\ncolourClusteringModes\n0,0,0,0,0,0,0,0\ncolourConversionModes\n1,0,0,0,0,0,0,0\ndeformationResistingModes\n0,0,0,0,0,0,0,0\ndpmCodeReadingModes\n0,0,0,0,0,0,0,0\ngrayscaleTransformationModes\n2,0,0,0,0,0,0,0\nimagePreprocessingModes\n2,0,0,0,0,0,0,0\nregionPredetectionModes\n2,0,0,0,0,0,0,0\ntextAssistedCorrectionMode\n2\ntextFilterModes\n2,0,0,0,0,0,0,0\ntextureDetectionModes\n2,0,0,0,0,0,0,0";
        var expectedRegion = "regionBottom\n0\nregionLeft\n0\nregionMeasuredByPercentage\n0\nregionRight\n0\nregionTop\n0";
        cy.window().its('reader').invoke('updateRuntimeSettings','balance').then(function () {
            cy.window().its('reader').invoke('getRuntimeSettings').then(function (settings) {
                cy.window().invoke('settingsToStr', settings).then((res)=>{
                    expect(res.join('\n')).eq(expectedvalue)
                })
                cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                    expect(res.join('\n')).eq(expectedfuthermode)
                })            
                cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                    expect(res.join('\n')).eq(expectedRegion)
                })
            })
        })
    })

    it('check reader speed preset', function () {
        var expectedvalue = "barcodeFormatIds\n234883071\nbarcodeFormatIds_2\n0\nbinarizationModes\n2,0,0,0,0,0,0,0\ndeblurLevel\n3\nexpectedBarcodesCount\n0\nfurtherModes\n[object Object]\nintermediateResultSavingMode\n1\nintermediateResultTypes\n0\nlocalizationModes\n2,0,0,0,0,0,0,0\nmaxAlgorithmThreadCount\n4\nminBarcodeTextLength\n0\nminResultConfidence\n0\npdfRasterDPI\n300\npdfReadingMode\n1\nregion\n[object Object]\nresultCoordinateType\n1\nreturnBarcodeZoneClarity\n0\nscaleDownThreshold\n100000\nscaleUpModes\n1,0,0,0,0,0,0,0\nterminatePhase\n32\ntextResultOrderModes\n1,2,4,0,0,0,0,0\ntimeout\n100000";
        var expectedfuthermode = "accompanyingTextRecognitionModes\n0,0,0,0,0,0,0,0\nbarcodeColourModes\n1,0,0,0,0,0,0,0\nbarcodeComplementModes\n0,0,0,0,0,0,0,0\ncolourClusteringModes\n0,0,0,0,0,0,0,0\ncolourConversionModes\n1,0,0,0,0,0,0,0\ndeformationResistingModes\n0,0,0,0,0,0,0,0\ndpmCodeReadingModes\n0,0,0,0,0,0,0,0\ngrayscaleTransformationModes\n2,0,0,0,0,0,0,0\nimagePreprocessingModes\n2,0,0,0,0,0,0,0\nregionPredetectionModes\n2,0,0,0,0,0,0,0\ntextAssistedCorrectionMode\n2\ntextFilterModes\n2,0,0,0,0,0,0,0\ntextureDetectionModes\n2,0,0,0,0,0,0,0";
        var expectedRegion = "regionBottom\n0\nregionLeft\n0\nregionMeasuredByPercentage\n0\nregionRight\n0\nregionTop\n0";
        cy.window().its('reader').invoke('updateRuntimeSettings','speed').then(function () {
            cy.window().its('reader').invoke('getRuntimeSettings').then(function (settings) {
                cy.window().invoke('settingsToStr', settings).then((res)=>{
                    expect(res.join('\n')).eq(expectedvalue)
                })
                cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                    expect(res.join('\n')).eq(expectedfuthermode)
                })            
                cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                    expect(res.join('\n')).eq(expectedRegion)
                })
            })
        })
    })
    it('check scanner balance preset', function () {
        var expectedvalue = "barcodeFormatIds\n234883071\nbarcodeFormatIds_2\n0\nbinarizationModes\n2,0,0,0,0,0,0,0\ndeblurLevel\n3\nexpectedBarcodesCount\n512\nfurtherModes\n[object Object]\nintermediateResultSavingMode\n1\nintermediateResultTypes\n0\nlocalizationModes\n2,16,0,0,0,0,0,0\nmaxAlgorithmThreadCount\n4\nminBarcodeTextLength\n0\nminResultConfidence\n0\npdfRasterDPI\n300\npdfReadingMode\n1\nregion\n[object Object]\nresultCoordinateType\n1\nreturnBarcodeZoneClarity\n0\nscaleDownThreshold\n2300\nscaleUpModes\n1,0,0,0,0,0,0,0\nterminatePhase\n32\ntextResultOrderModes\n1,2,4,0,0,0,0,0\ntimeout\n100000";
        var expectedfuthermode = "accompanyingTextRecognitionModes\n0,0,0,0,0,0,0,0\nbarcodeColourModes\n1,0,0,0,0,0,0,0\nbarcodeComplementModes\n0,0,0,0,0,0,0,0\ncolourClusteringModes\n0,0,0,0,0,0,0,0\ncolourConversionModes\n1,0,0,0,0,0,0,0\ndeformationResistingModes\n0,0,0,0,0,0,0,0\ndpmCodeReadingModes\n0,0,0,0,0,0,0,0\ngrayscaleTransformationModes\n2,0,0,0,0,0,0,0\nimagePreprocessingModes\n2,0,0,0,0,0,0,0\nregionPredetectionModes\n2,0,0,0,0,0,0,0\ntextAssistedCorrectionMode\n2\ntextFilterModes\n2,0,0,0,0,0,0,0\ntextureDetectionModes\n2,0,0,0,0,0,0,0";
        var expectedRegion = "regionBottom\n0\nregionLeft\n0\nregionMeasuredByPercentage\n0\nregionRight\n0\nregionTop\n0";
        cy.window().its('scanner').invoke('updateRuntimeSettings','balance').then(function () {
            cy.wrap(this.scanner.getRuntimeSettings()).then(function (settings) {
                expect(settings.localizationModes).to.deep.equal([2, 16, 0, 0, 0, 0, 0, 0]);
                expect(settings.expectedBarcodesCount).to.equal(512);
                expect(settings.scaleDownThreshold).to.equal(2300);
                expect(settings.timeout).to.equal(100000);
                cy.window().invoke('settingsToStr', settings).then((res)=>{
                    expect(res.join('\n')).eq(expectedvalue)
                })
                cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                    expect(res.join('\n')).eq(expectedfuthermode)
                })            
                cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                    expect(res.join('\n')).eq(expectedRegion)
                })
            })
        })
    })

    it('check scanner coverage preset', function () {
        var expectedvalue = "barcodeFormatIds\n234883071\nbarcodeFormatIds_2\n0\nbinarizationModes\n2,0,0,0,0,0,0,0\ndeblurLevel\n5\nexpectedBarcodesCount\n512\nfurtherModes\n[object Object]\nintermediateResultSavingMode\n1\nintermediateResultTypes\n0\nlocalizationModes\n2,16,4,8,0,0,0,0\nmaxAlgorithmThreadCount\n4\nminBarcodeTextLength\n0\nminResultConfidence\n0\npdfRasterDPI\n300\npdfReadingMode\n1\nregion\n[object Object]\nresultCoordinateType\n1\nreturnBarcodeZoneClarity\n0\nscaleDownThreshold\n100000\nscaleUpModes\n1,0,0,0,0,0,0,0\nterminatePhase\n32\ntextResultOrderModes\n1,2,4,0,0,0,0,0\ntimeout\n100000";
        var expectedfuthermode = "accompanyingTextRecognitionModes\n0,0,0,0,0,0,0,0\nbarcodeColourModes\n1,0,0,0,0,0,0,0\nbarcodeComplementModes\n0,0,0,0,0,0,0,0\ncolourClusteringModes\n0,0,0,0,0,0,0,0\ncolourConversionModes\n1,0,0,0,0,0,0,0\ndeformationResistingModes\n0,0,0,0,0,0,0,0\ndpmCodeReadingModes\n0,0,0,0,0,0,0,0\ngrayscaleTransformationModes\n2,0,0,0,0,0,0,0\nimagePreprocessingModes\n2,0,0,0,0,0,0,0\nregionPredetectionModes\n2,0,0,0,0,0,0,0\ntextAssistedCorrectionMode\n2\ntextFilterModes\n2,0,0,0,0,0,0,0\ntextureDetectionModes\n2,0,0,0,0,0,0,0";
        var expectedRegion = "regionBottom\n0\nregionLeft\n0\nregionMeasuredByPercentage\n0\nregionRight\n0\nregionTop\n0";
        cy.window().its('scanner').invoke('updateRuntimeSettings','coverage').then(function () {
            cy.window().its('scanner').invoke('getRuntimeSettings').then((settings)=>{
                cy.window().invoke('settingsToStr', settings).then((res)=>{
                    expect(res.join('\n')).eq(expectedvalue)
                })
                cy.window().invoke('settingsToStr', settings.furtherModes).then((res)=>{
                    expect(res.join('\n')).eq(expectedfuthermode)
                })            
                cy.window().invoke('settingsToStr', settings.region).then((res)=>{
                    expect(res.join('\n')).eq(expectedRegion)
                })
            })
        })
    })

    it("updateRuntimeSettings catch error", ()=>{
        cy.window().its('scanner').invoke('getRuntimeSettings').then((settings)=>{
            settings.deblurLevel =10;
            cy.window().invoke('updateSettings', settings)
            cy.window().its('errormessage').should('eq', "DeblurLevel-The parameter value is invalid or out of range.")
        })
    })
    it("updateRuntimeSettings Robust",()=>{
        cy.window().then((win)=>{
            win.reader.updateRuntimeSettings(function(){}).catch((ex)=>{expect(ex.message).to.be.eq("'UpdateRuntimeSettings(settings)': Type of 'settings' should be 'String' or 'PlainObject'.")})                      
        })
    })

    it('furtherModes + getModeArgument and setModeArgument', function () { // todo
        cy.wrap(this.scanner.getRuntimeSettings()).then(function (settings) {
            settings.binarizationModes = [2, 0, 0, 0, 0, 0, 0, 0];
            settings.furtherModes.imagePreprocessingModes = [4, 0, 0, 0, 0, 0, 0, 0];
            settings.furtherModes.deformationResistingModes = [2, 0, 0, 0, 0, 0, 0, 0];
            cy.wrap(this.scanner.updateRuntimeSettings(settings)).then(function () {

                cy.wrap(this.scanner.getRuntimeSettings()).then(function (runtimeSettings) {
                    expect(runtimeSettings.binarizationModes).to.deep.equal([2, 0, 0, 0, 0, 0, 0, 0]);
                    expect(runtimeSettings.furtherModes.imagePreprocessingModes).to.deep.equal([4, 0, 0, 0, 0, 0, 0, 0]);
                    expect(runtimeSettings.furtherModes.deformationResistingModes).to.deep.equal([2, 0, 0, 0, 0, 0, 0, 0]);
                })
                cy.wrap(this.scanner.setModeArgument('ImagePreprocessingModes', 0, 'Sensitivity', '9')).then(function () {
                    cy.wrap(this.scanner.getModeArgument('ImagePreprocessingModes', 0, 'Sensitivity')).then(function (argValue) {
                        expect(argValue).to.equal('9')
                    })
                })
                cy.wrap(this.scanner.setModeArgument('BinarizationModes', 0, 'BlockSizeX', '7')).then(function () {
                    cy.wrap(this.scanner.getModeArgument('BinarizationModes', 0, 'BlockSizeX')).then(function (argValue) {
                        expect(argValue).to.equal('7')
                    })
                })
                cy.wrap(this.scanner.setModeArgument('DeformationResistingModes', 0, 'Level', '9')).then(function () {
                    cy.wrap(this.scanner.getModeArgument('DeformationResistingModes', 0, 'Level')).then(function (argValue) {
                        expect(argValue).to.equal('9')
                    })
                })
            })
        })
    })

    it('setModeArgument catch error', ()=>{
        cy.window().invoke("setModeArgs", ['ImagePreprocessingModes', 0, 'notexist', '10'])
        cy.window().its('errormessage').should('eq', "The argument key is invalid.")
    })

    it('initRuntimeSettingsWithString catch error', ()=>{
        cy.window().invoke('initRuntimeSetting', "{\"ImageParameter\":{\"Name\":\"VIN\", \
        \"DeblurLevel\":9,\"BarcodeFormatIds\": [ \"BF_CODE_128\"], \
        \"ExpectedBarcodesCount\":1,\"FormatSpecificationNameArray\": [ \"FormatSpecification1\" ], \
        \"ScaleDownThreshold\":100000, \
        \"BarcodeColourModes\" : [{ \"LightReflection\" : 1,\"Mode\" : \"BICM_DARK_ON_LIGHT\"}, {\"LightReflection\" : 1,\"Mode\" :\"BICM_DARK_ON_LIGHT_DARK_SURROUNDING\"} ], \
        \"LocalizationModes\":[{\"Mode\": \"LM_STATISTICS_MARKS\"},{\"Mode\":\"LM_LINES\"},{\"Mode\":\"LM_CONNECTED_BLOCKS\"}]},\
        \"FormatSpecification\": { \
            \"BarcodeFormatIds\": [\"BF_CODE_128\"],\
            \"BarcodeTextRegExPattern\" : \"^[A-Z0-9]{17}$\",  \
            \"Name\" : \"FormatSpecification1\"} }")
        
        cy.window().its('errormessage').should('eq', "initRuntimeSettingsWithString() is not supported in the compact version. Please try the full-featured version.");
    })
    it('outputSettingsToString catch error',()=>{
        cy.window().then((win)=>{
            win.reader.outputSettingsToString().catch(ex=>{expect(ex.message).to.be
                .equal("outputSettingsToString() is not supported in the compact version. Please try the full-featured version.")})           
        })
    })
    it("intermediateResult catch error", ()=>{
        cy.window().invoke('getIntermediateResult')
        cy.window().its('errormessage').should('eq', "Intermediate results is not supported in the compact version. Please try the full-featured version.")
    })

    it("DPM setting catch error", ()=>{
        cy.window().invoke('updateBarcodeFormat',[0,0])
        cy.window().its('errormessage').should('eq',"Some of the specified barcode formats are not supported in the compact version. Please try the full-featured version.")
    })
    
    Array(524288/*BF_MICRO_PDF417*/,268435456/*BF_AZTEC */,536870912/*BF_MAXICODE */,1073741824/*BF_MICRO_QR */,
        -2147483648/*BF_GS1_COMPOSITE */,262144/*BF_PATCHCODE*/,2048/*BF_GS1_DATABAR_OMNIDIRECTIONAL*/,4096/*BF_GS1_DATABAR_TRUNCATED*/,
        8192/*BF_GS1_DATABAR_STACKED*/,131072/*BF_GS1_DATABAR_LIMITED*/,16384/*BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL*/,
        32768/*BF_GS1_DATABAR_EXPANDED*/,65536/*BF_GS1_DATABAR_EXPANDED_STACKED*/, 260096/*BF_GS1_DATABAR*/).forEach((key)=>{
       
        it('update unsupported BarcodeFormatIds throw errors_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('errormessage').should('eq',"Some of the specified barcode formats are not supported in the compact version. Please try the full-featured version.")
        })
    })

    Array(2/*BF2_DOTCODE*/,1048576/*BF2_USPSINTELLIGENTMAIL*/,2097152/*BF2_POSTNET*/,
        4194304/*BF2_PLANET*/,8388608/*BF2_AUSTRALIANPOST*/,16777216/*BF2_RM4SCC*/,32505856/*BF2_POSTALCODE*/).forEach((key)=>{
        it('update unsupported BarcodeFormatIds_2 throw errors_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [0,key]);
            cy.window().its('errormessage').should('eq',"Some of the specified barcode formats are not supported in the compact version. Please try the full-featured version.")
        })
    })

})

 describe('full wasm settings', ()=>{
    beforeEach(function () {
        
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', true, "speed");
        cy.window().its('scanner').should('exist');
        cy.window().its('scanner').as('scanner')
        cy.window().its('reader').as('reader')
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke('destroy')
        cy.reload(true)
    })  
    
    it('initRuntimeSettingsWithString ok', ()=>{
            cy.window().invoke('initRuntimeSetting', "{\"ImageParameter\":{\"Name\":\"VIN\", \
            \"DeblurLevel\":9,\"BarcodeFormatIds\": [ \"BF_CODE_128\"], \
            \"ExpectedBarcodesCount\":1,\"FormatSpecificationNameArray\": [ \"FormatSpecification1\" ], \
            \"ScaleDownThreshold\":100000, \
            \"BarcodeColourModes\" : [{ \"LightReflection\" : 1,\"Mode\" : \"BICM_DARK_ON_LIGHT\"}, {\"LightReflection\" : 1,\"Mode\" :\"BICM_DARK_ON_LIGHT_DARK_SURROUNDING\"} ], \
            \"LocalizationModes\":[{\"Mode\": \"LM_STATISTICS_MARKS\"},{\"Mode\":\"LM_LINES\"},{\"Mode\":\"LM_CONNECTED_BLOCKS\"}]},\
            \"FormatSpecification\": { \
                \"BarcodeFormatIds\": [\"BF_CODE_128\"],\
                \"BarcodeTextRegExPattern\" : \"^[A-Z0-9]{17}$\",  \
                \"Name\" : \"FormatSpecification1\"} }")
            
            cy.window().its('errormessage').should('eq', "");
            cy.window().its('scanner').invoke('getRuntimeSettings').then((settings)=>{
                expect(settings.deblurLevel).eq(9)
            })
        })

    it("intermediateResult ok", ()=>{
        cy.window().invoke('getIntermediateResult')
        cy.window().its('errormessage').should('eq',"")
        cy.window().its('scanner').invoke('open')
        cy.wait(1000)
        cy.window().its('IRTResult').should('have.length', "1")
        cy.window().its('IRTResult').each((res)=>{
            expect(res[0].width).eq(1280)
            expect(res[0].height).eq(720)
        })    
    })

    it("DPM setting ok", ()=>{
        cy.window().invoke('updateBarcodeFormat',[0,0])
        cy.window().its('errormessage').should('eq',"")
    })

    it('getRuntimeSettings and updateRuntimeSettings', function () {
        cy.wrap(this.scanner.getRuntimeSettings()).then(function (settings) {
            settings.barcodeFormatIds = -32505857;
            settings.barcodeFormatIds_2 = 32505856;
            settings.binarizationModes = [2, 2, 0, 0, 0, 0, 0, 0];// this can be duplicated
            settings.deblurLevel = 7;
            settings.expectedBarcodesCount = 2;
            settings.intermediateResultSavingMode = 2;
            settings.intermediateResultTypes = 64;
            settings.furtherModes.accompanyingTextRecognitionModes=[1,0,0,0,0,0,0,0]
            settings.furtherModes.barcodeColourModes=[2,0,0,0,0,0,0,0]
            settings.furtherModes.barcodeComplementModes=[2,0,0,0,0,0,0,0]
            settings.furtherModes.colourClusteringModes=[2,0,0,0,0,0,0,0]
            settings.furtherModes.colourConversionModes=[0,0,0,0,0,0,0,0]
            settings.furtherModes.deformationResistingModes=[2,0,0,0,0,0,0,0]
            settings.furtherModes.dpmCodeReadingModes=[2,0,0,0,0,0,0,0]
            settings.furtherModes.grayscaleTransformationModes=[2,1,0,0,0,0,0,0]
            settings.furtherModes.imagePreprocessingModes=[2,4,8,16,0,0,0,0]
            settings.furtherModes.regionPredetectionModes=[2,4,8,16,0,0,0,0]
            settings.furtherModes.textAssistedCorrectionMode=4
            settings.furtherModes.textFilterModes=[0,0,0,0,0,0,0,0]
            settings.furtherModes.textureDetectionModes=[1,0,0,0,0,0,0,0]
            settings.localizationModes =  [2, 4, 8, 0, 0, 0, 0, 0];
            settings.maxAlgorithmThreadCount =1;
            settings.minBarcodeTextLength = 6;
            settings.minResultConfidence = 65;
            settings.pdfRasterDPI =200;            
            settings.region = {
                regionLeft: 25,
                regionTop: 25,
                regionBottom: 75,
                regionRight: 75,
                regionMeasuredByPercentage: 1
            };
            settings.resultCoordinateType = 2;
            settings.returnBarcodeZoneClarity = 1;
            settings.scaleDownThreshold = 2000;
            settings.scaleUpModes = [2, 4, 1, 0, 0, 0, 0, 0];
            settings.terminatePhase = 16;
            settings.textResultOrderModes = [4, 2, 1, 0, 0, 0, 0, 0];
            settings.timeout = 7000;
            cy.wrap(this.scanner.updateRuntimeSettings(settings)).then(function () {
                cy.wrap(this.scanner.getRuntimeSettings()).then(function (runtimeSettings) {
                    expect(runtimeSettings.barcodeFormatIds).to.equal(-32505857);
                    expect(runtimeSettings.barcodeFormatIds_2).to.equal(32505856);
                    expect(runtimeSettings.binarizationModes).to.deep.equal([2, 2, 2, 0, 0, 0, 0, 0]);
                    expect(runtimeSettings.deblurLevel).to.equal(7);
                    expect(runtimeSettings.expectedBarcodesCount).to.equal(2);
                    expect(runtimeSettings.intermediateResultSavingMode).eq(2);
                    expect(runtimeSettings.intermediateResultTypes).to.equal(64);
                    expect(runtimeSettings.furtherModes.accompanyingTextRecognitionModes).to.deep.equal([0,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.barcodeColourModes).to.deep.equal([2,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.barcodeComplementModes).to.deep.equal([2,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.colourClusteringModes).to.deep.equal([2,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.colourConversionModes).to.deep.equal([0,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.deformationResistingModes).to.deep.equal([2,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.dpmCodeReadingModes).to.deep.equal([2,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.grayscaleTransformationModes).to.deep.equal([2,1,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.imagePreprocessingModes).to.deep.equal([2,4,8,16,0,0,0,0])
                    expect(runtimeSettings.furtherModes.regionPredetectionModes).to.deep.equal([2,4,8,16,0,0,0,0])
                    expect(runtimeSettings.furtherModes.textAssistedCorrectionMode).to.eq(4)
                    expect(runtimeSettings.furtherModes.textFilterModes).to.deep.equal([0,0,0,0,0,0,0,0])
                    expect(runtimeSettings.furtherModes.textureDetectionModes).to.deep.equal([1,0,0,0,0,0,0,0])
                    expect(runtimeSettings.localizationModes).to.deep.equal([2, 4, 8, 32, 64, 0, 0, 0]);
                    expect(runtimeSettings.maxAlgorithmThreadCount).to.eq(1);
                    expect(runtimeSettings.minBarcodeTextLength).to.equal(6);
                    expect(runtimeSettings.minResultConfidence).to.equal(65);
                    expect(runtimeSettings.pdfRasterDPI).to.eq(200);  
                    expect(runtimeSettings.region).to.deep.equal({
                        regionLeft: 25,
                        regionTop: 25,
                        regionBottom: 75,
                        regionRight: 75,
                        regionMeasuredByPercentage: 1
                    });
                    expect(runtimeSettings.resultCoordinateType).to.equal(2);
                    expect(runtimeSettings.returnBarcodeZoneClarity).to.equal(1);
                    expect(runtimeSettings.scaleDownThreshold).to.equal(2000);
                    expect(runtimeSettings.scaleUpModes).to.deep.equal([2, 4, 1, 0, 0, 0, 0, 0]);
                    expect(runtimeSettings.terminatePhase).to.equal(16);
                    expect(runtimeSettings.textResultOrderModes).to.deep.equal([4, 2, 1, 0, 0, 0, 0, 0]);
                    expect(runtimeSettings.timeout).to.equal(7000);
                })
            })
        })
    })

    it('outputSettingsToString ok',()=>{
        cy.window().then((win)=>{
            win.reader.outputSettingsToString().then(str=>{
                expect(str).to.be.eq('{\n   "ImageParameter" : {\n      "AccompanyingTextRecognitionModes" : [\n         {\n            "Mode" : "ATRM_SKIP"\n         }\n      ],\n      "BarcodeColourModes" : [\n         {\n            "LightReflection" : 1,\n            "Mode" : "BICM_DARK_ON_LIGHT"\n         }\n      ],\n      "BarcodeComplementModes" : [\n         {\n            "Mode" : "BCM_SKIP"\n         }\n      ],\n      "BarcodeFormatIds" : [ "BF_ALL" ],\n      "BarcodeFormatIds_2" : [ "BF2_POSTALCODE", "BF2_DOTCODE" ],\n      "BinarizationModes" : [\n         {\n            "BlockSizeX" : 0,\n            "BlockSizeY" : 0,\n            "EnableFillBinaryVacancy" : 1,\n            "ImagePreprocessingModesIndex" : -1,\n            "Mode" : "BM_LOCAL_BLOCK",\n            "ThreshValueCoefficient" : 10\n         },\n         {\n            "BlockSizeX" : 0,\n            "BlockSizeY" : 0,\n            "EnableFillBinaryVacancy" : 0,\n            "ImagePreprocessingModesIndex" : -1,\n            "Mode" : "BM_LOCAL_BLOCK",\n            "ThreshValueCoefficient" : 15\n         }\n      ],\n      "ColourClusteringModes" : [\n         {\n            "Mode" : "CCM_SKIP"\n         }\n      ],\n      "ColourConversionModes" : [\n         {\n            "BlueChannelWeight" : -1,\n            "GreenChannelWeight" : -1,\n            "Mode" : "CICM_GENERAL",\n            "RedChannelWeight" : -1\n         }\n      ],\n      "DPMCodeReadingModes" : [\n         {\n            "Mode" : "DPMCRM_GENERAL"\n         }\n      ],\n      "DeblurLevel" : 9,\n      "DeformationResistingModes" : [\n         {\n            "Mode" : "DRM_SKIP"\n         }\n      ],\n      "Description" : "",\n      "ExpectedBarcodesCount" : 512,\n      "FormatSpecificationNameArray" : null,\n      "GrayscaleTransformationModes" : [\n         {\n            "Mode" : "GTM_ORIGINAL"\n         },\n         {\n            "Mode" : "GTM_INVERTED"\n         }\n      ],\n      "ImagePreprocessingModes" : [\n         {\n            "Mode" : "IPM_GENERAL"\n         }\n      ],\n      "IntermediateResultSavingMode" : {\n         "Mode" : "IRSM_MEMORY"\n      },\n      "IntermediateResultTypes" : [ "IRT_NO_RESULT" ],\n      "LocalizationModes" : [\n         {\n            "Mode" : "LM_CONNECTED_BLOCKS"\n         },\n         {\n            "Mode" : "LM_SCAN_DIRECTLY",\n            "ScanDirection" : 0,\n            "ScanStride" : 0\n         },\n         {\n            "Mode" : "LM_STATISTICS"\n         },\n         {\n            "Mode" : "LM_LINES"\n         },\n         {\n            "Mode" : "LM_STATISTICS_MARKS"\n         },\n         {\n            "Mode" : "LM_STATISTICS_POSTAL_CODE"\n         }\n      ],\n      "MaxAlgorithmThreadCount" : 4,\n      "Name" : "default",\n      "PDFRasterDPI" : 300,\n      "PDFReadingMode" : {\n         "Mode" : "PDFRM_AUTO"\n      },\n      "Pages" : "",\n      "RegionDefinitionNameArray" : null,\n      "RegionPredetectionModes" : [\n         {\n            "Mode" : "RPM_GENERAL"\n         }\n      ],\n      "ResultCoordinateType" : "RCT_PIXEL",\n      "ReturnBarcodeZoneClarity" : 0,\n      "ScaleDownThreshold" : 100000,\n      "ScaleUpModes" : [\n         {\n            "Mode" : "SUM_AUTO"\n         }\n      ],\n      "TerminatePhase" : "TP_BARCODE_RECOGNIZED",\n      "TextAssistedCorrectionMode" : {\n         "BottomTextPercentageSize" : 0,\n         "LeftTextPercentageSize" : 0,\n         "Mode" : "TACM_VERIFYING",\n         "RightTextPercentageSize" : 0,\n         "TopTextPercentageSize" : 0\n      },\n      "TextFilterModes" : [\n         {\n            "MinImageDimension" : 65536,\n            "Mode" : "TFM_GENERAL_CONTOUR",\n            "Sensitivity" : 0\n         }\n      ],\n      "TextResultOrderModes" : [\n         {\n            "Mode" : "TROM_CONFIDENCE"\n         },\n         {\n            "Mode" : "TROM_POSITION"\n         },\n         {\n            "Mode" : "TROM_FORMAT"\n         }\n      ],\n      "TextureDetectionModes" : [\n         {\n            "Mode" : "TDM_GENERAL_WIDTH_CONCENTRATION",\n            "Sensitivity" : 5\n         }\n      ],\n      "Timeout" : 15000\n   },\n   "Version" : "3.0"\n}\n')
            })
        })
    })

 })

