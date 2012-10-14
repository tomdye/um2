(function(){
		//Default values for cookie field and popup position
	var _cookieField = "cookiesAllowed",
		_position = "bottom",
		_cookieRequires = [],
		//Soon to be boolean value to hold existing or new cookie permisison
		_cookiesPermitted = null,
		//Param names to search for in the body tag attributes to allow
		//easy overriding of the two default values above
		_cookiePositionAttr = "data-cookie-position",
		_cookieFieldAttr = "data-cookie-field",
		_cookiePolicyAttr = "data-cookie-policy";

	//see if we have override settings in the body tag params
	_getSettings();
	//Get cookie and store in cache as object!
	_processCookie();
	
	//if cookies permitted is STILL null, we much create a popup!
	if (_cookiesPermitted === null) {
		_createPopup();
	}
	
	function _getSettings () {
		//IE supporting get Attr function
		var _getAttr = function(ele, attr) {
        	var result = (ele.getAttribute && ele.getAttribute(attr)) || null;
        	if( !result ) {
	            var attrs = ele.attributes,
	            	len = attrs.length,
	            	i = 0;
				for(i; i < len; i+=1) {
					if (attr[i].nodeName === attr) {
						result = attr[i].nodeValue;
						break;		
					}
				}				
        	}
        	return result;
    	}

		var _bodyCookiePosition = _getAttr(document.body, _cookiePositionAttr), 
			_bodyCookieField = _getAttr(document.body, _cookieFieldAttr);

		if (_bodyCookiePosition && _bodyCookiePosition !== "") {
			_position = _bodyCookiePosition;
		}

		if (_bodyCookieField && _bodyCookieField !== "") {
			_cookieField = _bodyCookieField;
		}
	}

	function _processCookie() {
			if (document.cookie && document.cookie !== "") {
			var _cookieArr = document.cookie.split(";"),
				_len = _cookieArr.length, 
				i = 0, 
				_tmpPair = [];

			for (i; i < _len; i+=1) {
				_tmpPair = _cookieArr[i].split("=");
				if (unescape(_tmpPair[0]) == _cookieField) {
					_cookiesPermitted = unescape(_tmpPair[1]);
					break;
				}
			}
		}
	}

	function _createPopup() {
		var _yesLink, _noLink, _tempElem, _popupHolder;

		_popupHolder = document.createElement("div");
		_popupHolder.setAttribute("class", "cookiePopup " + _position);

		_tempElem = document.createElement("p");
		_tempElem.innerHTML = "We want you to enjoy your visit to our website. That's why we use cookies to collect anonymous user data to enable us to enhance your experience.";
		_popupHolder.appendChild(_tempElem);

		_tempElem = document.createElement("p");
		_tempElem.innerHTML = "By staying on our website you agree to our use of cookies";
		_popupHolder.appendChild(_tempElem);

		_yesLink = document.createElement("a");
		_yesLink.innerHTML = "Agree to Cookies";
		_yesLink.setAttribute("class", "btn btn-primary yesLink");
		_yesLink.setAttribute("href", "#AllowCookies");
		_yesLink.addEventListener("click", function(e){_setPreference(e, true, _popupHolder);});

		_noLink = document.createElement("a");
		_noLink.innerHTML = "Please take me away";
		_noLink.setAttribute("class", "btn btn-danger noLink");
		_noLink.setAttribute("href","http://lmgtfy.com/?q=Why+do+I+bother%3F");
		_noLink.addEventListener("click", function(e){_setPreference(e,false, _popupHolder);});

		_popupHolder.appendChild(_yesLink);
		_tempElem = document.createElement("p");
		_tempElem.innerHTML = "or...";
		_popupHolder.appendChild(_tempElem);
		_popupHolder.appendChild(_noLink);

		_tempElem = document.createElement("p");
		_tempElem.innerHTML = "You can view our cookie policy by <a href='cookies.html' class='policy'>clicking here</a>";
		_popupHolder.appendChild(_tempElem);

		document.body.insertBefore(_popupHolder, document.body.firstChild);		
	}

	function _setPreference(e, pref, popup) {
		//TODO: Add expire and path vals
		document.cookie = _cookieField + "=" + pref + ";";
		$(popup).addClass("fade");
		/*if (popup) {
			popup.parentNode.removeChild(popup);
		}*/
	}
})();