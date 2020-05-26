describe('Enum check', ()=>{
    before(()=>{
        cy.visit(Cypress.config().baseUrl + 'dauto.html');
    })

    it("EnumBarcodeFormat", ()=> {
        var expectedvalue = "0\nBF_NULL\n1\nBF_CODE_39\n2\nBF_CODE_128\n4\nBF_CODE_93\n8\nBF_CODABAR\n16\nBF_ITF\n32\nBF_EAN_13\n64\nBF_EAN_8\n128\nBF_UPC_A\n256\nBF_UPC_E\n512\nBF_INDUSTRIAL_25\n1024\nBF_CODE_39_EXTENDED\n2047\nBF_ONED\n2048\nBF_GS1_DATABAR_OMNIDIRECTIONAL\n4096\nBF_GS1_DATABAR_TRUNCATED\n8192\nBF_GS1_DATABAR_STACKED\n16384\nBF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL\n32768\nBF_GS1_DATABAR_EXPANDED\n65536\nBF_GS1_DATABAR_EXPANDED_STACKED\n131072\nBF_GS1_DATABAR_LIMITED\n260096\nBF_GS1_DATABAR\n262144\nBF_PATCHCODE\n524288\nBF_MICRO_PDF417\n33554432\nBF_PDF417\n67108864\nBF_QR_CODE\n134217728\nBF_DATAMATRIX\n268435456\nBF_AZTEC\n536870912\nBF_MAXICODE\n1073741824\nBF_MICRO_QR\nBF_ALL\n-32505857\n-32505857\nBF_ALL\nBF_ONED\n2047\nBF_GS1_DATABAR\n260096\nBF_CODE_39\n1\nBF_CODE_128\n2\nBF_CODE_93\n4\nBF_CODABAR\n8\nBF_ITF\n16\nBF_EAN_13\n32\nBF_EAN_8\n64\nBF_UPC_A\n128\nBF_UPC_E\n256\nBF_INDUSTRIAL_25\n512\nBF_CODE_39_EXTENDED\n1024\nBF_GS1_DATABAR_OMNIDIRECTIONAL\n2048\nBF_GS1_DATABAR_TRUNCATED\n4096\nBF_GS1_DATABAR_STACKED\n8192\nBF_GS1_DATABAR_STACKED_OMNIDIRECTIONAL\n16384\nBF_GS1_DATABAR_EXPANDED\n32768\nBF_GS1_DATABAR_EXPANDED_STACKED\n65536\nBF_GS1_DATABAR_LIMITED\n131072\nBF_PATCHCODE\n262144\nBF_PDF417\n33554432\nBF_QR_CODE\n67108864\nBF_DATAMATRIX\n134217728\nBF_AZTEC\n268435456\nBF_MAXICODE\n536870912\nBF_MICRO_QR\n1073741824\nBF_MICRO_PDF417\n524288\nBF_GS1_COMPOSITE\n-2147483648\n-2147483648\nBF_GS1_COMPOSITE\nBF_NULL\n0"    
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumBarcodeFormat)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumConflictMode", ()=> {
        var expectedvalue ="1\nCM_IGNORE\n2\nCM_OVERWRITE\nCM_IGNORE\n1\nCM_OVERWRITE\n2";
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumConflictMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumErrorCode", ()=> {
         var expectedvalue ="0\nDBR_SUCCESS\n1\nDBR_SYSTEM_EXCEPTION\nDBR_SYSTEM_EXCEPTION\n1\nDBR_SUCCESS\n0\nDBR_UNKNOWN\n-10000\n-10000\nDBR_UNKNOWN\nDBR_NO_MEMORY\n-10001\n-10001\nDBR_NO_MEMORY\nDBR_NULL_REFERENCE\n-10002\n-10002\nDBR_NULL_REFERENCE\nDBR_LICENSE_INVALID\n-10003\n-10003\nDBR_LICENSE_INVALID\nDBR_LICENSE_EXPIRED\n-10004\n-10004\nDBR_LICENSE_EXPIRED\nDBR_FILE_NOT_FOUND\n-10005\n-10005\nDBR_FILE_NOT_FOUND\nDBR_FILETYPE_NOT_SUPPORTED\n-10006\n-10006\nDBR_FILETYPE_NOT_SUPPORTED\nDBR_BPP_NOT_SUPPORTED\n-10007\n-10007\nDBR_BPP_NOT_SUPPORTED\nDBR_INDEX_INVALID\n-10008\n-10008\nDBR_INDEX_INVALID\nDBR_BARCODE_FORMAT_INVALID\n-10009\n-10009\nDBR_BARCODE_FORMAT_INVALID\nDBR_CUSTOM_REGION_INVALID\n-10010\n-10010\nDBR_CUSTOM_REGION_INVALID\nDBR_MAX_BARCODE_NUMBER_INVALID\n-10011\n-10011\nDBR_MAX_BARCODE_NUMBER_INVALID\nDBR_IMAGE_READ_FAILED\n-10012\n-10012\nDBR_IMAGE_READ_FAILED\nDBR_TIFF_READ_FAILED\n-10013\n-10013\nDBR_TIFF_READ_FAILED\nDBR_QR_LICENSE_INVALID\n-10016\n-10016\nDBR_QR_LICENSE_INVALID\nDBR_1D_LICENSE_INVALID\n-10017\n-10017\nDBR_1D_LICENSE_INVALID\nDBR_DIB_BUFFER_INVALID\n-10018\n-10018\nDBR_DIB_BUFFER_INVALID\nDBR_PDF417_LICENSE_INVALID\n-10019\n-10019\nDBR_PDF417_LICENSE_INVALID\nDBR_DATAMATRIX_LICENSE_INVALID\n-10020\n-10020\nDBR_DATAMATRIX_LICENSE_INVALID\nDBR_PDF_READ_FAILED\n-10021\n-10021\nDBR_PDF_READ_FAILED\nDBR_PDF_DLL_MISSING\n-10022\n-10022\nDBR_PDF_DLL_MISSING\nDBR_PAGE_NUMBER_INVALID\n-10023\n-10023\nDBR_PAGE_NUMBER_INVALID\nDBR_CUSTOM_SIZE_INVALID\n-10024\n-10024\nDBR_CUSTOM_SIZE_INVALID\nDBR_CUSTOM_MODULESIZE_INVALID\n-10025\n-10025\nDBR_CUSTOM_MODULESIZE_INVALID\nDBR_RECOGNITION_TIMEOUT\n-10026\n-10026\nDBR_RECOGNITION_TIMEOUT\nDBR_JSON_PARSE_FAILED\n-10030\n-10030\nDBR_JSON_PARSE_FAILED\nDBR_JSON_TYPE_INVALID\n-10031\n-10031\nDBR_JSON_TYPE_INVALID\nDBR_JSON_KEY_INVALID\n-10032\n-10032\nDBR_JSON_KEY_INVALID\nDBR_JSON_VALUE_INVALID\n-10033\n-10033\nDBR_JSON_VALUE_INVALID\nDBR_JSON_NAME_KEY_MISSING\n-10034\n-10034\nDBR_JSON_NAME_KEY_MISSING\nDBR_JSON_NAME_VALUE_DUPLICATED\n-10035\n-10035\nDBR_JSON_NAME_VALUE_DUPLICATED\nDBR_TEMPLATE_NAME_INVALID\n-10036\n-10036\nDBR_TEMPLATE_NAME_INVALID\nDBR_JSON_NAME_REFERENCE_INVALID\n-10037\n-10037\nDBR_JSON_NAME_REFERENCE_INVALID\nDBR_PARAMETER_VALUE_INVALID\n-10038\n-10038\nDBR_PARAMETER_VALUE_INVALID\nDBR_DOMAIN_NOT_MATCHED\n-10039\n-10039\nDBR_DOMAIN_NOT_MATCHED\nDBR_RESERVEDINFO_NOT_MATCHED\n-10040\n-10040\nDBR_RESERVEDINFO_NOT_MATCHED\nDBR_AZTEC_LICENSE_INVALID\n-10041\n-10041\nDBR_AZTEC_LICENSE_INVALID\nDBR_LICENSE_DLL_MISSING\n-10042\n-10042\nDBR_LICENSE_DLL_MISSING\nDBR_LICENSEKEY_NOT_MATCHED\n-10043\n-10043\nDBR_LICENSEKEY_NOT_MATCHED\nDBR_REQUESTED_FAILED\n-10044\n-10044\nDBR_REQUESTED_FAILED\nDBR_LICENSE_INIT_FAILED\n-10045\n-10045\nDBR_LICENSE_INIT_FAILED\nDBR_PATCHCODE_LICENSE_INVALID\n-10046\n-10046\nDBR_PATCHCODE_LICENSE_INVALID\nDBR_POSTALCODE_LICENSE_INVALID\n-10047\n-10047\nDBR_POSTALCODE_LICENSE_INVALID\nDBR_DPM_LICENSE_INVALID\n-10048\n-10048\nDBR_DPM_LICENSE_INVALID\nDBR_FRAME_DECODING_THREAD_EXISTS\n-10049\n-10049\nDBR_FRAME_DECODING_THREAD_EXISTS\nDBR_STOP_DECODING_THREAD_FAILED\n-10050\n-10050\nDBR_STOP_DECODING_THREAD_FAILED\nDBR_SET_MODE_ARGUMENT_ERROR\n-10051\n-10051\nDBR_SET_MODE_ARGUMENT_ERROR\nDBR_LICENSE_CONTENT_INVALID\n-10052\n-10052\nDBR_LICENSE_CONTENT_INVALID\nDBR_LICENSE_KEY_INVALID\n-10053\n-10053\nDBR_LICENSE_KEY_INVALID\nDBR_LICENSE_DEVICE_RUNS_OUT\n-10054\n-10054\nDBR_LICENSE_DEVICE_RUNS_OUT\nDBR_GET_MODE_ARGUMENT_ERROR\n-10055\n-10055\nDBR_GET_MODE_ARGUMENT_ERROR\nDBR_IRT_LICENSE_INVALID\n-10056\n-10056\nDBR_IRT_LICENSE_INVALID\nDBR_MAXICODE_LICENSE_INVALID\n-10057\n-10057\nDBR_MAXICODE_LICENSE_INVALID\nDBR_GS1_DATABAR_LICENSE_INVALID\n-10058\n-10058\nDBR_GS1_DATABAR_LICENSE_INVALID\nDBR_GS1_COMPOSITE_LICENSE_INVALID\n-10059\n-10059\nDBR_GS1_COMPOSITE_LICENSE_INVALID\nDBR_DOTCODE_LICENSE_INVALID\n-10061\n-10061\nDBR_DOTCODE_LICENSE_INVALID";
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumErrorCode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumImagePixelFormat", ()=> {
        var expectedvalue ="0\nIPF_Binary\n1\nIPF_BinaryInverted\n2\nIPF_GrayScaled\n3\nIPF_NV21\n4\nIPF_RGB_565\n5\nIPF_RGB_555\n6\nIPF_RGB_888\n7\nIPF_ARGB_8888\n8\nIPF_RGB_161616\n9\nIPF_ARGB_16161616\n10\nIPF_ABGR_8888\n11\nIPF_ABGR_16161616\n12\nIPF_BGR_888\nIPF_Binary\n0\nIPF_BinaryInverted\n1\nIPF_GrayScaled\n2\nIPF_NV21\n3\nIPF_RGB_565\n4\nIPF_RGB_555\n5\nIPF_RGB_888\n6\nIPF_ARGB_8888\n7\nIPF_RGB_161616\n8\nIPF_ARGB_16161616\n9\nIPF_ABGR_8888\n10\nIPF_ABGR_16161616\n11\nIPF_BGR_888\n12"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumImagePixelFormat)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumLocalizationMode", ()=> {
        var expectedvalue ="0\nLM_SKIP\n1\nLM_AUTO\n2\nLM_CONNECTED_BLOCKS\n4\nLM_STATISTICS\n8\nLM_LINES\n16\nLM_SCAN_DIRECTLY\n32\nLM_STATISTICS_MARKS\n64\nLM_STATISTICS_POSTAL_CODE\nLM_SKIP\n0\nLM_AUTO\n1\nLM_CONNECTED_BLOCKS\n2\nLM_LINES\n8\nLM_STATISTICS\n4\nLM_SCAN_DIRECTLY\n16\nLM_STATISTICS_MARKS\n32\nLM_STATISTICS_POSTAL_CODE\n64"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumLocalizationMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumResultType", ()=> {
        var expectedvalue ="0\nRT_STANDARD_TEXT\n1\nRT_RAW_TEXT\n2\nRT_CANDIDATE_TEXT\n3\nRT_PARTIAL_TEXT\nRT_STANDARD_TEXT\n0\nRT_RAW_TEXT\n1\nRT_CANDIDATE_TEXT\n2\nRT_PARTIAL_TEXT\n3"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumResultType)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumTerminatePhase", ()=> {
        var expectedvalue ="1\nTP_REGION_PREDETECTED\n2\nTP_IMAGE_PREPROCESSED\n4\nTP_IMAGE_BINARIZED\n8\nTP_BARCODE_LOCALIZED\n16\nTP_BARCODE_TYPE_DETERMINED\n32\nTP_BARCODE_RECOGNIZED\nTP_REGION_PREDETECTED\n1\nTP_IMAGE_PREPROCESSED\n2\nTP_IMAGE_BINARIZED\n4\nTP_BARCODE_LOCALIZED\n8\nTP_BARCODE_TYPE_DETERMINED\n16\nTP_BARCODE_RECOGNIZED\n32"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumTerminatePhase)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    
    it("EnumBarcodeColourMode", ()=> {
        var expectedvalue ="0\nBICM_SKIP\n1\nBICM_DARK_ON_LIGHT\n2\nBICM_LIGHT_ON_DARK\n4\nBICM_DARK_ON_DARK\n8\nBICM_LIGHT_ON_LIGHT\n16\nBICM_DARK_LIGHT_MIXED\n32\nBICM_DARK_ON_LIGHT_DARK_SURROUNDING\nBICM_DARK_ON_LIGHT\n1\nBICM_LIGHT_ON_DARK\n2\nBICM_DARK_ON_DARK\n4\nBICM_LIGHT_ON_LIGHT\n8\nBICM_DARK_LIGHT_MIXED\n16\nBICM_DARK_ON_LIGHT_DARK_SURROUNDING\n32\nBICM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumBarcodeColourMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumBarcodeComplementMode", ()=> {
        var expectedvalue = "0\nBCM_SKIP\n1\nBCM_AUTO\n2\nBCM_GENERAL\nBCM_AUTO\n1\nBCM_GENERAL\n2\nBCM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumBarcodeComplementMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumBarcodeFormat_2", ()=> {
        var expectedvalue ="0\nBF2_NULL\n1\nBF2_NONSTANDARD_BARCODE\n2\nBF2_DOTCODE\n1048576\nBF2_USPSINTELLIGENTMAIL\n2097152\nBF2_POSTNET\n4194304\nBF2_PLANET\n8388608\nBF2_AUSTRALIANPOST\n16777216\nBF2_RM4SCC\n32505856\nBF2_POSTALCODE\nBF2_NULL\n0\nBF2_POSTALCODE\n32505856\nBF2_NONSTANDARD_BARCODE\n1\nBF2_USPSINTELLIGENTMAIL\n1048576\nBF2_POSTNET\n2097152\nBF2_PLANET\n4194304\nBF2_AUSTRALIANPOST\n8388608\nBF2_RM4SCC\n16777216\nBF2_DOTCODE\n2"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumBarcodeFormat_2)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumColourClusteringMode", ()=> {
        var expectedvalue ="0\nCCM_SKIP\n1\nCCM_AUTO\n2\nCCM_GENERAL_HSV\nCCM_AUTO\n1\nCCM_GENERAL_HSV\n2\nCCM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumColourClusteringMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumBinarizationMode", ()=> {
        var expectedvalue ="0\nBM_SKIP\n1\nBM_AUTO\n2\nBM_LOCAL_BLOCK\nBM_AUTO\n1\nBM_LOCAL_BLOCK\n2\nBM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumBinarizationMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumColourConversionMode", ()=> {
        var expectedvalue ="0\nCICM_SKIP\n1\nCICM_GENERAL\nCICM_GENERAL\n1\nCICM_SKIP\n0";
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumColourConversionMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumDPMCodeReadingMode", ()=> {
        var expectedvalue ="0\nDPMCRM_SKIP\n1\nDPMCRM_AUTO\n2\nDPMCRM_GENERAL\nDPMCRM_AUTO\n1\nDPMCRM_GENERAL\n2\nDPMCRM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumDPMCodeReadingMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumDeformationResistingMode", ()=> {
        var expectedvalue ="0\nDRM_SKIP\n1\nDRM_AUTO\n2\nDRM_GENERAL\nDRM_AUTO\n1\nDRM_GENERAL\n2\nDRM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumDeformationResistingMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumGrayscaleTransformationMode", ()=> {
        var expectedvalue ="0\nGTM_SKIP\n1\nGTM_INVERTED\n2\nGTM_ORIGINAL\nGTM_INVERTED\n1\nGTM_ORIGINAL\n2\nGTM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumGrayscaleTransformationMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumImagePreprocessingMode", ()=> {
        var expectedvalue ="0\nIPM_SKIP\n1\nIPM_AUTO\n2\nIPM_GENERAL\n4\nIPM_GRAY_EQUALIZE\n8\nIPM_GRAY_SMOOTH\n16\nIPM_SHARPEN_SMOOTH\n32\nIPM_MORPHOLOGY\nIPM_AUTO\n1\nIPM_GENERAL\n2\nIPM_GRAY_EQUALIZE\n4\nIPM_GRAY_SMOOTH\n8\nIPM_SHARPEN_SMOOTH\n16\nIPM_MORPHOLOGY\n32\nIPM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumImagePreprocessingMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumIntermediateResultSavingMode", ()=> {
        var expectedvalue ="1\nIRSM_MEMORY\n2\nIRSM_FILESYSTEM\n4\nIRSM_BOTH\nIRSM_MEMORY\n1\nIRSM_FILESYSTEM\n2\nIRSM_BOTH\n4"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumIntermediateResultSavingMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumIntermediateResultType", ()=> {
        var expectedvalue ="0\nIRT_NO_RESULT\n1\nIRT_ORIGINAL_IMAGE\n2\nIRT_COLOUR_CLUSTERED_IMAGE\n4\nIRT_COLOUR_CONVERTED_GRAYSCALE_IMAGE\n8\nIRT_TRANSFORMED_GRAYSCALE_IMAGE\n16\nIRT_PREDETECTED_REGION\n32\nIRT_PREPROCESSED_IMAGE\n64\nIRT_BINARIZED_IMAGE\n128\nIRT_TEXT_ZONE\n256\nIRT_CONTOUR\n512\nIRT_LINE_SEGMENT\n1024\nIRT_FORM\n2048\nIRT_SEGMENTATION_BLOCK\n4096\nIRT_TYPED_BARCODE_ZONE\n8192\nIRT_PREDETECTED_QUADRILATERAL\nIRT_NO_RESULT\n0\nIRT_ORIGINAL_IMAGE\n1\nIRT_COLOUR_CLUSTERED_IMAGE\n2\nIRT_COLOUR_CONVERTED_GRAYSCALE_IMAGE\n4\nIRT_TRANSFORMED_GRAYSCALE_IMAGE\n8\nIRT_PREDETECTED_REGION\n16\nIRT_PREPROCESSED_IMAGE\n32\nIRT_BINARIZED_IMAGE\n64\nIRT_TEXT_ZONE\n128\nIRT_CONTOUR\n256\nIRT_LINE_SEGMENT\n512\nIRT_FORM\n1024\nIRT_SEGMENTATION_BLOCK\n2048\nIRT_TYPED_BARCODE_ZONE\n4096\nIRT_PREDETECTED_QUADRILATERAL\n8192"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumIntermediateResultType)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumRegionPredetectionMode", ()=> {
        var expectedvalue ="0\nRPM_SKIP\n1\nRPM_AUTO\n2\nRPM_GENERAL\n4\nRPM_GENERAL_RGB_CONTRAST\n8\nRPM_GENERAL_GRAY_CONTRAST\n16\nRPM_GENERAL_HSV_CONTRAST\nRPM_AUTO\n1\nRPM_GENERAL\n2\nRPM_GENERAL_RGB_CONTRAST\n4\nRPM_GENERAL_GRAY_CONTRAST\n8\nRPM_GENERAL_HSV_CONTRAST\n16\nRPM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumRegionPredetectionMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumResultCoordinateType", ()=> {
        var expectedvalue ="1\nRCT_PIXEL\n2\nRCT_PERCENTAGE\nRCT_PIXEL\n1\nRCT_PERCENTAGE\n2"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumResultCoordinateType)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumTextAssistedCorrectionMode", ()=> {
        var expectedvalue ="0\nTACM_SKIP\n1\nTACM_AUTO\n2\nTACM_VERIFYING\n4\nTACM_VERIFYING_PATCHING\nTACM_AUTO\n1\nTACM_VERIFYING\n2\nTACM_VERIFYING_PATCHING\n4\nTACM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumTextAssistedCorrectionMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    
    it("EnumScaleUpMode", ()=> {
        var expectedvalue ="0\nSUM_SKIP\n1\nSUM_AUTO\n2\nSUM_LINEAR_INTERPOLATION\n4\nSUM_NEAREST_NEIGHBOUR_INTERPOLATION\nSUM_AUTO\n1\nSUM_LINEAR_INTERPOLATION\n2\nSUM_NEAREST_NEIGHBOUR_INTERPOLATION\n4\nSUM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumScaleUpMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumTextFilterMode", ()=> {
        var expectedvalue = "0\nTFM_SKIP\n1\nTFM_AUTO\n2\nTFM_GENERAL_CONTOUR\nTFM_AUTO\n1\nTFM_GENERAL_CONTOUR\n2\nTFM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumTextFilterMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumTextResultOrderMode", ()=> {
        var expectedvalue = "0\nTROM_SKIP\n1\nTROM_CONFIDENCE\n2\nTROM_POSITION\n4\nTROM_FORMAT\nTROM_CONFIDENCE\n1\nTROM_POSITION\n2\nTROM_FORMAT\n4\nTROM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumTextResultOrderMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });
    
    it("EnumTextureDetectionMode", ()=> {
        var expectedvalue = "0\nTDM_SKIP\n1\nTDM_AUTO\n2\nTDM_GENERAL_WIDTH_CONCENTRATION\nTDM_AUTO\n1\nTDM_GENERAL_WIDTH_CONCENTRATION\n2\nTDM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumTextureDetectionMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    });

    it('EnumAccompanyingTextRecognitionMode',()=>{
        var expectedvalue = "0\nATRM_SKIP\n1\nATRM_GENERAL\nATRM_GENERAL\n1\nATRM_SKIP\n0"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumAccompanyingTextRecognitionMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    })

    it('EnumClarityCalculationMethod',()=>{
        var expectedvalue = "1\nECCM_CONTRAST\nECCM_CONTRAST\n1"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumClarityCalculationMethod)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    })

    it('EnumClarityFilterMode',()=>{
        var expectedvalue = "1\nCFM_GENERAL\nCFM_GENERAL\n1"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumClarityFilterMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    })

    it('EnumIMResultDataType',()=>{
        var expectedvalue = "1\nIMRDT_IMAGE\n2\nIMRDT_CONTOUR\n4\nIMRDT_LINESEGMENT\n8\nIMRDT_LOCALIZATIONRESULT\n16\nIMRDT_REGIONOFINTEREST\n32\nIMRDT_QUADRILATERAL\nIMRDT_IMAGE\n1\nIMRDT_CONTOUR\n2\nIMRDT_LINESEGMENT\n4\nIMRDT_LOCALIZATIONRESULT\n8\nIMRDT_REGIONOFINTEREST\n16\nIMRDT_QUADRILATERAL\n32"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumIMResultDataType)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    })
    it('EnumQRCodeErrorCorrectionLevel',()=>{
        var expectedvalue = "0\nQRECL_ERROR_CORRECTION_H\n1\nQRECL_ERROR_CORRECTION_L\n2\nQRECL_ERROR_CORRECTION_M\n3\nQRECL_ERROR_CORRECTION_Q\nQRECL_ERROR_CORRECTION_H\n0\nQRECL_ERROR_CORRECTION_L\n1\nQRECL_ERROR_CORRECTION_M\n2\nQRECL_ERROR_CORRECTION_Q\n3"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumQRCodeErrorCorrectionLevel)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    })
    it('EnumPDFReadingMode',()=>{
        var expectedvalue = "1\nPDFRM_RASTER\n2\nPDFRM_AUTO\n4\nPDFRM_VECTOR\nPDFRM_RASTER\n1\nPDFRM_AUTO\n2\nPDFRM_VECTOR\n4"
        cy.window().then(win=>{
            cy.wrap(win.settingsToStr(win.Dynamsoft.EnumPDFReadingMode)).then((res)=>{
                expect(res.join('\n')).eq(expectedvalue)
            })
        })
    })

    it('Dynamsoft',()=>{
        var txt=[]
        var expectedvalue = "1\nPDFRM_RASTER\n2\nPDFRM_AUTO\n4\nPDFRM_VECTOR\nPDFRM_RASTER\n1\nPDFRM_AUTO\n2\nPDFRM_VECTOR\n4"
        cy.window().then(win=>{
            cy.wrap(win.Object.keys(win.Dynamsoft).forEach(function(key){
                txt.push(key);
                console.log(key);           
           }))
           expect(txt.join('\n')).eq("BarcodeReader\nBarcodeScanner\nEnumAccompanyingTextRecognitionMode\nEnumBarcodeColourMode\nEnumBarcodeComplementMode\nEnumBarcodeFormat\nEnumBarcodeFormat_2\nEnumBinarizationMode\nEnumClarityCalculationMethod\nEnumClarityFilterMode\nEnumColourClusteringMode\nEnumColourConversionMode\nEnumConflictMode\nEnumDeformationResistingMode\nEnumDPMCodeReadingMode\nEnumErrorCode\nEnumGrayscaleTransformationMode\nEnumImagePixelFormat\nEnumImagePreprocessingMode\nEnumIMResultDataType\nEnumIntermediateResultSavingMode\nEnumIntermediateResultType\nEnumLocalizationMode\nEnumPDFReadingMode\nEnumQRCodeErrorCorrectionLevel\nEnumRegionPredetectionMode\nEnumResultCoordinateType\nEnumResultType\nEnumScaleUpMode\nEnumTerminatePhase\nEnumTextAssistedCorrectionMode\nEnumTextFilterMode\nEnumTextResultOrderMode\nEnumTextureDetectionMode\ndefault")
        })
       
    })
 
})