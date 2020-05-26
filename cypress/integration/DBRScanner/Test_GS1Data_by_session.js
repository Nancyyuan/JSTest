
//http://localhost:5000/api/verification/forsessi/getLicense
describe('Lisence Tracking server - by session - GS1DATA', ()=>{ // server 有bug
    before(()=>{
        cy.request("http://localhost:5000")//?runtimeKeys=forscans&admin=true
        .then((response)=>{
            expect(response.status).to.eq(200);  
            cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
                expect(res.body).eq(true);
            })          
        })
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsLicenseInfo")
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsforsessiunsV2")
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
    })

    after(()=>{
        cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
            expect(res.body).eq(true);
        })
    })
    it("session to occupy oneUUID",()=>{
        cy.request("POST", "http://localhost:5000/api/command/updateLicense", 
            "{ \"runtimeKeys\": \"forsessi\", \
                \"productKeys\": \"\", \
                \"expireTime\":\"20210511\", \
                \"timeZone\":0, \
                \"consumeType\" : \"session\",\
                \"deviceDuration\":-1,\
                \"barcodeLimit\":0,\
                \"deviceLimit\":0,\
                \"sessionLimit\":1, \
                \"barcodeUsed\":0,\
                \"deviceUsed\":0, \
                \"maxSession\":0 \
                }")
        
        cy.visit(Cypress.config().baseUrl + 'forconcurrent.html')
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsLicenseInfo")
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsforsessiunsV2")
        cy.window().invoke('initializeDBR', true, "coverage");    
        cy.window().invoke('updateBarcodeFormat', [0,0]);
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',7)
        cy.wait(4000);
        cy.window().invoke('getURL', 'forsessi', 'getDailyRecord').then((url)=>{
            cy.request(url).then((res)=>{
                console.log("daily",res.body);
                expect(res.body.length).eq(1);
                expect(res.body[0].allBarcode).eq(res.body[0].other).eq(7);
                expect(res.body[0].qr).eq(res.body[0].pdf417).eq(res.body[0].dm).eq(res.body[0].mc).eq(res.body[0].oned).eq(0);
            })
        })
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsLicenseInfo")
        cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsforsessiunsV2")
        cy.visit(Cypress.config().baseUrl + 'forconcurrent.html')
        cy.window().invoke('initializeDBR', true);        
        cy.window().invoke('updateBarcodeFormat',[260096,0]);
        cy.window().its('scanner').invoke('open');
        cy.window().its('errormessage').should('eq',"license is over limit.");
        
       

        // cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsLicenseInfo")
        // cy.window().its('indexedDB').invoke('deleteDatabase', "dbrjsforsessiunsV2")
        // cy.visit(Cypress.config().baseUrl + 'forconcurrent.html')
        // cy.window().invoke('initializeDBR', false);        
        // cy.window().invoke('updateBarcodeFormat', [2048,0]);
        // cy.window().its('scanner').invoke('open');
        // //cy.window().its('errormessage').should('eq',"dsfs");
        
        // cy.window().its('storedResults').should('have.length',1)
    })
})
describe('full wasm - GS1Data', function () {
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', true,"coverage");// "speed");
        cy.window().its('scanner').should('exist');
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke("close");
    })
    
    Array(2048/*BF_GS1_DATABAR_OMNIDIRECTIONAL*/,4096/*BF_GS1_DATABAR_TRUNCATED*/,
        8192/*BF_GS1_DATABAR_STACKED*/,131072/*BF_GS1_DATABAR_LIMITED*/,16384/*BF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL*/,
        32768/*BF_GS1_DATABAR_EXPANDED*/,65536/*BF_GS1_DATABAR_EXPANDED_STACKED*/, 260096/*BF_GS1_DATABAR*/).forEach((key)=>{
       
        it('BarcodeFormatIds_' + key, () => {  
            cy.window().invoke('updateBarcodeFormat', [key,0]);
            cy.window().its('scanner').invoke('open');
            if(key == 260096)
                cy.window().its('storedResults').should('have.length',7)
            else  
                cy.window().its('storedResults').should('have.length',1)            
        })
    }) 

    it('default settings', function () {
        cy.window().invoke('updateBarcodeFormat', [0,0]);
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',7)
        cy.window().its('storedResults').should('contain','GS1 Databar Omnidirectional_01234567890128')
        cy.window().its('storedResults').should('contain','GS1 Databar Limited_01234567890128')
        cy.window().its('storedResults').should('contain','GS1 Databar Stacked Omnidirectional_12345678901231')
        cy.window().its('storedResults').should('contain','GS1 Databar Truncated_24012345678905')
        cy.window().its('storedResults').should('contain','GS1 Databar ExpandedStacked_0112301239123924')
        cy.window().its('storedResults').should('contain','GS1 Databar Stacked_12345678901231')
        cy.window().its('storedResults').should('contain','GS1 Databar Expanded_0123-ABC')
    })
})


