describe('test defaults', function () {    
    beforeEach(()=>{
        cy.visit(Cypress.config().baseUrl + 'vide.html');
    })

    it('productKeys invalid',()=>{
        var err='';
        cy.window().then(function (win) {    
            win.Dynamsoft.BarcodeReader.productKeys = '';
        })
        cy.window().invoke('initializeDBR', true)
        cy.window().invoke('updateBarcodeFormat', [64,0]);
        cy.window().invoke('decodefile', "cypress/fixtures/OneD.png")
        cy.window().its('storedResults').should('contain','EAN_8_01234***. 1D barcode license invalid, please contact support@dynamsoft.com to get a valid trial license.')        
    })

    it('productKeys handshakecode',()=>{
        var err='';
        cy.window().then(function (win) {    
            win.Dynamsoft.BarcodeReader.productKeys = 'byscans';
        })
        cy.window().invoke('initializeDBR', true)
        cy.window().invoke('updateBarcodeFormat', [64,0]);
        cy.window().invoke('decodefile', "cypress/fixtures/OneD.png")
        cy.window().its('storedResults').should('contain','EAN_8_01234***. 1D barcode license invalid, please contact support@dynamsoft.com to get a valid trial license.')        
    })

    it('productKeys longkey is not wasm',()=>{
        var err='';
        cy.window().then(function (win) {    
            win.Dynamsoft.BarcodeReader.productKeys = 't0068MgAAAHX28MR/zIqDSh+TKjDlKZ5A9NW8k1kJti19+pq9+89uQAVbjINXvnbfFoP18DFGTptM1jzQqb5IS1NYR89390c=';
        })
        cy.window().invoke('initializeDBR', true)
        cy.window().invoke('updateBarcodeFormat', [64,0]);
        cy.window().invoke('decodefile', "cypress/fixtures/OneD.png")
        cy.window().its('storedResults').should('contain','EAN_8_01234***. 1D barcode license invalid, please contact support@dynamsoft.com to get a valid trial license.')        
    })

    it('productKeys longkey is expired',()=>{
        var err='';
        cy.window().then(function (win) {    
            win.Dynamsoft.BarcodeReader.productKeys = 't0068MgAAAJSrFwkVKVJ/b+tEHcDsXnBZ8u1jPOo9c0hoDdYr1Jk4oYdH6d3vRZR/4h+ANQR7/PK7ffZUA1Od2nYyAs92ZCM=';
        })
        cy.window().invoke('initializeDBR', true)
        cy.window().invoke('updateBarcodeFormat', [64,0]);
        cy.window().invoke('decodefile', "cypress/fixtures/OneD.png")
        cy.window().its('storedResults').should('contain','EAN_8_01234***. 1D barcode trial license expired, please contact support@dynamsoft.com to get a valid trial license.')        
    })

    it('productKeys longkey is ok',()=>{
        var err='';
        cy.window().then(function (win) {    
            win.Dynamsoft.BarcodeReader.productKeys = 't0068MgAAAH80dbk+6c+SETlCJWaqXRtMEWcKqkRyxLGj3ZH5iRWPRDTBN79OLOcPcxa8/Z+lb4eB42qRnfFpSSq24GF/T8o=';
        })
        cy.window().invoke('initializeDBR', true)
        cy.window().invoke('updateBarcodeFormat', [64,0]);
        cy.window().invoke('decodefile', "cypress/fixtures/OneD.png")
        cy.window().its('storedResults').should('contain','EAN_8_01234565')        
    })

    it("engineResourcePath end with /", ()=>{
    
        cy.window().then(function (win) {
            expect(win.Dynamsoft.BarcodeReader.engineResourcePath).to.eq("https://localhost:4444/cyp-hello/build/src/")           
            win.Dynamsoft.BarcodeReader.engineResourcePath = "https://notexist" ;
            expect(win.Dynamsoft.BarcodeReader.engineResourcePath).to.equal( "https://notexist/");
            // try{
            //     cy.wrap(win.Dynamsoft.BarcodeReader.createInstance())
            // }catch(ex){
            //     console.log(ex.message)
            // }

        })
    })

    it("licenseserver ends with /",()=>{
        cy.window().then(function (win) {
            expect(win.Dynamsoft.BarcodeReader.licenseServer).to.be.null
            win.Dynamsoft.BarcodeReader.licenseServer="http://localhost:5000"
            expect(win.Dynamsoft.BarcodeReader.licenseServer).to.equal( "http://localhost:5000/");
        })

    })
    
})
describe('test defaults', function () {    
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
    })

    it('detectEnvironment', function () {
        cy.window().then(function (win) {
            cy.wrap(win.Dynamsoft.BarcodeScanner.detectEnvironment())
            .should('be.an', 'object')
            .should('contain', {
                OS: "Windows",
                browser: "Chrome",
                camera: true,
                getUserMedia: true,
                version: 83,
                wasm: true,
                worker: true
            })
        })
    })  

    it('check version', function () {
        cy.window().then(function (win) {
            expect(win.Dynamsoft.BarcodeScanner.version).to.contain('JS 7.4.0')
        })
    })

    it('get and set engineResourcePath', function () {
        cy.window().then(function (win) {
            win.Dynamsoft.BarcodeScanner.engineResourcePath = Cypress.env('dbrjsurl') ;
            expect(win.Dynamsoft.BarcodeScanner.engineResourcePath).to.equal( Cypress.env('dbrjsurl'))

        })
    })

    it('isLoaded and loadWasm', function () {
        cy.window().its('Dynamsoft').its('BarcodeScanner').invoke('isLoaded').should('eq',false);
        cy.window().its('Dynamsoft').its('BarcodeScanner').invoke('loadWasm')
        cy.window().its('Dynamsoft').its('BarcodeScanner').invoke('isLoaded').should('eq',true);
    })

    it('error engineResourcePath set after loadWasm', function(){
        var err='';
        cy.window().then(function (win) {           
            try{
                win.Dynamsoft.BarcodeScanner.engineResourcePath =  Cypress.env('dbrjsurl');
            }catch(error){
                err= error.message;                
            }
            expect(err).equal("`engineResourcePath` is not allowed to change after loadWasm is called.");
        })
    })

    it('error defaultUIElementURL set after loadWasm', function(){
        var err='';
        cy.window().then(function (win) {
            try{
                win.Dynamsoft.BarcodeScanner.defaultUIElementURL = 'https://localhost:4444/cyp-hello/dbr.scanner2.html'
            }catch(error){
                err= error.message;    
                
            }
            expect(err).equal("`defaultUIElementURL` is not allowed to change after loadWasm is called.");
        })
    })

    it('error productKeys set after loadWasm', function(){
        var err=''
        cy.window().then(function (win) {
            try{
                win.Dynamsoft.BarcodeScanner.productKeys = 'f0068MgAAAHo362YrVRM0LGm41ZuFGOg9OJBTEoPUHgHHj4QIydOnxM0/Y4QHHc0rWE2Y6gy01t0wOeytAHGtZ/PwwGKiHbg=';
            }catch(error){
                err= error.message;                
            }
            expect(err).equal("`productKeys` is not allowed to change after loadWasm is called.");
        })
    })

    it('error licenseserver set after loadWasm', function(){
        var err=''
        cy.window().then(function (win) {
            try{
                win.Dynamsoft.BarcodeReader.licenseServer = "http://localhost:5000";
            }catch(error){
                err= error.message;                
            }
            expect(err).equal("`licenseServer` is not allowed to change after loadWasm is called.");
        })
    })
    it('error _bUseFullFeature set after loadWasm', function(){
        var err=''
        cy.window().then(function (win) {
            try{
                cy.wrap(win.Dynamsoft.BarcodeScanner._bUseFullFeature = true)
            }catch(error){
                err= error.message;               
            }
            expect(err).equal("`_bUseFullFeature` is not allowed to change after loadWasm is called.");
        })
    })  

    it('destroy', function(){
        cy.window().its('Dynamsoft').its('BarcodeScanner').invoke('createInstance').then((scanner)=>{
            var err;
            try{
                cy.wrap(scanner.decodeBuffer("./cypress/fixtures/AllSupportedBarcodeTypes.png"))
            }catch(error){
                err = error.message;               
            }
            expect(err).equal("")
            expect(scanner.bDestroyed).equal(false);
            cy.wrap(scanner.destroy())
            try{
                cy.wrap(scanner.decodeBuffer("./cypress/fixtures/AllSupportedBarcodeTypes.png"))
            }catch(error){
                err = error.message;                
            }
            expect(err).equal("scanner.decodebuffer is not a function")
            expect(scanner.bDestroyed).equal(true);
        })
    })
})



