describe('js scansettings - barelymoving.y4m', function () {
    beforeEach(function () {        
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false);
        cy.window().its('scanner').should('exist');
        cy.window().its('scanner').as('scanner');
    })

    afterEach(function () {
        cy.window().invoke('clearEnv')
        cy.window().its('scanner').invoke('close')
       // cy.reload(true)
    })

    it('intervalTime_duplicateForgetTime_hold', function () {
        cy.window().its('scanner').invoke('getScanSettings').then( (settings) =>{
            expect(settings.intervalTime).eq(100)
            expect(settings.intervalTime).eq(100)
            settings.intervalTime = 1000;
            settings.duplicateForgetTime = 1000;
            cy.window().its('scanner').invoke('updateScanSettings', settings)
            cy.window().its('scanner').invoke('getScanSettings').then( (settings) =>{
                expect(settings).to.be.an('object');
                expect(settings.intervalTime).to.equal(1000)
                expect(settings.duplicateForgetTime).to.equal(1000)
            })
        })
        cy.window().its('scanner').invoke('open')
        cy.wait(3000)
        cy.window().its('storeFrameResults').should('have.length',6)
        cy.window().its('storedResults').should('have.length',2)
        
    })

    it('intervalTime_outForgetTime_changebarcode', function () {
        cy.window().its('scanner').invoke('getScanSettings').then( (settings) =>{
            settings.intervalTime = 500;
            settings.duplicateForgetTime = 3000;
            cy.window().its('scanner').invoke('updateScanSettings', settings)            
        })
        cy.window().invoke('updateBarcodeFormat', [67108864,0])
        cy.window().its('scanner').invoke('open')
        cy.wait(500)
        cy.window().invoke('updateBarcodeFormat', [64,0])
        cy.wait(3500)
        cy.window().invoke('updateBarcodeFormat', [67108864,0])
        cy.wait(500)

        cy.window().its('storeFrameResults').should('have.length.gt',7)
        cy.window().its('storedResults').should('have.length',3)
    })

    it('intervalTime_inForgetTime_changebarcode', function () {
        cy.window().its('scanner').invoke('getScanSettings').then( (settings) =>{
            settings.intervalTime = 500;
            settings.duplicateForgetTime = 3000;
            cy.window().its('scanner').invoke('updateScanSettings', settings)            
        })
        cy.window().invoke('updateBarcodeFormat', [67108864,0])
        cy.window().its('scanner').invoke('open')
        cy.wait(500)
        cy.window().invoke('updateBarcodeFormat', [64,0])
        cy.wait(1000)
        cy.window().invoke('updateBarcodeFormat', [67108864,0])
        cy.wait(500)
        cy.window().its('storedResults').should('have.length',2)
    })

    it('onPlayed', function () {
        this.scanner.open();
        this.scanner.onPlayed = function (rsl) {
            return rsl;
        }
        cy.wrap(this.scanner.pause());
        cy.wrap(this.scanner.play()).then(function (rsl) {
            expect(rsl).to.deep.equal({ width: 1280, height: 720 });
        })
    })

    it('bSaveOriCanvas', ()=>{        
        cy.window().its('scanner').its('bSaveOriCanvas').should('be',false)
        cy.window().its('scanner').then((obj)=>{expect(obj.oriCanvas).to.be.null})
        cy.window().its('scanner').then((obj)=>{obj.bSaveOriCanvas= true})
        cy.window().its('scanner').its('bSaveOriCanvas').should('be',true)
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length.gt',0)
        cy.window().its('scanner').then((obj)=>{
            expect(obj.oriCanvas).not.to.be.null
            expect(obj.oriCanvas.width).to.eql(1280)
            expect(obj.oriCanvas.height).to.eql(720)
        }) 
    })  
})