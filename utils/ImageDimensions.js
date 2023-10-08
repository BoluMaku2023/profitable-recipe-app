module.exports.getMeta = (url, maxWidth, maxHeight, callback) => {
    /*var dimensions = getImageFromStorage(url);
    
    if(dimensions!=null){
        callback(JSON.parse(dimensions))
    }*/

    runResize(url, maxWidth, maxHeight, (obj, err) => {
        if(err){
            callback(null)
        }
        
        callback(obj);
    })
}

const runResize = (url, maxWidth, maxHeight, callback) => {
    var img = new Image();
    img.src = url;
    img.onload = async () => { 
        var w = img.width
        var h = img.height

        if(img.width * 0.8 < maxWidth && img.height * 0.8 < maxHeight){
            //saveImageToStorage(url, img.width * 0.8, img.height * 0.8)

            callback({width: img.width* 0.8, height: img.height* 0.8}); 
        }
        else{
            const {width, height} = await cutDown(w* 0.9, h* 0.9, maxWidth, maxHeight)

            //saveImageToStorage(url, width, height)

            callback({width, height})
        }
    }
}

const cutDown = (width, height, maxWidth, maxHeight) => {
    
    return new Promise((resolve, reject) => {
        if(width < maxWidth && height < maxHeight){
            resolve({width, height}); 
        }
        else{
            resolve (cutDown(width * 0.9, height * 0.9, maxWidth, maxHeight))
        }
    })

}

const getImageFromStorage = (url) => {
    if(typeof window !== 'undefined'){
        return localStorage.getItem(url)
    }
    else{
        return null;
    }
}

const saveImageToStorage = (url, width, height) => {
    localStorage.setItem(url, JSON.stringify({width,height}));
}