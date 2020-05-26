
describe("decode different image types", ()=>{
    before(()=>{
        cy.visit('/dauto.html')
        cy.window().invoke('initializeDBR', true);
        cy.window().its('reader').should('exist');
        cy.window().invoke('updateBarcodeFormat',[0,0])
    })
    beforeEach(()=>{
        cy.window().invoke('clearEnv')
    })
    
    
    Cypress.env('fileList').forEach(filepath => {
        it('decode_'+filepath,()=>{
            var suffix = filepath.substr(filepath.lastIndexOf('.')).toLowerCase();
            cy.window().invoke({"timeout":20000},'decodefile', filepath)
            //cy.wait(10000)
            if(suffix==".tif"|| suffix==".tiff"||suffix==".pdf"){
                cy.window().its("errormessage").should('eq',"Can't convert blob to image : error")
                cy.window().its('storedResults').should('have.length',0)
            }else{
                cy.window().its("errormessage").should('eq',"")
                cy.window().its('storedResults').should('have.length',1)
            }
        })
    })

    it("catch error when file is unavailble", ()=>{
        cy.window().invoke('decodefile', "notexist.png")
        cy.window().its("errormessage").should('eq',"Can't convert blob to image : error")
        cy.window().its('storedResults').should('have.length',0)
    })
    
    it("decode base64String", ()=>{
        cy.window().invoke('decodefile', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAyAQMAAADP6mO0AAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVQ4jWP4jxV8YGhgwAYEhoF4Jres9OLSjnNzd1umvJmbvEzN6sCo+CAWp086STvY/Pj8eWa2M2jiOQebzRJutvPdQBOvAIozzuyX+4AmXnCw2fxg42yzB5jiZsnsxmno4iBzknns69DNAdmbJsHMhm5v2t/fj4/JN2O4k1T/DnZxHOUSACkMCYTXK6K7AAAAAElFTkSuQmCC")
        cy.window().its('storedResults').should('have.length',1)
    })

    it("decode base64String 2", ()=>{
        cy.window().invoke('decodefile', "iVBORw0KGgoAAAANSUhEUgAAALQAAAAyAQMAAADP6mO0AAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVQ4jWP4jxV8YGhgwAYEhoF4Jres9OLSjnNzd1umvJmbvEzN6sCo+CAWp086STvY/Pj8eWa2M2jiOQebzRJutvPdQBOvAIozzuyX+4AmXnCw2fxg42yzB5jiZsnsxmno4iBzknns69DNAdmbJsHMhm5v2t/fj4/JN2O4k1T/DnZxHOUSACkMCYTXK6K7AAAAAElFTkSuQmCC")
        cy.window().its("errormessage").should('eq',"Can't convert blob to image : error")
        cy.window().its('storedResults').should('have.length',0)
    })

    it("decodeBase64String", ()=>{
        cy.window().its('reader').invoke('decodeBase64String',"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAyAQMAAADP6mO0AAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVQ4jWP4jxV8YGhgwAYEhoF4Jres9OLSjnNzd1umvJmbvEzN6sCo+CAWp086STvY/Pj8eWa2M2jiOQebzRJutvPdQBOvAIozzuyX+4AmXnCw2fxg42yzB5jiZsnsxmno4iBzknns69DNAdmbJsHMhm5v2t/fj4/JN2O4k1T/DnZxHOUSACkMCYTXK6K7AAAAAElFTkSuQmCC")
        .then(res=>{
            expect(res.length).to.be.eq(1)
        })

        cy.window().its('reader').invoke('decodeBase64String',"iVBORw0KGgoAAAANSUhEUgAAALQAAAAyAQMAAADP6mO0AAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAh0lEQVQ4jWP4jxV8YGhgwAYEhoF4Jres9OLSjnNzd1umvJmbvEzN6sCo+CAWp086STvY/Pj8eWa2M2jiOQebzRJutvPdQBOvAIozzuyX+4AmXnCw2fxg42yzB5jiZsnsxmno4iBzknns69DNAdmbJsHMhm5v2t/fj4/JN2O4k1T/DnZxHOUSACkMCYTXK6K7AAAAAElFTkSuQmCC")
        .then(res=>{
            expect(res.length).to.be.eq(1)
        })
    })

    it("decode url", ()=>{
        cy.window().its('reader').invoke('decodeUrl',Cypress.config().baseUrl+"cypress/fixtures/AllSupportedBarcodeTypes.png").then(res=>{
            expect(res.length).to.gt(0)
        })
    })
    
    it("decode HtmlImageElement",()=>{
        cy.window().then((win)=>{
            var img1 = new Image(); 
            img1.src = "cypress/fixtures/bitdepth/1depth_code93.bmp";
            img1.alt = 'alt';
            win.document.body.appendChild(img1);
            win.reader._decode_Image(win.document.images[0]).then(res=>{
                console.log(res)
                expect(res.length).to.gt(0)
            })
            win.reader.decode(img1).catch(err=>{
                expect(err.message).to.be.eq('\'_decode(source, config)\': Type of \'source\' should be \'Blob\', \'ArrayBuffer\', \'Uint8Array\', \'HTMLImageElement\', \'HTMLCanvasElement\', \'HTMLVideoElement\', \'String(base64 with image mime)\' or \'String(url)\'.')
            })

        })
        
    })

    it("decode ImageBitmap",()=>{
        cy.window().then(win=>{
            var img1 = new Image(); 
            img1.src = "cypress/fixtures/bitdepth/1depth_code93.bmp";
            cy.wrap(win.document.body.appendChild(img1));
            var imagebitmap=win.createImageBitmap(win.document.images[0])
            win.reader._decode_Image(imagebitmap).then(res=>{
                console.log(res)
                expect(res.length).to.gt(0)
            })
        })
    })
})