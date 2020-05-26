describe("compact wasm allbarcodeFormat_result structure",()=>{
    before(()=>{
        cy.visit('/dauto.html')
        cy.window().invoke('initializeDBR', true);
        cy.window().its('reader').should('exist');
        
    })
    beforeEach(()=>{
        cy.window().invoke('clearEnv')
        cy.window().its('reader').as('reader');
    })

    it("TextResultStructure_QRCode", function () {
        var expectRes ="BarcodeFormat\n67108864\nBarcodeFormatString\nQR_CODE\nLocalizationResult\n[object Object]\nbarcodeBytes\n119,119,119,46,100,121,110,97,109,115,111,102,116,46,99,111,109\nbarcodeFormat\n67108864\nbarcodeFormatString\nQR_CODE\nbarcodeFormatString_2\nNo Barcode Format in group 2\nbarcodeFormat_2\n0\nbarcodeText\nwww.dynamsoft.com\ndetailedResult\n[object Object]\nlocalizationResult\n[object Object]\nresults\n[object Object]\nBarcodeText\nwww.dynamsoft.com"
        var expectDetailedRes ="columns\n25\nerrorCorrectionLevel\n2\nmodel\n2\nmoduleSize\n5\nrows\n25\nversion\n2"
        cy.window().invoke('updateBarcodeFormat', [67108864,0]);
        cy.window().its('reader').invoke('decode',"cypress/fixtures/2D_patchcode.png").then(results => {
            expect(results.length).eq(1)
            cy.window().invoke('settingsToStr', results[0]).then((res)=>{
                console.log("res:", res)
                expect(res.join('\n')).eq(expectRes)                
            })
            let res = results[0].localizationResult
            console.log("ss:", res.ResultPoints[0])
            expect(res.ResultPoints).to.deep.equal(['2158, 735','2300, 735','2300, 878','2157, 878'])
            expect(res.accompanyingTextBytes).to.deep.eq([])
            expect(res.angle).eq(0)
            expect(res.barcodeFormat).eq(67108864)
            expect(res.barcodeFormatString).eq("QR_CODE")
            expect(res.barcodeFormatString_2).eq('No Barcode Format in group 2')
            expect(res.barcodeFormat_2).eq(0)
            expect(res.confidence).eq(88)
            expect(res.documentName).to.be.exist
            expect(res.regionName).to.be.exist
            expect(res.moduleSize).eq(5)
            expect(res.pageNumber).eq(0)
            expect(res.resultCoordinateType).eq(1)
            expect(res.terminatePhase).eq(32)
            expect(res.x1).eq(2158)
            expect(res.x2).eq(2300)
            expect(res.x3).eq(2300)
            expect(res.x4).eq(2157)
            expect(res.y1).eq(735)
            expect(res.y2).eq(735)
            expect(res.y3).eq(878)
            expect(res.y4).eq(878)
            cy.window().invoke('settingsToStr', results[0].detailedResult).then((res)=>{
                expect(res.join('\n')).eq(expectDetailedRes)
            })
        })
           
    })
    
    it("detailedresult_DATAMATRIX", function () {
        var expectDetailedRes ="columns\n18\ndataRegionColumns\n16\ndataRegionNumber\n1\ndataRegionRows\n16\nmoduleSize\n8\nrows\n18"
        cy.window().invoke('updateBarcodeFormat', [134217728,0]);
        cy.window().its('reader').invoke('decode',"cypress/fixtures/2D_patchcode.png").then(results => {
            expect(results.length).eq(1)            
            cy.window().invoke('settingsToStr', results[0].detailedResult).then((res)=>{
                expect(res.join('\n')).eq(expectDetailedRes)
            })
        }) 
    })
    it("detailedresult_Aztec", function () {
        var expectDetailedRes ="columns\n15\nlayerNumber\n-1\nmoduleSize\n8\nrows\n15"
        cy.window().invoke('updateBarcodeFormat', [268435456,0]);
        cy.window().its('reader').invoke('decode',"cypress/fixtures/2D_patchcode.png").then(results => {
            expect(results.length).eq(1)            
            cy.window().invoke('settingsToStr', results[0].detailedResult).then((res)=>{
                expect(res.join('\n')).eq(expectDetailedRes)
            })
        })
    });

    it('OneD all', function () {
        cy.window().its('reader').invoke('resetRuntimeSettings') 
        cy.window().its('reader').invoke('decode',"cypress/fixtures/OneD.png").then(results => {
            
            cy.window().invoke("storeReaderResults", results)
            cy.window().its('storedResults').should('have.length',10)
            cy.window().its('storedResults').should('contain','CODE_93_CODE93')
            cy.window().its('storedResults').should('contain','INDUSTRIAL_25_123456')
            cy.window().its('storedResults').should('contain','EAN_8_01234565')
            cy.window().its('storedResults').should('contain','UPC_E_01234565')
            cy.window().its('storedResults').should('contain','CODE_39_EXTENDED_CODE39')
            cy.window().its('storedResults').should('contain','EAN_13_1234567890128')
            cy.window().its('storedResults').should('contain','CODABAR_012345')
            cy.window().its('storedResults').should('contain','CODE_128_Code128012345')
            cy.window().its('storedResults').should('contain','ITF_00123456')
            cy.window().its('storedResults').should('contain','UPC_A_012345678905')
                       
        })       
    })

    Array(1/*BF_CODE_39*/,2/*BF_CODE_128*/,4/*BF_CODE_93*/,8/*BF_CODABAR*/,16/*BF_ITF*/,32/*BF_EAN_13 */,64/*BF_EAN_8 */,128/*BF_UPC_A */,256/*BF_UPC_E*/,
        512/*BF_INDUSTRIAL_25 */,1024/*BF_CODE_39_EXTENDED */,2047/*BF_ONED */).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('reader').invoke('decode',"cypress/fixtures/OneD.png").then(results => {
                if(key == 2047){
                    expect(results.length).eq(10)
                }else if(key==32){
                    expect(results.length).eq(2)
                }
                else{
                    expect(results.length).eq(1)
                }                          
            })  
            
        })
    })

    it('2D and patchcode', function () {
        cy.window().its('reader').invoke('getRuntimeSettings').then((settings)=>{
            settings.furtherModes.dpmCodeReadingModes[0] = 2;
            settings.deblurLevel=5;
            settings.barcodeFormatIds =-32505857
            settings.expectedBarcodesCount =10;
            cy.window().invoke('updateSettings', settings)
            
        })
        cy.window().invoke('decodefile','cypress/fixtures/2D_patchcode.png') 
        //cy.window().invoke("storeReaderResults", res)
        cy.window().its('storedResults').should('contain','AZTEC_Dynamsoft')
        cy.window().its('storedResults').should('contain','Micro PDF417_This is a MicroPDF417 by TEC-IT')       
        cy.window().its('storedResults').should('contain','GS1 Composite Code_12345678901231|2D-data')        
        cy.window().its('storedResults').should('contain','PDF417_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','Micro QR_ABC-abc-1234')
        cy.window().its('storedResults').should('contain','QR_CODE_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','DATAMATRIX_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','PatchCode_Patch 2') 
        cy.window().its('storedResults').should('contain','Maxicode_Maxicode from Dynamsoft')
        cy.window().its('storedResults').should('contain','DATAMATRIX_070032')
        cy.window().its('reader').invoke('resetRuntimeSettings')    
        
    })

    Array(33554432/*BF_PDF417 */,67108864/*BF_QR_CODE */,134217728/*BF_DATAMATRIX */,524288/*BF_MICRO_PDF417*/,268435456/*BF_AZTEC */,536870912/*BF_MAXICODE */,
        1073741824/*BF_MICRO_QR */,-2147483648/*BF_GS1_COMPOSITE */,262144/*BF_PATCHCODE*/).forEach((key)=>{       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('reader').invoke('decode',"cypress/fixtures/2D_patchcode.png").then(results => {                
                expect(results.length).eq(1)
            })  
            
        })
    })

    Array(2048/*BF_GS1_DATABAR_OMNIDIRECTIONAL*/,4096/*BF_GS1_DATABAR_TRUNCATED*/,
        8192/*BF_GS1_DATABAR_STACKED*/,131072/*BF_GS1_DATABAR_LIMITED*/,16384/*BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL*/,
        32768/*BF_GS1_DATABAR_EXPANDED*/,65536/*BF_GS1_DATABAR_EXPANDED_STACKED*/, 260096/*BF_GS1_DATABAR*/).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('reader').invoke('decode',"cypress/fixtures/GSbarcode.png").then(results => { 
                if(key == 260096)
                    expect(results.length).eq(7)
                else  
                    expect(results.length).eq(1)   
            })     
        })
    }) 

    it('all GS1Data', function () {
        cy.window().invoke('updateBarcodeFormat', [260096,0]);       
        cy.window().its('reader').invoke('decode',"cypress/fixtures/GSbarcode.png").then(results => {
            cy.window().invoke("storeReaderResults", results)
            cy.window().its('storedResults').should('contain','GS1 Databar Omnidirectional_01234567890128')
            cy.window().its('storedResults').should('contain','GS1 Databar Limited_01234567890128')
            cy.window().its('storedResults').should('contain','GS1 Databar Stacked Omnidirectional_12345678901231')
            cy.window().its('storedResults').should('contain','GS1 Databar Truncated_24012345678905')
            cy.window().its('storedResults').should('contain','GS1 Databar ExpandedStacked_0112301239123924')
            cy.window().its('storedResults').should('contain','GS1 Databar Stacked_12345678901231')
            cy.window().its('storedResults').should('contain','GS1 Databar Expanded_0123-ABC')
                  
        })  
    })

    Array(2/*BF2_DOTCODE*/,1048576/*BF2_USPSINTELLIGENTMAIL*/,2097152/*BF2_POSTNET*/,
        4194304/*BF2_PLANET*/,8388608/*BF2_AUSTRALIANPOST*/,16777216/*BF2_RM4SCC*/,32505856/*BF2_POSTALCODE*/).forEach((key)=>{
       
        it('BarcodeFormatIds2_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [0, key]);
            cy.window().its('reader').invoke('decode',"cypress/fixtures/postalcode.png").then(results => {  
                if(key == 32505856)
                    expect(results.length).eq(5)
                else  
                    expect(results.length).eq(1)   
            })    
        })
    })

    it('all barcodeformat2', function () {
        cy.window().invoke('updateBarcodeFormat', [0,32505858]);
        cy.window().its('reader').invoke('decode',"cypress/fixtures/postalcode.png").then(results => {
            expect(results.length).eq(6)
            cy.window().invoke("storeReaderResults", results)
            cy.window().its('storedResults').should('contain','Planet_123456789014')
            cy.window().its('storedResults').should('contain','Australian Post_11,12345678,26 44 19 15')
            cy.window().its('storedResults').should('contain','Royal Mail 4-State Customer Barcode_1234567ABC')
            cy.window().its('storedResults').should('contain','USPS Intelligent Mail_44123123456123456789')
            cy.window().its('storedResults').should('contain','DotCode_This is a DotCode')
            cy.window().its('storedResults').should('contain','Postnet_123456789014')
                    
        })  
    })
   
})