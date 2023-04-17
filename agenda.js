// Normalize the format of date
function formatDate(dateString) {
  var date = new Date(dateString);
  var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
  var formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}

// Normalize the format of time
function formatTime(timeString) {
  var time = new Date(timeString);
  var options = {hour: 'numeric', minute: 'numeric', hour12: false};
  var formattedTime = time.toLocaleTimeString('en-US', options);
  return formattedTime;
}

//main function that create everything
  function main() {
    
    var sheet = SpreadsheetApp.getActiveSheet();
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();
    var calendar = CalendarApp.getCalendarById('your@email.com');
    
//find last row == last response
    var lastRow = data.length - 1;
    var row = data[lastRow];
    var email = row[2];
    var date = formatDate(row[3]);
    var startTime = formatTime(row[4]);
    var endTime = formatTime(row[5]);
    var local = row[6];
  
//define the title and the description of the event
    var eventTitle = '[Reserve] ' + local;
    var eventDescription = 'Your reserve is done, the key is in the reception';
         
//Check if calendar is free at the selected time and also if the place is avaliable 
  var start = new Date(date + ' ' + startTime);
  var end = new Date(date + ' ' + endTime);
  var events = calendar.getEvents(start, end);
  var overlappingEvents = events.filter(function(event) {
    return event.getLocation() === local;
  });


  if (overlappingEvents.length > 0) {
    // Send a email message if the place isn't avaliable
    MailApp.sendEmail({
      to: email,
      subject: "unavailable",
      htmlBody: "At this time this place it's already booked"
    });
  } else {
    // Create a event and Send a email message if the place is avaliable
    var event = calendar.createEvent(eventTitle, start, end, {description: eventDescription, guests: email, location: local});
    event.addEmailReminder(60);
    event.addPopupReminder(30);
       MailApp.sendEmail({
      to: email,
      subject: "Reserve Confirmed",
      htmlBody: "It's confirmed"
    });
  }
}
    
