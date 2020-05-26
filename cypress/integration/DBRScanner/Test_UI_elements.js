describe('test - UI - stillallbarcodetypesimage.y4m', function () {
    beforeEach(function () {
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR');
        cy.window().its('scanner').should('exist');
        cy.window().its('scanner').as('scanner');
        
    })

    afterEach(function () {
        cy.window().its('scanner').invoke("close");
        cy.window().its('scanner').invoke("destroy");
    })

    it('modify barcode and region styles', function () {
        cy.window().its('scanner').invoke("open");
        this.scanner.barcodeFillStyle = "rgba(255,0,255,0.5)";
        this.scanner.barcodeLineWidth = 10;
        this.scanner.barcodeStrokeStyle = "rgba(0,255,255,0.9)";

        this.scanner.regionMaskFillStyle = "rgba(0,0,255,0.6)";
        this.scanner.regionMaskLineWidth = 5;
        this.scanner.regionMaskStrokeStyle = "rgba(0,255,0,0.9)";
        cy.wait(2000);
        cy.window().its('storedResults').should('have.length.greaterThan',0)
        cy.matchImageSnapshot('barcode-region-styling');
        
    })
    it('region settings styles', function () {
        cy.window().its('scanner').invoke("open");
        cy.window().its('scanner').invoke('getRuntimeSettings').then((settings)=>{
            settings.region.regionLeft = 20;
            settings.region.regionTop = 20;
            settings.region.regionRight = 80;
            settings.region.regionBottom = 80;
            settings.region.regionMeasuredByPercentage=1;
            cy.window().invoke("updateSettings", settings)
            cy.wait(2000);
            cy.matchImageSnapshot('default-region-styling');
        })
    })

    it("default singleFramemode style", function(){
        this.scanner.singleFrameMode = true;
        cy.window().its('scanner').invoke("open");
        expect('.dbrScanner-cvs-scanarea').to.exist;
        cy.get('.dbrScanner-sel-camera').should('be.empty')
        cy.get('.dbrScanner-cvs-scanarea').should('have.attr', 'title', 'Take a photo');
        cy.wait(1000);
        cy.matchImageSnapshot('singleFramemode-styling');  
    })
    it('defaultUIElementURL', function () {       
        cy.window().then(function (win) {// take effect in createInstance
            win.Dynamsoft.BarcodeScanner.defaultUIElementURL = 'https://localhost:4444/cyp-hello/dbr.scanner2.html'            
            expect(win.Dynamsoft.BarcodeScanner.defaultUIElementURL).to.equal('https://localhost:4444/cyp-hello/dbr.scanner2.html')
            cy.wrap(win.initializeDBR());
            cy.window().its('scanner').invoke("open");
            cy.window().its('storedResults').should('have.length.greaterThan',0)
            cy.matchImageSnapshot('defaultUIElementURL');
        })
    })

    it("defaultUIElementURL singleFramemode style", function(){
        cy.window().then(function (win) {// take effect in createInstance
            win.Dynamsoft.BarcodeScanner.defaultUIElementURL = 'https://localhost:4444/cyp-hello/dbr.scanner2.html'            
            expect(win.Dynamsoft.BarcodeScanner.defaultUIElementURL).to.equal('https://localhost:4444/cyp-hello/dbr.scanner2.html')
            cy.wrap(win.initializeDBR())
        })
        cy.window().then((win)=>{
            win.scanner.singleFrameMode = true;
            cy.wrap(win.scanner.open())
            cy.matchImageSnapshot('defaultUIElementURL_singleFrameMode');
        })         
    })
       
    it('set UI element url',()=>{// don't need recreateInstance
        cy.window().then(function (win) {
            cy.wrap(win.scanner.setUIElement('https://localhost:4444/cyp-hello/dbr.scanner2.html'))
        })
        cy.window().its('scanner').invoke('open')
        cy.matchImageSnapshot('setUIelement_url');
    })

    it('get and set UI element', function () { // change UI in video
        cy.visit(Cypress.config().baseUrl + 'defaults-testpage.html');
        cy.window().invoke('initializeDBR');
        cy.window().its("scanner").invoke('open');
        cy.window().then(function (win) {
            expect(win.scanner.getUIElement()).to.not.have.id('test-video-container')
            cy.wrap(win.scanner.setUIElement(win.document.getElementById('test-video-container'))).then(function () {
                expect(win.scanner.getUIElement()).to.have.id('test-video-container')
            })
        })
    })


    
})