# automation_google
Automation using google scripts to use a agenda to booking rooms to make meetings. 

For that I create a forms, with some information such as: email, date and time for the booking, place. After that I get the google sheets that generate the responses and add this google script

In this code, the person can selected the time, date and place, we will check the avabiality of the place in this time in the google calendar.
In case it won't be possible to book, we gonna send a email. 
In case it be possible, it'll create a event in the google calendar, booking the place, and send a email
