// Google Apps Script for automating student registration workflow

function onFormSubmit(e) {
  var formResponses = e.values;
  var email = formResponses[1]; // assuming the second field is email
  var studentName = formResponses[2]; // assuming the third field is student name

  // Create a folder for the student in Google Drive
  var folderName = studentName + " Registration";
  var folder = DriveApp.createFolder(folderName);

  // Send a confirmation email
  var subject = 'Registration Successful';
  var body = 'Dear ' + studentName + ',\n\nThank you for registering. Your registration is successful.\n\nBest Regards,\nSchool';
  MailApp.sendEmail(email, subject, body);
  
  // Logging information for debugging
  Logger.log('Folder created: ' + folder.getName());
  Logger.log('Email sent to: ' + email);
}

function setupTriggers() {
  var form = FormApp.openById('YOUR_FORM_ID'); // Replace with your actual form ID
  ScriptApp.newTrigger('onFormSubmit')
      .forForm(form)
      .onFormSubmit()
      .create();
}