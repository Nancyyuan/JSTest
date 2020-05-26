describe('Check some performance metrics', () => {
    it('check page load time', () => {
      cy.visit('/dauto.html', {
        onBeforeLoad: (win) => {
          win.performance.mark('start-loading')
        },
        onLoad: (win) => {
          win.performance.mark('end-loading')
        },
      }).its('performance').then((p) => {
        p.measure('pageLoad', 'start-loading', 'end-loading')
        const measure = p.getEntriesByName('pageLoad')[0]
  
        assert.isAtMost(measure.duration, 2000)
      })
    })

    it('load compact wasm speed', ()=>{
        cy.visit('/dauto.html')
        cy.window().then(win=>{
            let startTime = win.Date.now();
            cy.wrap(win.Dynamsoft.BarcodeReader.createInstance()).then(()=>{
                const measure = win.Date.now()-startTime
                assert.isAtMost(measure, 1000)
            })           
        })
    })

    it('load full wasm speed', ()=>{
        cy.visit('/dauto.html')
        cy.window().then(win=>{
            win.Dynamsoft.BarcodeReader._bUseFullFeature =true
            let startTime = win.Date.now();
            cy.wrap(win.Dynamsoft.BarcodeReader.createInstance()).then(()=>{
                const measure = win.Date.now()-startTime
                assert.isAtMost(measure, 1000)
            })
        })
    })
})