
describe("License Tracking server - by device - 2D", function(){
    before(()=>{
        cy.request("http://localhost:5000")//?runtimeKeys=forscans&admin=true
        .then((response)=>{
            expect(response.status).to.eq(200);  
            cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
                expect(res.body).eq(true);
            })          
        })

        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsLicenseInfo")
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsfordevicunsV2")
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.reload(true);
    })


    it("verification over limit",()=>{
        cy.request("POST", "http://localhost:5000/api/command/updateLicense", 
            "{ \"runtimeKeys\": \"fordevic\", \
                \"productKeys\": \"\", \
                \"expireTime\":\"20210511\", \
                \"timeZone\":0, \
                \"consumeType\" : \"device\",\
                \"deviceDuration\":-1,\
                \"barcodeLimit\":0,\
                \"deviceLimit\":1,\
                \"sessionLimit\":0, \
                \"barcodeUsed\":0,\
                \"deviceUsed\":2, \
                \"maxSession\":0 \
                }")
        cy.visit('/fordevice.html')
        cy.window().invoke('initializeDBR', false);
        cy.window().its('errormessage').should('eq',"Error: License is over limit.")
    })

    it("verification ok and send record interval time",()=>{   
        var temp=0;     
        cy.request("POST", "http://localhost:5000/api/command/updateLicense", 
            "{ \"runtimeKeys\": \"fordevic\", \
                \"productKeys\": \"\", \
                \"expireTime\":\"20210511\", \
                \"timeZone\":0, \
                \"consumeType\" : \"device\",\
                \"deviceDuration\":-1,\
                \"barcodeLimit\":0,\
                \"deviceLimit\":1,\
                \"sessionLimit\":0, \
                \"barcodeUsed\":0,\
                \"deviceUsed\":1, \
                \"maxSession\":0 \
                }")
    
        cy.visit('/fordevice.html')
        cy.window().invoke('initializeDBR', true, "coverage");        
        cy.window().its('errormessage').should('eq',"");
        cy.window().invoke('updateBarcodeFormat', [33554432,0]);
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',1)
        cy.wait(5000);
        cy.window().invoke('getURL', 'fordevic', 'getReqCount').then((url)=>{
            cy.request(url).then((res)=>{
                expect(res.body).eq('{"succGetReq":1,"failGetReq":1,"postReq":1}')})
        })
        
        cy.window().invoke('getURL', 'fordevic', 'getDailyRecord').then((url)=>{
            cy.request(url).then((res)=>{
                console.log("daily",res.body);
                expect(res.body.length).eq(1);
                expect(res.body[0].decodeTime).to.be.gt(0);
                temp=res.body[0].decodeTime;
                expect(res.body[0].device).contain("-Windows-Chrome");
                expect(res.body[0].acceptTime).be.gt(0);
                expect(res.body[0].allBarcode).eq(res.body[0].pdf417).eq(1);
                expect(res.body[0].qr).eq(res.body[0].oned).eq(res.body[0].dm).eq(res.body[0].mc).eq(res.body[0].other).eq(0);
            })
        })
        cy.window().invoke('updateBarcodeFormat', [0,0]);
        cy.window().its('storedResults').should('have.length',1)
        cy.wait(6000);

        cy.window().invoke('getURL', 'fordevic', 'getDailyRecord').then((url)=>{
            cy.request(url).then((res)=>{
            console.log("daily",res.body);
            expect(res.body.length).eq(2);
            if(res.body[1].decodeTime-temp!=6000 && res.body[1].decodeTime-temp !=9000&& res.body[1].decodeTime-temp!=12000)
            expect(res.body[1].decodeTime-temp).eq(6000)
            expect(res.body[1].oned).eq(res.body[0].pdf417).eq(2)
            expect(res.body[1].qr).eq(1)
            expect(res.body[1].dm).eq(2)
            expect(res.body[1].mc).eq(1)
            expect(res.body[1].other).eq(5)
            expect(res.body[1].allBarcode).eq(9)
            })
        })
    })
})

describe('full wasm - test with video - 2D.y4m', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', true, "coverage");
        cy.window().its('scanner').should('exist');
        cy.window().its('scanner').as('scanner');
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close");
    })
    
    Array(33554432/*BF_PDF417 */,67108864/*BF_QR_CODE */,134217728/*BF_DATAMATRIX */,524288/*BF_MICRO_PDF417*/,268435456/*BF_AZTEC */,536870912/*BF_MAXICODE */,
        1073741824/*BF_MICRO_QR */,-2147483648/*BF_GS1_COMPOSITE */,262144/*BF_PATCHCODE*/).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('scanner').invoke('open');
            //cy.wait(3000)
            cy.window().its('storedResults').should('have.length',1)            
        })
    }) 

    it('default settings', function () {
        cy.window().invoke('updateBarcodeFormat', [0,0]);
        cy.window().its('scanner').invoke('open');
        //cy.wait(3000)
        cy.window().its('storedResults').should('have.length',10)
        cy.window().its('storedResults').should('contain','AZTEC_Dynamsoft')
        cy.window().its('storedResults').should('contain','Micro PDF417_This is a MicroPDF417 by TEC-IT')
        cy.window().its('storedResults').should('contain','Maxicode_Maxicode from Dynamsoft')
        cy.window().its('storedResults').should('contain','GS1 Composite Code_12345678901231|2D-data')
        cy.window().its('storedResults').should('contain','DATAMATRIX_070032')
        cy.window().its('storedResults').should('contain','PDF417_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','Micro QR_ABC-abc-1234')
        cy.window().its('storedResults').should('contain','QR_CODE_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','DATAMATRIX_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','PatchCode_Patch 2')
    })
})


describe('compact wasm - test with video - 2D.y4m', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false, "coverage");
        cy.window().its('scanner').should('exist');
        cy.window().its('scanner').as('scanner');
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close");
        cy.window().its('scanner').invoke('clearMapDecodeRecord');
    })

    
    it('default settings', function () {
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',3)
        cy.window().its('storedResults').should('contain','PDF417_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','QR_CODE_www.dynamsoft.com')
        cy.window().its('storedResults').should('contain','DATAMATRIX_www.dynamsoft.com')
    })
  
    Array(33554432/*BF_PDF417 */,67108864/*BF_QR_CODE */,134217728/*BF_DATAMATRIX */,524288/*BF_MICRO_PDF417*/,268435456/*BF_AZTEC */,536870912/*BF_MAXICODE */,
        1073741824/*BF_MICRO_QR */,-2147483648/*BF_GS1_COMPOSITE */,262144/*BF_PATCHCODE*/).forEach((key)=>{
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            if (key != 134217728 && key != 67108864 && key != 33554432)
                cy.window().its('errormessage').should("eq", "Some of the specified barcode formats are not supported in the compact version. Please try the full-featured version.")
            else
                cy.window().its('errormessage').should("eq", "")
            cy.window().its('scanner').invoke('open');
            if (key == 134217728 || key == 67108864 || key == 33554432)
                cy.window().its('storedResults').should('have.length',1)
            else
                cy.window().its('storedResults').should('have.length',0)
        
        })
    })

    
})