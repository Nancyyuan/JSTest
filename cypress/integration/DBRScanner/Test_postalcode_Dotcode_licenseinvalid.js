
describe("LTS license invalid  and record", function(){
    before(()=>{
        cy.request("http://localhost:5000")//?runtimeKeys=barcode0&admin=true
        .then((response)=>{
            expect(response.status).to.eq(200);  
            cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
                expect(res.body).eq(true);
            })         
        })
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsLicenseInfo")
        
    })
    afterEach(function () {
        cy.window().invoke('clearEnv')
    })

    after(function () {
        cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
            expect(res.body).eq(true);
        })
    })
    it("license invalid not send request",()=>{        
        cy.visit(Cypress.config().baseUrl +'expired.html')
        cy.window().invoke('initializeDBR', true);
        cy.window().invoke('updateBarcodeFormat',[0,2])
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',1)
        
        cy.window().its('storedResults').should('contain','DotCode_This is a DotC***. DotCode barcode license invalid, please contact support@dynamsoft.com to get a valid trial license.')
        cy.wait(6000);
        cy.window().invoke('getURL', 'expired0', 'getReqCount').then((url)=>{
            cy.request(url).then((res)=>{
                expect(res.body).eq('{"succGetReq":1,"failGetReq":0,"postReq":0}')})
        })

        cy.window().invoke('getURL', 'expired0', 'getDailyRecord').then((url)=>{
            cy.request(url).then((res)=>{
                console.log("daily",res.body);
                expect(res.body.length).eq(0);
            })
        })

    })

    it("license expired not send request",()=>{        
        cy.visit(Cypress.config().baseUrl +'expired.html')
        cy.window().invoke('initializeDBR', true);
        cy.window().invoke('updateBarcodeFormat',[0,2097152])
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',1)
        
        cy.window().its('storedResults').should('contain','Postnet_123456789***. PostalCode barcode full license expired, please contact support@dynamsoft.com to renew your license.')
        cy.wait(6000);
        cy.window().invoke('getURL', 'expired0', 'getReqCount').then((url)=>{
            cy.request(url).then((res)=>{
                expect(res.body).eq('{"succGetReq":2,"failGetReq":0,"postReq":0}')})
        })

    })

    it("different domain no decode nor send request",()=>{
        
        cy.visit(Cypress.config().baseUrl +'differentdomain.html')
        cy.window().invoke('initializeDBR', true);        
        cy.window().invoke('updateBarcodeFormat',[0,2])
        cy.window().its('scanner').invoke('open');
        
        cy.window().its('storedResults').should('have.length',1)
        cy.window().its('storedResults').should('contain','DotCode_This is a DotC***The domain of your current site does not match the domain bound in the current license, please contact the site administrator or support@dynamsoft.com.')
        cy.window().its('resultexception').should('contain', -10039)
        cy.wait(6000);
        cy.window().invoke('getURL', 'domain00', 'getReqCount').then((url)=>{
            cy.request(url).then((res)=>{
                expect(res.body).eq('{"succGetReq":1,"failGetReq":0,"postReq":0}')})
        })
    })

    it("record in others",()=>{   
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
                \"barcodeUsed\":0,\
                \"deviceUsed\":0, \
                \"maxSession\":0 \
                }")
    
        cy.visit('/forscans.html')
        cy.window().invoke('initializeDBR', true);       
        cy.window().invoke('updateBarcodeFormat', [0,0]);
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',6)
        cy.wait(4000);
       
        cy.window().invoke('getURL', 'forscans', 'getDailyRecord').then((url)=>{
            cy.request(url).then((res)=>{
                console.log("daily",res.body);
                expect(res.body.length).eq(1);
                
                expect(res.body[0].allBarcode).eq(res.body[0].other).eq(6);
                expect(res.body[0].qr).eq(res.body[0].pdf417).eq(res.body[0].dm).eq(res.body[0].mc).eq(res.body[0].oned).eq(0);
            })
        })
    })
})
describe('full wasm - test with video - barcodeformat2.y4m', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', true);
        cy.window().its('scanner').should('exist');
        cy.window().its('scanner').as('scanner');
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close");
        cy.window().its('scanner').invoke('clearMapDecodeRecord');
    })

    Array(2/*BF2_DOTCODE*/,1048576/*BF2_USPSINTELLIGENTMAIL*/,2097152/*BF2_POSTNET*/,
        4194304/*BF2_PLANET*/,8388608/*BF2_AUSTRALIANPOST*/,16777216/*BF2_RM4SCC*/,32505856/*BF2_POSTALCODE*/).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [0, key]);
            cy.window().its('scanner').invoke('open');
            if(key == 32505856)
                cy.window().its('storedResults').should('have.length',5)
            else
                cy.window().its('storedResults').should('have.length',1)            
        })
    })

    it('default settings', function () {
        cy.window().invoke('updateBarcodeFormat', [0,0]);
        cy.window().its('errormessage').should("eq","")
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',6)
        cy.window().its('storedResults').should('contain','Planet_123456789014')
        cy.window().its('storedResults').should('contain','Australian Post_11,12345678,26 44 19 15')
        cy.window().its('storedResults').should('contain','Royal Mail 4-State Customer Barcode_1234567ABC')
        cy.window().its('storedResults').should('contain','USPS Intelligent Mail_44123123456123456789')
        cy.window().its('storedResults').should('contain','DotCode_This is a DotCode')
        cy.window().its('storedResults').should('contain','Postnet_123456789014')
    })
})

describe('compact wasm - barcodeformat2', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false);
        cy.window().its('scanner').should('exist');
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close")
    })
  
    Array(2/*BF2_DOTCODE*/,1048576/*BF2_USPSINTELLIGENTMAIL*/,2097152/*BF2_POSTNET*/,
        4194304/*BF2_PLANET*/,8388608/*BF2_AUSTRALIANPOST*/,16777216/*BF2_RM4SCC*/,32505856/*BF2_POSTALCODE*/).forEach((key)=>{       
        it('BarcodeFormatIds2_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [0,key]);
            cy.window().its('errormessage').should("eq", "Some of the specified barcode formats are not supported in the compact version. Please try the full-featured version.")
            cy.window().its('scanner').invoke('open');
            cy.wait(3000)
            cy.window().its('storedResults').should('have.length',0)            
        })
    }) 
})

