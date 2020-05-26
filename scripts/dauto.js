var reader = null;
var scanner = null;
var storedResults = [];
var resultexception = [];
var storeFrameResults = [];
var  IRTResult;
var errormessage ="";
function clearEnv(){

    storedResults.length =0;
    storeFrameResults.length=0;
    errormessage ="";
}
async function initializeDBR(istrue, settingmode) {
    try {
        try{
            Dynamsoft.BarcodeReader.licenseServer = "http://localhost:5000";
            Dynamsoft.BarcodeReader._bUseFullFeature = istrue;
        }catch(ex){console.log(ex.message)}
        
        reader = await Dynamsoft.BarcodeReader.createInstance();
        console.log(Dynamsoft.BarcodeScanner.defaultUIElementURL);
        scanner = await Dynamsoft.BarcodeScanner.createInstance();
       //let scanSettings = await scanner.getScanSettings();
       // scanSettings.intervalTime = 10;
       // scanSettings.duplicateForgetTime = 2000;
       //await scanner.updateScanSettings(scanSettings);
       if(arguments.length ==2)
        await scanner.updateRuntimeSettings(settingmode);
        // let settings = await scanner.getRuntimeSettings();
        // if(Dynamsoft.BarcodeReader._bUseFullFeature){
        //     settings.intermediateResultTypes = 1;// the intermediateResult need a real t0068MgAAAH3vMNEYVtaxx8B4o2PhHBSVOY7Rsf70rl8YywbJ8bhHIK5Uh90pQZJv6oQQaa8M+o7Gk7fJMGu2YMY5cNeoEco= support it
        // }else{
        //     scanner.bSaveOriCanvas = true;
        // }
        // await scanner.updateRuntimeSettings(settings);
        // console.log("reader & scanner created")
        //scanner.clearMapDecodeRecord();
        //let startTime = Date.now();
        scanner.onUnduplicatedRead = async function (txt, result) {
            var a;
            if(result.barcodeFormatString.search("No Barcode Format")==0)
                a = result.barcodeFormatString_2;
            else
                a = result.barcodeFormatString;
            console.log(a+ '_' + txt)
            storedResults.push(a+ '_' + txt);
            // let processingCount = 0;
            // if( processingCount < 4){ // max 4 request
            //     ++processingCount;
            //     try{
            //         let cvss = dbr.BarcodeReader._bUseFullFeature? await scanner.getIntermediateCanvas() : [scanner.oriCanvas];
            //         // send oriCanvas as png to server
            //         let fd = new FormData();
            //         for(let cvs of cvss){               
            //             let blob = await new Promise(resolve=>{
            //                 cvs.toBlob(blob=>resolve(blob));
            //             });
            //             fd.append("img",blob);
            //         }
            //         await fetch("https://localhost:4443/collect", {
            //             method: "POST",
            //             body: fd
            //         });
            //     }catch(ex){
            //         console.error(ex);
            //     }
            //     --processingCount;
            // }
           // console.log("finishTime:", Date.now()-startTime);
        }

        scanner.onFrameRead = function (results) {
            for (let result of results) {
                resultexception.push(result.exception)
               // console.log("frame", result.barcodeFormatString + '_' + result.barcodeText)
                storeFrameResults.push(result.barcodeFormatString + '_' + result.barcodeText);
            }
        }

        //getCameraList();
    } catch (error) {
        console.log(error)
        errormessage = error.message;
    }
}
async function decodefile(file){
    try{
       var res= await reader.decode(file)
        storeReaderResults(res)
    }catch(ex){
        errormessage =ex.message
    }
    
}
 function storeReaderResults(results){
    for(var i=0; i<results.length; i++){   
        var a, txt;
        if(results[i].barcodeFormatString.search("No Barcode Format")==0){
            a = results[i].barcodeFormatString_2;
        }else{
            a = results[i].barcodeFormatString;
        }
        console.log(a+ '_' +  results[i].barcodeText)
        storedResults.push(a+ '_' +  results[i].barcodeText);
    }
    
    return storedResults;
}
async function updateSettings(settings){
    try{
        await scanner.updateRuntimeSettings(settings)
    }catch(ex){
        errormessage = ex.message;
    }

}

async function initRuntimeSetting(settings){
    try{
        await scanner.initRuntimeSettingsWithString(settings)
    }catch(ex){
        errormessage = ex.message;
    }
}

