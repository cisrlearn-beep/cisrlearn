function generateCertificate(name, course) {
  // Template ID for the certificate
  var templateId = 'TEMPLATE_ID';  // Replace with your template ID

  // Get the template
  var templateFile = DriveApp.getFileById(templateId);
  var templateBlob = templateFile.getBlob();

  // Create a new file from the template
  var certificateFile = DriveApp.createFile(templateBlob);

  // Replace placeholders in the template with actual values
  var newContents = certificateFile.getBlob().getDataAsString().replace('NAME_PLACEHOLDER', name).replace('COURSE_PLACEHOLDER', course);
  certificateFile.setContent(newContents);

  // Send the certificate via Gmail
  GmailApp.sendEmail('recipient@example.com', // Replace with recipient's email
                     'Your Certificate for ' + course,
                     'Dear ' + name + ',

Please find attached your certificate for ' + course + '.

Best regards,
Your Team',{attachments: [certificateFile]});
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Certificate Generator')
      .addItem('Generate Certificate', 'promptForDetails')
      .addToUi();
}

function promptForDetails() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Enter Name and Course', 'Please enter your name and course separated by a comma:', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() == ui.Button.OK) {
    var values = response.getResponseText().split(',');
    var name = values[0].trim();
    var course = values[1].trim();
    generateCertificate(name, course);
  }
}