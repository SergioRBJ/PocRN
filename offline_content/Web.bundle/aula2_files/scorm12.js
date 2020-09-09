
var _Debug = false;

var _NoError = 0;
var _GeneralException = 101;
var _ServerBusy = 102;
var _InvalidArgumentError = 201;
var _ElementCannotHaveChildren = 202;
var _ElementIsNotAnArray = 203;
var _NotInitialized = 301;
var _NotImplementedError = 401;
var _InvalidSetValue = 402;
var _ElementIsReadOnly = 403;
var _ElementIsWriteOnly = 404;
var _IncorrectDataType = 405;

var apiHandle = null;
var API = null;
var findAPITries = 0;

//window.onbeforeunload = window.onpagehide = window.onunload = fechouJanela;
window.onbeforeunload = fechouJanela;
 
function fechouJanela(event) {
  // window.onbeforeunload = null;
   //window.onpagehide = null;
   //window.onunload = null;
   unloadPage();
}


function doLMSInitialize()
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSInitialize was not successful.");
	  return "false";
   }

   var result = api.LMSInitialize("");

   if (result.toString() != "true")
   {
	  var err = ErrorHandler();
   }

   return result.toString();
}

function doLMSFinish()
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSFinish was not successful.");
	  return "false";
   }
   else
   {
	  var result = api.LMSFinish("");
	  if (result.toString() != "true")
	  {
		 var err = ErrorHandler();
	  }

   }

   return result.toString();
}

function doLMSGetValue(name)
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSGetValue was not successful.");
	  return "";
   }
   else
   {
	  var value = api.LMSGetValue(name);
	  var errCode = api.LMSGetLastError().toString();
	  if (errCode != _NoError)
	  {
		 var errDescription = api.LMSGetErrorString(errCode);
		 //alert("LMSGetValue("+name+") failed. \n"+ errDescription);
		 return "";
	  }
	  else
	  {
		 
		 return value.toString();
	  }
   }
}

function doLMSSetValue(name, value)
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSSetValue was not successful.");
	  return;
   }
   else
   {
	  var result = api.LMSSetValue(name, value);
	  if (result.toString() != "true")
	  {
		 var err = ErrorHandler();
	  }
   }

   return;
}

function doLMSCommit()
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSCommit was not successful.");
	  return "false";
   }
   else
   {
	  var result = api.LMSCommit("");
	  if (result != "true")
	  {
		 var err = ErrorHandler();
	  }
   }

   return result.toString();
}

function doLMSGetLastError()
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSGetLastError was not successful.");
	  return _GeneralError;
   }

   return api.LMSGetLastError().toString();
}

function doLMSGetErrorString(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSGetErrorString was not successful.");
   }

   return api.LMSGetErrorString(errorCode).toString();
}

function doLMSGetDiagnostic(errorCode)
{
   var api = getAPIHandle();
   if (api == null)
   {
		//alert("Unable to locate the LMS's API Implementation.\nLMSGetDiagnostic was not successful.");
   }

   return api.LMSGetDiagnostic(errorCode).toString();
}

function LMSIsInitialized()
{

   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nLMSIsInitialized() failed.");
	  return false;
   }
   else
   {
	  var value = api.LMSGetValue("cmi.core.student_name");
	  var errCode = api.LMSGetLastError().toString();
	  if (errCode == _NotInitialized)
	  {
		 return false;
	  }
	  else
	  {
		 return true;
	  }
   }
}

function ErrorHandler()
{
   var api = getAPIHandle();
   if (api == null)
   {
	  //alert("Unable to locate the LMS's API Implementation.\nCannot determine LMS error code.");
	  return;
   }

   var errCode = api.LMSGetLastError().toString();
   if (errCode != _NoError)
   {

	  var errDescription = api.LMSGetErrorString(errCode);

	  if (_Debug == true)
	  {
		 errDescription += "\n";
		 errDescription += api.LMSGetDiagnostic(null);

	  }

	  //alert(errDescription);
   }

   return errCode;
}

