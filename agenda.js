function teste(){
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('Sala Indisponível no horário desejado', ui.ButtonSet.OK);
}
//Função para colocar a Data no formato correto
function formatDate(dateString) {
  var date = new Date(dateString);
  var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
  var formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
}
//Função para colocar a Hora no formato correto
function formatTime(timeString) {
  var time = new Date(timeString);
  var options = {hour: 'numeric', minute: 'numeric', hour12: false};
  var formattedTime = time.toLocaleTimeString('en-US', options);
  return formattedTime;
}

//Cria o evento no calendário
  function createCalendarEvent() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();
    var calendar = CalendarApp.getCalendarById('your@email.com');
    
      //Pega a última linha
      var lastRow = data.length - 1;
      var row = data[lastRow];
      var email = row[1];
      var date = formatDate(row[2]);
      var startTime = formatTime(row[3]);
      var endTime = formatTime(row[4]);
      var local = row[6];

      //Pega os emails dos alunos para colocar como guests
    var guestList = row[5].trim();
  
      var eventTitle = '[Lingo Station] ' + local;
      var eventDescription = 'INSIRA_A_DESCRIÇÃO_DO_EVENTO_AQUI';
      
      var start = new Date(date + ' ' + startTime);
      var end = new Date(date + ' ' + endTime);
      
     // Check if calendar is free at the selected time
  var events = calendar.getEvents(start, end);
  var overlappingEvents = events.filter(function(event) {
    return event.getLocation() === local;
  });
  if (overlappingEvents.length > 0) {
    // Display error message if there are overlapping events
    var errorMessage = "You are not available at the selected time. Please select a different date/time.";
    Logger.log(errorMessage);
  } else {
    // Create the new event
    var event = calendar.createEvent(eventTitle, start, end, {description: eventDescription, guests: email+','+guestList, location: local});
    event.addEmailReminder(60);
    event.addPopupReminder(30);
    Logger.log(successMessage);
  }
    }