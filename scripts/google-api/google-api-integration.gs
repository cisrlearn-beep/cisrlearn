// Google API Integration Utilities

// Forms API Utility Function
function createGoogleForm(title) {
    var form = FormApp.create(title);
    return form.getId();
}

// Sheets API Utility Function
function createGoogleSheet(title) {
    var sheet = SpreadsheetApp.create(title);
    return sheet.getId();
}

// Drive API Utility Function
function uploadFileToDrive(fileName, content) {
    var blob = Utilities.newBlob(content, 'text/plain', fileName);
    var file = DriveApp.createFile(blob);
    return file.getId();
}

// Gmail API Utility Function
function sendEmail(to, subject, body) {
    MailApp.sendEmail(to, subject, body);
}