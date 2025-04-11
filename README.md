# KSB front end 

This frontend displays a list of KSBs.
- If a user is logged in as admin, they can add a new KSB, delete a KSB's, update a KSB and sort KSBs by `last updated` and `theme`
- If users aren't logged in they can only view KSB's

## Set up project to run tests

**clone the repo**
- git clone https://github.com/Harriet-Hall/KSB-s_frontend.git

**navigate to repo**
- cd KSB-s_frontend

**install dependencies**
- npm i 

**run the tests**
- npm t


## Using the front end 

**url for the website**
- https://main.daoag95o4c1np.amplifyapp.com

**login page**
- https://main.daoag95o4c1np.amplifyapp.com/login
- login as an admin with the correct `email` and `password` 

**add a KSB**
- in the "Add a KSB" section add a `type`, `code`, `description` and `theme`
- click the `Add KSB`

  - if the KSB already exists in the database, or the inputs are invalid, the KSB will not be added and the list will remain the same 
  - if the inputs are valid, then a new KSB will appear at the top of the list 

**delete KSB**
- click the `Delete` button at the side of the KSB you would like to delete

**update KSB**
- editable fields include `type`, `code`, `description` and `is complete`
- click on a KSB's editable value - e.g. if you want to updated a KSB's code, click on it's `code` and type the new value
- once you have updated the chosen value/values, click the `Update` button at the side of the KSB

  - if the new value/values are invalid or the KSB with those values already exists, the KSB will not be updated

**sort KSBs**
- (KSB's are already ordered by `last updated`)
- click `Sort by: theme` to sort KSB's by `theme`
- click `Sort by: last updated` to sort KSB's by `last updated`

**logout**
- click the `logout` button to logout 



 


