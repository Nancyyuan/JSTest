
describe("License Tracking server - by barcode - OneD", function(){
    before(()=>{
        cy.request("http://localhost:5000")//?runtimeKeys=forscans&admin=true
        .then((response)=>{
            expect(response.status).to.eq(200);  
            cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
                expect(res.body).eq(true);
            })          
        })
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsLicenseInfo")
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsforscansunsV2")
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.reload(true);
    })

    // after(()=>{
    //     cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
    //         expect(res.body).eq(true);
    //     })
    // })


    it("verification over limit",()=>{
        cy.request("POST", "http://localhost:5000/api/command/updateLicense", 
            "{ \"runtimeKeys\": \"forscans\", \
                \"productKeys\": \"\", \
                \"expireTime\":\"20210511\", \
                \"timeZone\":0, \
                \"consumeType\" : \"barcode\",\
                \"deviceDuration\":-1,\
                \"barcodeLimit\":2,\
                \"deviceLimit\":0,\
                \"sessionLimit\":0, \
                \"barcodeUsed\":3,\
                \"deviceUsed\":0, \
                \"maxSession\":0 \
                }")
        cy.visit('/forscans.html')
        cy.window().invoke('initializeDBR', false);
        cy.window().its('errormessage').should('eq',"Error: License is over limit.")
    })
    
    it("verification ok and record logic",()=>{   
        var temp=0;     
        cy.request("POST", "http://localhost:5000/api/command/updateLicense", 
            "{ \"runtimeKeys\": \"forscans\", \
                \"productKeys\": \"\", \
                \"expireTime\":\"20200511\", \
                \"timeZone\":0, \
                \"consumeType\" : \"barcode\",\
                \"deviceDuration\":-1,\
                \"barcodeLimit\":2,\
                \"deviceLimit\":0,\
                \"sessionLimit\":0, \
                \"barcodeUsed\":2,\
                \"deviceUsed\":0, \
                \"maxSession\":0 \
                }")
    
        cy.visit('/forscans.html')
        cy.window().invoke('initializeDBR', true,"coverage");        
        cy.window().its('errormessage').should('eq',"");
        cy.window().invoke('updateBarcodeFormat', [4,0]);
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',1)
        cy.wait(4000);
        cy.window().invoke('getURL', 'forscans', 'getReqCount').then((url)=>{
            cy.request(url).then((res)=>{
                expect(res.body).eq('{"succGetReq":1,"failGetReq":1,"postReq":1}')})
        })
        cy.window().invoke('getURL', 'forscans', 'getDailyRecord').then((url)=>{
            cy.request(url).then((res)=>{
                console.log("daily",res.body);
                expect(res.body.length).eq(1);
                expect(res.body[0].decodeTime).to.be.gt(0);
                temp=res.body[0].decodeTime;
                expect(res.body[0].device).contain("-Windows-Chrome");
                expect(res.body[0].acceptTime).be.gt(0);
                expect(res.body[0].allBarcode).eq(res.body[0].oned).gt(0);
                expect(res.body[0].qr).eq(res.body[0].pdf417).eq(res.body[0].dm).eq(res.body[0].mc).eq(res.body[0].other).eq(0);
            })
        })
        cy.window().invoke('clearEnv')
        cy.window().invoke('updateBarcodeFormat', [0,0]);
        cy.window().its('storedResults').should('have.length',9)
        cy.wait(6000);

        cy.window().invoke('getURL', 'forscans', 'getDailyRecord').then((url)=>{
            cy.request(url).then((res)=>{
            console.log("daily",res.body);
            expect(res.body.length).eq(2);
            if(res.body[1].decodeTime-temp!=6000 && res.body[1].decodeTime-temp !=9000&& res.body[1].decodeTime-temp!=12000)
                expect(res.body[1].decodeTime-temp).eq(6000)
            expect(res.body[1].allBarcode).eq(res.body[1].oned).eq(9);
            expect(res.body[1].qr).eq(res.body[1].pdf417).eq(res.body[1].dm).eq(res.body[1].mc).eq(res.body[1].other).eq(0);
            })
        })
    })
})

