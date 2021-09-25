# MiniDashboardChallenge

## pages
This project has 3 page: login, dashboard, error(not found)
project link: 
email : erfanhematig@gmail.com

pass  : 555555

## project intorduction 
In this project use angular material for components for example use table, button, snackbar, drawer and etc.

## login page
In login page email and password should be entered to can access dashboard page, if enter wrong email or password in snackbar show "enter valid information".

Auth gaurd protect to use url to go to dashboard page. if type dashboard in url auth gaurd check you are logged in or not if you aren't logged in redirect to login page.
If you are logged in and go to login page redirect to dashboard page.

## dashboard page
After login you redirect to this page. In this page if you enter login url without log out you redirect to this page again.

we use angular material in all ccomponent.

at top we have toolbar thats contain email and drawer button and at second row use input for company, project, task and at third row have input for hours and save button to save data in firestore.

at the middle of the page we have table that add from angular material, task of this table is get data from firestore and show them. at this table we have a button for delete data from fire store

## error page
this is a simple page that show "Page Not Found" if invalid url entered.
