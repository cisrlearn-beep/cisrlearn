function distributeExams(examData, studentEmails) {
    studentEmails.forEach(email => {
        MailApp.sendEmail(email, 'Your Exam', examData);
    });
}

function collectResponses(formUrl) {
    const response = UrlFetchApp.fetch(formUrl);
    Logger.log('Responses collected: ' + response.getContentText());
}

function scheduleReviews(reviewerEmail, examDate) {
    const reviewDate = new Date(examDate);
    reviewDate.setDate(reviewDate.getDate() + 1); // Schedule review for the next day

    MailApp.sendEmail(reviewerEmail, 'Review Scheduled', `Your review is scheduled for ${reviewDate}`);
}

function notifyAll(examData, studentEmails, formUrl, reviewerEmail, examDate) {
    distributeExams(examData, studentEmails);
    collectResponses(formUrl);
    scheduleReviews(reviewerEmail, examDate);
}