describe('full wasm - test with video - OneD.y4m', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', true,"coverage");
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
  
    Array(1/*BF_CODE_39*/,2/*BF_CODE_128*/,4/*BF_CODE_93*/,8/*BF_CODABAR*/,16/*BF_ITF*/,32/*BF_EAN_13 */,64/*BF_EAN_8 */,128/*BF_UPC_A */,256/*BF_UPC_E*/,
        512/*BF_INDUSTRIAL_25 */,1024/*BF_CODE_39_EXTENDED */,2047/*BF_ONED */).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('scanner').invoke('open');
            if(key == 2047){
                cy.window().its('storedResults').should('have.length',10)
            }else if(key==32 || key ==128){
                cy.window().its('storedResults').should('have.length',2)
            }
            else{
                cy.window().its('storedResults').should('have.length',1)
            }
        })
    })

    it('bSaveOriCanvas', ()=>{
        cy.window().its('scanner').its('bSaveOriCanvas').should('be',false)
        cy.window().its('scanner').then((obj)=>{expect(obj.oriCanvas).to.be.null})
        cy.window().its('scanner').then((obj)=>{obj.bSaveOriCanvas= true})
        cy.window().its('scanner').its('bSaveOriCanvas').should('be',true)
        cy.window().its('scanner').invoke('open');
        cy.window().its('scanner').then((obj)=>{
            expect(obj.oriCanvas).not.to.be.null
            expect(obj.oriCanvas.width).to.eql(1280)
            expect(obj.oriCanvas.height).to.eql(720)
        }) 
    })  
    
})


describe('compact wasm- coverage - test with video - OneD.y4m', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false, "coverage");
        cy.window().its('scanner').should('exist');      
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close");
        cy.window().its('scanner').invoke('clearMapDecodeRecord');
    })
    it('OneD results check', function () {
        cy.window().its('scanner').invoke('open');
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
  
    Array(1/*BF_CODE_39*/,2/*BF_CODE_128*/,4/*BF_CODE_93*/,8/*BF_CODABAR*/,16/*BF_CODABAR*/,32/*BF_EAN_13 */,64/*BF_EAN_8 */,128/*BF_UPC_A */,256/*BF_UPC_E*/,
        512/*BF_INDUSTRIAL_25 */,1024/*BF_CODE_39_EXTENDED */,2047/*BF_ONED */).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('scanner').invoke('open');
            if(key == 2047){
                cy.window().its('storedResults').should('have.length',10)
            }else if(key == 32 || key ==128){
                cy.window().its('storedResults').should('have.length',2)
            }
            else{
                cy.window().its('storedResults').should('have.length',1)
            }
        })
    })

    
})

describe('compact wasm -balance- test with video - OneD.y4m', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false, "balance");
        cy.window().its('scanner').should('exist');      
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close");
    })
    Array(1/*BF_CODE_39*/,2/*BF_CODE_128*/,4/*BF_CODE_93*/,8/*BF_CODABAR*/,16/*BF_CODABAR*/,32/*BF_EAN_13 */,64/*BF_EAN_8 */,128/*BF_UPC_A */,256/*BF_UPC_E*/,
        512/*BF_INDUSTRIAL_25 */,1024/*BF_CODE_39_EXTENDED */,2047/*BF_ONED */).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('scanner').invoke('open');
            if(key == 2047){
                cy.window().its('storedResults').should('have.length',10)
            }else if(key == 32 ){
                cy.window().its('storedResults').should('have.length',2)
            }
            else{
                cy.window().its('storedResults').should('have.length',1)
            }
        })
    })
})

describe('compact wasm -speed- test with video - OneD.y4m', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false, "speed");
        cy.window().its('scanner').should('exist');      
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close");
    })
    Array(1/*BF_CODE_39*/,2/*BF_CODE_128*/,4/*BF_CODE_93*/,8/*BF_CODABAR*/,16/*BF_CODABAR*/,32/*BF_EAN_13 */,64/*BF_EAN_8 */,128/*BF_UPC_A */,256/*BF_UPC_E*/,
        512/*BF_INDUSTRIAL_25 */,1024/*BF_CODE_39_EXTENDED */,2047/*BF_ONED */).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('scanner').invoke('open');
            if(key == 2047){
                cy.window().its('storedResults').should('have.length',10)
            }
            else{
                cy.window().its('storedResults').should('have.length',1)
            }
        })
    })
})




