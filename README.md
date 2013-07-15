#turbine

The Turbine Project.


# Cidori 1.8.0 - *FrenchJavelin*
Cidori is an interface for eHRHub. Cidori gives a new feel to the eHRHub. 
*Includes: Communication Plugin and Notification Component*
*- For correct functionality the databases in the '!Databases!' folder should be imported into your existing database.*

### Requirements
- eHRHub
- CakePHP __2.x__

###### Recommended
- Cidori __1.7.4__ 
- Ensure you make a backup of your existing setup before attempting to install this update.

### Installation
Copy the contents of this folder to you eHRHub root folder *(leaving the directory tree intact)*.
Relevant files will be replaced.

###### Communication Plugin
Go to eHRHub top level bootstrap file located at /ehrhub/Config/bootstrap.php and append the following line:
````
CakePlugin::load('Communication', array('bootstrap' => false, 'routes' => true));
````

### Usage
###### Setting a notification
````
$this->Notification->shout(string $message, string $employee_id, int $application_id, array(string type, datetime $expires, string url));
````
eg. $this->Notification->shout('Hello!!!', TIM123, 12, array('type' => 'success', 'expires' => '2014-15-01', ''));


###### Other Major folders and files affected:
````
- /view/layout/default.ctp
- /view/layout/login.ctp
- /webroot/css/cidori
- /webroot/img/cidori
````

**Author**
* 2013 [Patrick Reid](http://reliqartz.com)*
