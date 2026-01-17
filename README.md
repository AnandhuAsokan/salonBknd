# salonBknd
Clone the project repository to your local machine.

Open the project folder in your terminal.

Install all required dependencies by running: npm run dev.

---------------------------------------------------------------------------------

how the booking logic works

----------------------------------------------------------------------------------

This function finds available booking slots for a selected service and date by first getting the salon’s working hours and converting them into minutes. It skips past dates and ignores staff who are on leave that day. For each available staff member, it checks their existing bookings and removes any time slots that overlap with those bookings. If the selected date is today, it also removes all past time slots by starting from the current time rounded to the next 15-minute interval. Finally, it generates valid time slots in 15-minute steps based on the service duration and returns only the staff members who still have free slots available.

