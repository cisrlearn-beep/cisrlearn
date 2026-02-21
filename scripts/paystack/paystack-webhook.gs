function doPost(e) {
  var ss = SpreadsheetApp.openById('YOUR_SHEET_ID'); // Replace with your Google Sheet ID
  var sheet = ss.getSheetByName('YOUR_SHEET_NAME'); // Replace with your Google Sheet's name

  // Parse the incoming payload
  var data = JSON.parse(e.postData.contents);

  // Assuming the notification contains 'event' and 'data' properties
  if (data.event === 'charge.success') {
    var registrationID = data.data.metadata.registrationID; // Extract registration ID from metadata
    var updateStatus = 'Paid'; // Update status

    // Find the row in the sheet that matches the registration ID
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) { // Start from 1 to skip header
      if (rows[i][0] == registrationID) { // Assuming registration ID is in the first column
        sheet.getRange(i + 1, 2).setValue(updateStatus); // Update registration status in second column
        break;
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
}