async function getIntermediateResult(){
    try{
        scanner.onFrameRead=async function (results) {
            if(results.length)
            IRTResult =await scanner.getIntermediateCanvas()
            //console.log("IRT:", IRTResult[0])
            scanner.close()
        }
        let settings = await scanner.getRuntimeSettings();
        settings.intermediateResultTypes = 1;
        await scanner.updateRuntimeSettings(settings)
        scanner.open
    }catch(ex){
        errormessage = ex.message;
    }
}
async function setModeArgs(arr){
    try{
        await scanner.setModeArgument(arr[0], arr[1], arr[2], arr[3])
    }catch(ex){
        errormessage = ex.message;
    }
}
async function updateBarcodeFormat(barcodeformat){
   // scanner.clearMapDecodeRecord();
    let settings = await scanner.getRuntimeSettings();
    let settings_2 = await reader.getRuntimeSettings();
    
    if(barcodeformat[0] == 0 &&barcodeformat[1] == 0  ){
        settings.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ALL;
        settings.barcodeFormatIds_2 = Dynamsoft.EnumBarcodeFormat_2.BF2_POSTALCODE | Dynamsoft.EnumBarcodeFormat_2.BF2_DOTCODE ;
        settings.furtherModes.dpmCodeReadingModes[0] = Dynamsoft.EnumDPMCodeReadingMode.DPMCRM_GENERAL;
        settings_2.barcodeFormatIds = Dynamsoft.EnumBarcodeFormat.BF_ALL;
        settings_2.barcodeFormatIds_2 = Dynamsoft.EnumBarcodeFormat_2.BF2_POSTALCODE | Dynamsoft.EnumBarcodeFormat_2.BF2_DOTCODE ;
        settings_2.furtherModes.dpmCodeReadingModes[0] = Dynamsoft.EnumDPMCodeReadingMode.DPMCRM_GENERAL;
        //settings.localizationModes[4] = Dynamsoft.EnumLocalizationMode.LM_STATISTICS_MARKS;
        settings_2.furtherModes.grayscaleTransformationModes=[2,1,0,0,0,0,0,0]
        settings_2.timeout=15000;
    }
    else{
        settings.barcodeFormatIds = barcodeformat[0];
        settings.barcodeFormatIds_2= barcodeformat[1];
        settings_2.barcodeFormatIds = barcodeformat[0];
        settings_2.barcodeFormatIds_2= barcodeformat[1];
    }
     try{
         await scanner.updateRuntimeSettings(settings);
         await reader.updateRuntimeSettings(settings_2);
     }catch(ex){
         errormessage =ex.message;
     }
    
}

async function settingsToStr(settings){
    var txts =[]
    
    $.each(settings, function (e, ele) {
        txts.push(e, ele);
    });
    return txts
}
async function getURL(key, req){
    var date = new Date();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    if(month.length == 1)
    month = "0"+month;
    if(day.length==1)
    day= "0"+day;
    return "http://localhost:5000/api/verification/"+key+"/"+date.getFullYear()+month+day+"/"+req;

}

function storeFrameResultsAfterX(waitTime, onVideoStopped) {
    
    let startTime = Date.now();
    console.log("startTime:", startTime)
    scanner.onFrameRead = function (results) {
        for (let result of results) {
            storedResults.push(result.barcodeFormatString + '_' + result.barcodeText);
        }
        scanner.pause();
        console.log("finishTime:", Date.now()-startTime);
        onVideoStopped(storedResults);
    }
    // setTimeout(() => {
    //     scanner.pause();
    //     onVideoStopped(storedResults)
    // }, waitTime)
}

function storeUndupResultsAfterX(waitTime, onVideoStopped) {
   // let startTime = Date.now();
    console.log("startTime:", startTime)
    scanner.clearMapDecodeRecord();
    scanner.onUnduplicatedRead = function (txt, result) {
        var a;
        if(result.barcodeFormatString.search("No Barcode Format")==0)
            a = result.barcodeFormatString_2;
        else
            a = result.barcodeFormatString;
        storedResults.push(a+ '_' + txt);
        scanner.pause();
        onVideoStopped(storedResults);
        scanner.onUnduplicatedRead =null;
       // console.log("finishTime:", Date.now()-startTime);
    }  
}

function saveAsCSV(rows) {
    console.log('saving..')
    let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dbr_test_" + Date.now() + ".csv");
    link.click();
}

// Get the list of files from the selected folder and subfolders. 
function getFileList(file) {
    if (file == null) {
        return;
    }
    let files;
    let fileList = [];
    for (let i = 0; i < file.length; i++) {
        files = "https://192.168.1.41/images/" + file[i].webkitRelativePath;
        fileList.push(files);
    }
    console.log(fileList);
    decodeBarcodeFromFolder(fileList);
}

async function decodeBarcodeFromFolder(files) {
    console.log("in")
    if (reader) {
        console.log(files)

        let rows = [["Image Path", "Barcode Type", "Barcode Value"]];
        for (let i = 0; i < files.length; i++) {
            let results = await reader.decodeUrl(files[i]);
            for (let result of results) {
                console.log(result);
                //[Image Path | Barcode Type | Barcode Value]
                rows.push([files[i], result.BarcodeFormatString, result.barcodeText]);
                var resultDiv = document.getElementById('results-container');
                var span = document.createElement('span');
                span.style.cssText = 'display:block'
                span.textContent = result.barcodeText;
                resultDiv.appendChild(span);
            }
        };
        saveAsCSV(rows);
    };
};

const video = document.querySelector('video');
async function getCameraList() {

    navigator.mediaDevices.getUserMedia({ video: { width: { exact: 640 }, height: { exact: 480 } } }).then(handleSuccess).catch(handleError);

    console.log('camera')
    if (scanner) {
        let cameras = await scanner.getAllCameras();
        console.log(cameras)
    }
}
function handleSuccess(stream) {
    video.srcObject = stream;
}

function handleError(error) {
    console.error('Error: ', error);
}


