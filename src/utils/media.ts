function getExtension(filename: string) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename: string) {
    const ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'bmp':
        case 'png':
        return true;
    }
    return false;
}

function isVideo(filename: string) {
    const ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
        case 'mov':
        return true;
    }
    return false;
}