function getAPIHandle()
{
   if (apiHandle == null)
   {
	  apiHandle = getAPI();
   }

   return apiHandle;
}

function findAPI(win)
{
   while ((win.API == null) && (win.parent != null) && (win.parent != win))
   {
	  findAPITries++;

	  if (findAPITries > 7) 
	  {
		 //alert("Error finding API -- too deeply nested.");
		 return null;
	  }

	  win = win.parent;

   }
   return win.API;
}

function getAPI()
{
   var theAPI = findAPI(window);
   if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined"))
   {
	  theAPI = findAPI(window.opener);
   }
   if (theAPI == null)
   {
	  //alert("Unable to find an API adapter");
   }
   return theAPI
}

var startDate;
var exitPageStatus;

function loadPage()
{
   var result = doLMSInitialize();

   var status = doLMSGetValue( "cmi.core.lesson_status" );

   if (status == "not attempted")
   {
	  doLMSSetValue( "cmi.core.lesson_status", "incomplete" );
   }

   exitPageStatus = false;
   startTimer();
}

function startTimer()
{
   startDate = new Date().getTime();
}

function computeTime()
{
   if ( startDate != 0 )
   {
	  var currentDate = new Date().getTime();
	  var elapsedSeconds = ( (currentDate - startDate) / 1000 );
	  var formattedTime = convertTotalSeconds( elapsedSeconds );
   }
   else
   {
	  formattedTime = "00:00:00.0";
   }

   doLMSSetValue( "cmi.core.session_time", formattedTime );
}

function doBack()
{
   doLMSSetValue( "cmi.core.exit", "suspend" );

   computeTime();
   exitPageStatus = true;
   
   var result;

   result = doLMSCommit();

   
   result = doLMSFinish();

}

function doContinue( status )
{

   doLMSSetValue( "cmi.core.exit", "" );

   var mode = doLMSGetValue( "cmi.core.lesson_mode" );

   if ( mode != "review"  &&  mode != "browse" )
   {
	  doLMSSetValue( "cmi.core.lesson_status", status );
   }
 
   computeTime();
   exitPageStatus = true; 
   
   var result;
   result = doLMSCommit();


   result = doLMSFinish();

}

function doQuit()
{
   doLMSSetValue( "cmi.core.exit", "logout" );

   //computeTime();
   exitPageStatus = true;
   
  var result;

   result = doLMSCommit();


   result = doLMSFinish();
}

function unloadPage(){

	var result = doContinue('completed');

	if (exitPageStatus != true)
	{
		doQuit();
	}

	
}

function convertTotalSeconds(ts)
{
   var sec = (ts % 60);

   ts -= sec;
   var tmp = (ts % 3600);  //# of seconds in the total # of minutes
   ts -= tmp;			  //# of seconds in the total # of hours

   sec = Math.round(sec*100)/100;
   
   var strSec = new String(sec);
   var strWholeSec = strSec;
   var strFractionSec = "";

   if (strSec.indexOf(".") != -1)
   {
	  strWholeSec =  strSec.substring(0, strSec.indexOf("."));
	  strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
   }
   
   if (strWholeSec.length < 2)
   {
	  strWholeSec = "0" + strWholeSec;
   }
   strSec = strWholeSec;
   
   if (strFractionSec.length)
   {
	  strSec = strSec+ "." + strFractionSec;
   }


   if ((ts % 3600) != 0 )
	  var hour = 0;
   else var hour = (ts / 3600);
   if ( (tmp % 60) != 0 )
	  var min = 0;
   else var min = (tmp / 60);

   if ((new String(hour)).length < 2)
	  hour = "0"+hour;
   if ((new String(min)).length < 2)
	  min = "0"+min;

   var rtnVal = hour+":"+min+":"+strSec;

   return rtnVal;
}

function iniciaSCO()
{
		doLMSInitialize('');

		startTimer();
		doLMSSetValue('cmi.core.lesson_status','completed');
}

function finalizaSCO()
{
		computeTime();
		doLMSFinish('');
}
