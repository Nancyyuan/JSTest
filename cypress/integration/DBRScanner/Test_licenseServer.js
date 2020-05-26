
describe("license statistic", function(){
    before(()=>{
        cy.request("http://localhost:5000")//?runtimeKeys=barcode0&admin=true
        .then((response)=>{
            expect(response.status).to.eq(200);  
            cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
                expect(res.body).eq(true);
            })         
        })
    })

    after(function () {
        cy.request("POST", "http://localhost:5000/api/db/ClearDbs").then((res)=>{
            expect(res.body).eq(true);
        })
    })
    it("license expired not send request",()=>{        
        cy.visit(Cypress.config().baseUrl +'expired.html')
        cy.window().invoke('initializeDBR', false);
        cy.window().invoke('updateBarcodeFormat',[4,0])
        cy.window().its('scanner').invoke('open');
        cy.window().its('storedResults').should('have.length',1)
        
        cy.window().its('storedResults').each((res)=>{
            console.log(res)
        })
        .should('contain','CODE_93_COD***. 1D barcode trial license expired, please contact support@dynamsoft.com to get a valid trial license.')
        cy.wait(5000);
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

    it("different domain no decode or send request",()=>{
        
        cy.visit(Cypress.config().baseUrl +'differentdomain.html')
        cy.window().invoke('initializeDBR', false);        
        cy.window().invoke('updateBarcodeFormat',[4,0])
        cy.window().its('scanner').invoke('open');
        
        cy.window().its('storedResults').should('have.length',1)
        cy.window().its('storedResults').should('contain','CODE_93_COD***The domain of your current site does not match the domain bound in the current license, please contact the site administrator or support@dynamsoft.com.')
        cy.window().its('resultexception').should('contain', -10039)
        cy.wait(5000);
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
})
