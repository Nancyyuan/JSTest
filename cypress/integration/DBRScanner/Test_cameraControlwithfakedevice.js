// .\node_modules\.bin\cypress open
// launchOptions.args.push('--use-fake-device-for-media-stream')

describe('test camera controls', function () {
    before(function () {
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false);
        cy.window().its('scanner').should('exist');
          
    })
    beforeEach(function () {
        cy.window().its('scanner').as('scanner');     
    })

    it('open camera', function () {
        cy.wrap(this.scanner.open()).then(function () {
            expect('.dbrScanner-cvs-scanarea').to.exist;
            expect(this.scanner.isOpen()).to.be.true;
        })
    })

    it('pause video scanning', function () {
        this.scanner.pauseScan();
        cy.get('.dbrScanner-scanlight').should('not.be.visible');
        // video stream is not paused if scanning is paused
    })

    it('resume video scanning', function () {
        this.scanner.resumeScan();
        cy.get('.dbrScanner-scanlight').should('be.visible');
    })

    it('pause video stream', function () {
        this.scanner.pause();
        cy.get('.dbrScanner-scanlight').should('not.be.visible');
        cy.get('video.dbrScanner-video').its('0.currentTime').should('be.lt', 10);
    })

    it('play video stream', function () {
        cy.wrap(this.scanner.play()).then(function (ret) {
            expect(ret).to.deep.equal({ width: 1280, height: 720 })
            cy.get('.dbrScanner-scanlight').should('be.visible');
        });
    })

    it('hide camera', function () {
        this.scanner.hide();
        cy.get('.dbrScanner-cvs-scanarea').should('not.be.visible');
        cy.get('div').last().should('not.be.visible')
    })

    it('show camera', function () {
        cy.wrap(this.scanner.show()).then(function () {
            cy.get('.dbrScanner-cvs-scanarea').should('be.visible');
            cy.get('.dbrScanner-scanlight').should('be.visible');
        });
    })

    it('stop camera', function () {
        this.scanner.stop();
        cy.get('.dbrScanner-scanlight').should('not.be.visible');
        cy.get('video.dbrScanner-video').its('0.currentTime').should('be.eql', 0);
    })

    it('close camera', function () {
        this.scanner.close();
        cy.get('.dbrScanner-bg-camera').should('not.be.visible');
        cy.get('.dbrScanner-scanlight').should('not.be.visible');
    })

    it('destroy camera instance', function () {
        this.scanner.destroy();
        cy.get('.dbrScanner-scanlight').should('not.be.visible');
        expect(this.scanner.bDestroyed).to.be.true
    })

})


