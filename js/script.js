/**
*	script.js
*	Main javascript for TIMS
**/


// Global Variables
var minimumAnnualIncome = 400000;
var GCT = parseFloat(17 / 100 * minimumAnnualIncome);
var maxHealthCareAid = 1400000;
var healthCarePerDecade = 10 / 100 * maxHealthCareAid;

var person = "Dummy";
var age = 0;
var annualIncomeBeforeTax = 0;
var monthlyIncomeBeforeTax = 0;
var monthlyTaxes = 0; 
var monthlyEarnings = 0;
var monthlyTithes = 0;
var healthCareAid = 0;




window.onload = function()
{
	welcome();
	document.getElementById('title').innerHTML = "Turbine Income Management System <sup>Alpha</sup>";
	document.getElementById('footer').innerHTML = "By Patrick Reid (1101346)<br/>A Web Software Tools & Technology Project<br/>&copy; 2012";
}


function welcome()
{
	var message ="<div class=\"welcome\">Welcome to Turbine <br/> <span id=\"smile\">:)</span><br/><span class=\"\"></span><br/>Press Start to begin...</div>";

	document.getElementById('display').innerHTML = message;
}

function about()
{
	var info = "Thank you for using Turbine!\nTurbine was created by Patrick Reid AKA ReliQ" +
	" as a Web Software Tools and Technology project. Visit the official website of ReliQ Artz at www.reliqartz.com.";
	alert(info);
}

function start()
{
	document.getElementById('display').innerHTML = 
	"<div class='left'>" +
		"<form action='' name='infoform'>" +
			"<fieldset name='Information'>" +
				"<legend>Your Information</legend>" +
				"<p>" +
					"<label for='name'>Name: </label>" +
					"<input name='name' placeholder='4 or more letters' type='text' onblur='checkString(this)'/>" +
				"</p>" +
				"<p class='text-right'>" +
					"<label for='age'>Age: </label>" +
					"<input name='age' placeholder='>15' type='text' onblur='checkInt(this)' /><br>" +

					"<label for='annual'>Annual Salary (JMD):  </label>" +
					"<input name='annual' placeholder='>" +minimumAnnualIncome+ "' type='text' onblur='checkInt(this)' />" +
				"</p>" +
				"<p>" +
					"<button class='button' type='button' onclick='run()'>Calculate</button>" +
				"</p>" +
			"</fieldset>" +
		"</form>" +
	"</div>" +
	"<div class='right'>" +
		"<div id='output'>" +

		"</div>" +
	"</div>";
}


function checkString(obj)
{
	if(obj.value.length < 4)
	{
		obj.className="error";
		return 0;
	}else{
		obj.className="ok";
		return 1;
	}
}

function checkInt(obj)
{
	num = parseInt(obj.value);

	if(obj.name == "age")
	{
		decision = validNumber(num, 16, 65);
	}else if(obj.name == "annual")
	{
		decision = validNumber(num, minimumAnnualIncome, 999999999);
	}

	if(!decision)
	{
		obj.className="error";
		return 0;
	}else{
		obj.className="ok";
		return 1;
	}
}

function run()
{
	var userName = document.forms["infoform"]["name"].value;
	var preAge = parseInt(document.forms["infoform"]["age"].value);
	var annualSalary = parseInt(document.forms["infoform"]["annual"].value);

	var flag = 1;
	var errorMessage="Oops!!\nThe following errors were encountered:\n";

	// field validation
	if(!checkString(document.forms["infoform"]["name"]))
	{
		errorMessage += "- Invalid Name!\n";
		flag = 0;
	}
	if(!checkInt(document.forms["infoform"]["age"]))
	{
		errorMessage += "- Invalid age!\n";
		flag = 0;
	}
	if(!checkInt(document.forms["infoform"]["annual"]))
	{
		errorMessage += "- Invalid Annual Salary! \n";
		flag = 0;
	}

	if(flag==1){
		person = userName;
		age = preAge;
		annualIncomeBeforeTax = annualSalary;
		calculate();
	}else{
		errorMessage += "\nTips:\n- Age must between 15 and 66\n- Annual salary must be between JMD 400 000 and JMD 1 Billion (1 000 000 000).\n";
		alert(errorMessage);
	}	
}


function calculate()
{
	//calculate healthcare for person
	var decadesAlive = age / 10;
	healthCareAid = healthCarePerDecade * decadesAlive;
	if(healthCareAid > maxHealthCareAid)
	{
		healthCareAid = maxHealthCareAid;
	}

	// other calculations
	monthlyIncomeBeforeTax = parseFloat(annualIncomeBeforeTax / 12);
	monthlyTaxes = parseFloat(GCT / 12);
	monthlyEarnings = parseFloat(monthlyIncomeBeforeTax - monthlyTaxes);
	monthlyTithes = parseFloat(10 / 100 * monthlyEarnings);

	// display the information
	display();
}


function display()
{
	document.getElementById('output').innerHTML = 
	"<div id=\"results\">" +
		"<h2>" +person+ "</h2>" +
		"<ul>" +
			"<li>Age: " +age+ "</li>" +
			"<li>Annual Income Before Taxes: <em>$" +annualIncomeBeforeTax.toFixed(2)+ "</em></li>" +
			"<li>Monthly Income Before Taxes: <em>$" +monthlyIncomeBeforeTax.toFixed(2)+ "</em></li>" +
			"<li>Monthly Taxes: <em>$" +monthlyTaxes.toFixed(2)+ "</em></li>" +
			"<li>Monthly Earnings:<em>$" +monthlyEarnings.toFixed(2)+ "</em></li>" +
			"<li>Monthly Tithes: <em>$" +monthlyTithes.toFixed(2)+ "</em></li>" +
			"<li>Health Care Aid: <em>$" +healthCareAid.toFixed(2)+ "</em></li>" +
		"</ul>" +
	"</div>";
}

function validNumber(value, min, max)
{
	return (!isNaN(value) && value <= max && value >= min);
}