describe(' test fake video', function () {
    before(function () {
        cy.reload(true);
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
        cy.window().invoke('initializeDBR', false);
        cy.window().its('scanner').should('exist'); 
    })
    beforeEach(()=>{
        cy.window().its('scanner').as('scanner');
    })


    it('get scan settings', function () {
        cy.wrap(this.scanner.getScanSettings()).then(function (settings) {
            expect(settings).to.be.an('object');
            expect(settings).to.have.property('duplicateForgetTime')
            expect(settings).to.have.property('intervalTime')
        })
    })

    it('update scan settings', function () {
        cy.wrap(this.scanner.getScanSettings()).then(function (settings) {
            settings.intervalTime = 50;
            settings.duplicateForgetTime = 1000;

            cy.wrap(this.scanner.updateScanSettings(settings)).then(function () {
                cy.wrap(this.scanner.getScanSettings()).then(function (settings) {
                    expect(settings).to.be.an('object');
                    expect(settings.intervalTime).to.equal(50)
                    expect(settings.duplicateForgetTime).to.equal(1000)
                })
            });
        })
    })

    it('get camera list', function () {
        cy.wrap(this.scanner.getAllCameras()).then(function (cameras) {
            expect(cameras).to.have.length.of.at.least(1);
        })
    })

    it('open camera', function () {
        cy.wrap(this.scanner.open()).then(function () {
            expect('.dbrScanner-cvs-scanarea').to.exist;
            expect(this.scanner.isOpen()).to.be.true;
        })
    })
    it('get resolution', function () {
        cy.window().its('scanner').invoke('open')//default the video is 1280*720
        cy.get('.dbrScanner-sel-resolution').its('0.textContent').should('eq',"got 1280x720ask 3840 x 2160ask 2560 x 1440ask 1920 x 1080ask 1600 x 1200ask 1280 x 720ask 800 x 600ask 640 x 480ask 640 x 360")
        cy.get('.dbrScanner-sel-resolution').its('0.type').should('eq','select-one')
        cy.get('.dbrScanner-sel-resolution').its('0.options.length').should('eq',9)
        cy.get('.dbrScanner-sel-resolution').its('0.options.length').should('eq',9)
        cy.get('.dbrScanner-sel-resolution').select("ask 800 x 600")
        cy.wait(1000)
        cy.window().its('scanner').invoke('getResolution').then(function (res) {
            cy.get('video.dbrScanner-video').its('0.videoWidth').should('be.eql', 800);
            cy.get('video.dbrScanner-video').its('0.videoHeight').should('be.eql', 600);
            expect(res).to.eql([800,600])
        });
    })
    
   
    Array([3840,2160], [2560,1440], [1920, 1080], [1600, 1200],[1280, 720], [800, 600],[640, 480], [640, 360]).forEach((key)=>{
        it('set resolution_'+key, function () {
            cy.window().its('scanner').invoke('open')
            cy.get('.dbrScanner-sel-resolution').select("ask "+key[0]+" x "+key[1])
            cy.wait(1000)
            cy.window().its('scanner').invoke('getResolution').then(function (res) {
                cy.get('video.dbrScanner-video').its('0.videoWidth').should('be.eql', key[0]);
                cy.get('video.dbrScanner-video').its('0.videoHeight').should('be.eql', key[1]);
                expect(res).to.eql(key)
            });
        })
    })

    

    it('get camera capabilities', function () {
        cy.wrap(this.scanner.getCapabilities()).then(function (capabilities) {
            expect(capabilities).to.have.property('deviceId');
        });
    })

    it('set camera by label', function () {
        cy.wrap(this.scanner.setCurrentCamera('fake_device_0')).then(function (camera) {
            expect(camera).to.be.an('object')
            expect(camera.width).to.eq(640);
            expect(camera.height).to.eq(480);
        })
        cy.get('.dbrScanner-sel-camera').should('contain', 'fake_device_0');
    })

    it('set camera by device ID', function () {
        cy.wrap(this.scanner.setCurrentCamera('30d023e9283c51036a559e58313b2e1c0f81941bb15cc9ad703f533a6bba1351')).should('be.an', 'object');
        cy.get('.dbrScanner-sel-camera').should('contain', 'fake_device_0');
    })

    it('get current camera', function () {
        cy.wrap(this.scanner.getCurrentCamera()).then(function (camera) {
            expect(camera).to.be.a('object');
            expect(camera.label).to.equal('fake_device_0');
        });
    })

    it('update video settings', function () {
        cy.wrap(this.scanner.updateVideoSettings({
            video: {
                width: {
                    ideal: 96
                },
                height: {
                    ideal: 96
                },
                pan: {
                    ideal: 400
                }
            }
        })).then(function () {
            cy.get('.dbrScanner-cvs-drawarea').should('have.attr', 'width', '96').should('have.attr', 'height', '96')
        });
    })

    it('get video settings', function () {
        cy.wrap(this.scanner.getVideoSettings()).then(function (settings) {
            expect(settings).to.deep.equal({
                video: {
                    width: {
                        ideal: 96
                    },
                    height: {
                        ideal: 96
                    },
                    pan: {
                        ideal: 400
                    }
                }
            })
        })
    })


    it('set colour temperature - unsupported', function () {
        const that = this;
        return new Cypress.Promise(function (resolve, reject) {
            that.scanner.setColorTemperature(5000).then(function () {
                reject();
            }).catch(function (err) {
                expect(err).to.be.an('error');
                resolve();
            })
        })
    })

    it('set exposure compensation - unsupported', function () {
        const that = this;
        return new Cypress.Promise(function (resolve, reject) {
            that.scanner.setExposureCompensation(-0.7).then(function () {
                reject();
            }).catch(function (err) {
                expect(err).to.be.an('error');
                resolve();
            })
        })
    })

    it('set frame rate - supported', function () {
        cy.wrap(this.scanner.setFrameRate(1)).should('be.undefined');
        cy.window().then(function (win) {
            cy.get(win.document.getElementsByClassName('dbrScanner-video')[0].captureStream().getVideoTracks()[0].getSettings()).its('0.frameRate').should('be.eql', 1)
        })
    })

    //TODO: incomplete test. Any zoom level will return undefined unless zoom functionality itself is unsupported.
    it('set zoom - supported', function () {
        cy.wrap(this.scanner.setZoom(400)).should('be.undefined');
    })

    it('turn torch on - unsupported', function () {
        const that = this;
        return new Cypress.Promise(function (resolve, reject) {
            that.scanner.turnOnTorch().then(function () {
                reject();
            }).catch(function (err) {
                expect(err).to.be.an('error');
                resolve();
            })
        })
    })

    it('turn torch off - unsupported', function () {
        const that = this;
        return new Cypress.Promise(function (resolve, reject) {
            that.scanner.turnOffTorch().then(function () {
                reject();
            }).catch(function (err) {
                expect(err).to.be.an('error');
                resolve();
            })
        })
    })

})




