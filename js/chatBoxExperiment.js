var springSpace = springSpace || {};

(function() {
  if (!window.console) {
    var noOp = function() {};
    console = {
      log: noOp,
      warn: noOp,
      error: noOp
    };
  }
  var chat_div, chat_load, chat_timer, chat_self_triggered, chat_button, qs;
  var libchat_options = {
    "id": "966",
    "iid": "721",
    "hash": "7df867c6243394f970f8550332c4b607",
    "name": "Chat-REX-DK",
    "key": "efc960740f04f01",
    "queue_id": 120,
    "chat_title": "Hvad kan vi hj\u00e6lpe med?",
    "byeMsg": "",
    "dept_label": "",
    "name_label": "Dit navn (blank=anonym)",
    "name_default": "",
    "guest_label": "Guest",
    "contact_label": "Contact Info",
    "width": "100%",
    "height": "340",
    "chat_button": "Send sp\u00f8rgsm\u00e5l",
    "press_enter": "Press ENTER to send",
    "submit_button": "Send",
    "email_trans": "Mail chat",
    "offline_text": "",
    "offline_url": "",
    "slidebutton_url": "",
    "slidebutton_url_off": "",
    "slidebutton_text": "<font size=\"3\">Test: Chat med biblioteket<\/font>",
    "slidebutton_text_off": "Offline",
    "slidebutton_position": "l",
    "slidebutton_bcolor": "#000000",
    "slidebutton_color": "#FFFFFF",
    "slidebutton_bcolor_off": "#286090",
    "slidebutton_color_off": "#ffffff",
    "slidebutton_width": "34",
    "slidebutton_height": "300",
    "la_hide": false,
    "la_hide_msg": "",
    "la_hide_msg2": "",
    "la_search_opt": {
      "group_id": "0",
      "label": "",
      "button": "S\u00f8g",
      "placeholder": "Test: p.t. ingen ledig medarbejder - s\u00f8g i FAQ"
    },
    "la_search_box": "<div id=\"s-la-content-search-966\" class=\"s-la-content-search s-la-content\"><form method=\"get\" name=\"s-la-searchform\" id=\"s-la-searchform-966\" action=\"\" onsubmit=\"return false;\" target=\"_parent\" role=\"search\" aria-labelledby=\"s-la-content-search-query-966\"><div class=\"form-group\"><label for=\"s-la-content-search-query-966\" class=\"s-la-searchform-label control-label\"><\/label><input type=text id=s-la-content-search-query-0 class=\"s-la-content-search-query form-control\" name=\"q\" placeholder=\"Test: p.t. ingen ledig medarbejder - s\u00f8g i FAQ\" value=\"\" autocomplete=off \/><\/div><div class=\"form-group\"><button class=\"btn btn-sm btn-default s-la-searchform-button\" type=\"submit\" style=\"background-color: #000000; border-color: #000000; color: #FFFFFF;\">S\u00f8g<\/button><\/div><\/form><\/div>",
    "sound_on": "Sound is On (click to toggle)",
    "sound_off": "Sound is Off (click to toggle)",
    "star_text": "Bed\u00f8m denne chat:",
    "rate_1": "D\u00e5rlig",
    "rate_2": "Nogenlunde",
    "rate_3": "God",
    "rate_4": "Super",
    "trans": "Enter an email address to send this chat transcript to:",
    "error_sess": "Error starting session.",
    "error_send": "Error sending this message.",
    "left": " has left the chat",
    "typing": " is typing...",
    "joined": " has joined the chat",
    "initial_question": true,
    "initial_question_label": "Dit sp\u00f8rgsm\u00e5l",
    "comments_label": "Kommentarer?",
    "comments_button_text": "Send feedback",
    "comments_followup": "",
    "enable_anon": true,
    "enable_sound": false,
    "star_ratings": true,
    "file_uploads": true,
    "file_title": "Upload File",
    "file_intro": "Note: Maximum file size is 5MB. File is removed after one month, it is not kept permanently.",
    "file_label": "Attach a file",
    "file_action": "Upload",
    "cancel_button": "Cancel",
    "custom_css": "",
    "color_backg": "#f9f9f9",
    "color_head": "#000000",
    "color_btn": "#FFFFFF",
    "color_border": "",
    "user1": {
      "name": "click to edit",
      "id": 0,
      "show": 0,
      "required": 0,
      "type": "t",
      "val": ""
    },
    "user2": {
      "name": "click to edit",
      "id": 0,
      "show": 0,
      "required": 0,
      "type": "t",
      "val": ""
    },
    "user3": {
      "name": "click to edit",
      "id": 0,
      "show": 0,
      "required": 0,
      "type": "t",
      "val": ""
    },
    "error_off": "Sorry it doesn't appear any librarians are online... Please try again later.",
    "wait": "",
    "depart_id": [{
      "d": [650],
      "u": 0
    }],
    "widget_type": 3,
    "skip_login": false,
    "nologin_message": "Type your question in the box below and press Enter to start chatting.",
    "autoload_time": 0,
    "autoload_head": "Do you need help?",
    "autoload_text": "A librarian is online ready to help.",
    "autoload_yes": "Chat Now",
    "autoload_no": "No Thanks",
    "missedchat_time": "45",
    "missedchat_message": "Beklager ventetiden.",
    "missedchat_link": "Send os dit sp\u00f8rgsm\u00e5l med det samme",
    "error_message": "Problemer med netv\u00e6rksforbindelsen.",
    "error_link": "Send os dit sp\u00f8rgsm\u00e5l.",
    "away_message": "Chat is online but the operator is temporarily away. If you don't want to wait, you can submit your question for email follow-up.",
    "away_link": "Submit your question.",
    "reload_button": "Recheck Status",
    "valid_form_q": "Skriv dit sp\u00f8rgsm\u00e5l",
    "valid_form_n": "Please enter your name.",
    "valid_form_c": "Please enter valid contact information.",
    "fbwidget": false,
    "autopop": false,
    "contact_request": false,
    "contact_required": false,
    "contact_request_msg": "To help us be able to follow up with you, please enter an email address or sms number.",
    "followup_msg": "If you wish to be followed up with via email or phone, submit a message below to create a new support ticket.",
    "cal_offline": false,
    "cal_autoload": false,
    "cal_text": "Schedule a Meeting",
    "cal_url": "",
    "defaultProfile": "",
    "uid": 336,
    "base_domain": "region-eu.libanswers.com",
    "onlinerules": [{
      "d": [650],
      "u": 0
    }]
  };
  var cascadeServer = "https:\/\/cascade2-eu.libchat.com";
  var loaded = false;

  function checkStatus() {
    JSONP.init({
      error: function(ex) {
        console.log("Failed to load : " + ex.url), setStatus(!1)
      }
    }), JSONP.get(cascadeServer + "/widget_status", {
      iid: libchat_options.iid,
      rules: JSON.stringify(libchat_options.onlinerules)
    }, function(data) {
      var online = !1;
      (data.u || data.d) && (online = !0), setStatus(online)
    })
  }

  function insertWidgetCSS() {
    ("number" == typeof libchat_options.width || "string" == typeof libchat_options.width && -1 === libchat_options.width.indexOf("%")) && (libchat_options.width = parseInt(libchat_options.width, 10) + "px"), -1 !== libchat_options.width.indexOf("%") && (libchat_options.width = parseInt("400", 10) + "px");
    var offsetwidth = parseInt(libchat_options.width, 10) + 2 + "px";
    ("number" == typeof libchat_options.height || "string" == typeof libchat_options.height && -1 === libchat_options.height.indexOf("%")) && (libchat_options.height = parseInt(libchat_options.height, 10) + "px"), libchat_options.slidebutton_bcolor && "" !== libchat_options.slidebutton_bcolor || (libchat_options.slidebutton_bcolor = "transparent");
    var b_btn_offset = "-42px";
    libchat_options.slidebutton_url && "" !== libchat_options.slidebutton_url && libchat_options.slidebutton_height && "" !== libchat_options.slidebutton_height && (b_btn_offset = "-" + libchat_options.slidebutton_height + "px");
    var css = "/* LibChat Widget CSS */ .lcs_slide_out { width: " + libchat_options.width + "; height: " + libchat_options.height + "; position: fixed; -webkit-transition-duration: 0.6s; -moz-transition-duration: 0.6s; -o-transition-duration: 0.6s; transition-duration: 0.6s; background-color: rgb(249, 249, 249); border: 1px solid #ccc; z-index: 1000; } .lcs_slide_out header { display: block; } .lcs_slide_out header a { text-align: center; padding: 10px; display: block; position: absolute; border-width: 0; border-style: solid; background-color: " + libchat_options.slidebutton_bcolor + "; } .lcs_load { width: " + libchat_options.width + "; height: 100%; padding: 0 2px 0 0; box-sizing: border-box; } .lcs_slide_out-l { top: 100px; left: -" + offsetwidth + "; } .lcs_slide_out-l.open { left: 0px; } .lcs_slide_out-l header { -webkit-transform: rotate(-90deg); -ms-transform: rotate(-90deg); transform: rotate(-90deg); -webkit-transform-origin: top right; -ms-transform-origin: top right; transform-origin: top right; } .lcs_slide_out-l header a { right: 10px; } .lcs_slide_out-r { top: 100px; right: -" + offsetwidth + "; } .lcs_slide_out-r.open { right: 0px; } .lcs_slide_out-r header { -webkit-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg);  -webkit-transform-origin: top left; -ms-transform-origin: top left; transform-origin: top left; } .lcs_slide_out-r header a { left: 10px; } .lcs_slide_out-b { right: 100px; bottom: -2px; height: 0; } .lcs_slide_out-b.open { height: " + libchat_options.height + "; } .lcs_slide_out-b header a { left: 10px; bottom: 0px; border-width: 1px 1px 0px 1px; } .lcs_slide_out-b.open header a { top: " + b_btn_offset + "; bottom: auto; } .lcs_slide_out iframe { width: 100%; height: 100%; background-color: " + libchat_options.color_backg + "; border: 0px; box-sizing:border-box; } @media (max-width: 768px) { .lcs_slide_out { width: 80%; } .lcs_load { width: 100% } .lcs_slide_out-l { left: -80%; } .lcs_slide_out-r { right: -80%; } .lcs_slide_out-b { left: 0; } } ",
      head = document.head || document.getElementsByTagName("head")[0],
      style = document.createElement("style");
    style.type = "text/css", style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), head.appendChild(style)
  }

  function start() {
    if (!0 !== loaded) {
      loaded = !0, insertWidgetCSS(), chat_div = document.createElement("div"), chat_div.id = "lcs_slide_out-" + libchat_options.id, chat_div.className = "lcs_slide_out lcs_slide_out-" + libchat_options.slidebutton_position;
      var chat_header = document.createElement("header");
      if (chat_button = document.createElement("a"), chat_button.setAttribute("role", "button"), chat_button.setAttribute("aria-controls", "lcs_slide_out-" + libchat_options.id), chat_button.setAttribute("href", "#"), chat_header.appendChild(chat_button), chat_div.appendChild(chat_header), chat_load = document.createElement("div"), chat_load.className = "lcs_load", chat_load.setAttribute("aria-hidden", "true"), chat_div.appendChild(chat_load), libchat_options.slidebutton_url && "" !== libchat_options.slidebutton_url) {
        var img = document.createElement("img");
        img.setAttribute("src", libchat_options.slidebutton_url), img.setAttribute("alt", libchat_options.slidebutton_text), chat_button.style.padding = "0", chat_button.appendChild(img)
      } else libchat_options.slidebutton_color || (libchat_options.slidebutton_color = "#ffffff"), chat_button.innerHTML = libchat_options.slidebutton_text, chat_button.style.borderColor = libchat_options.slidebutton_color, chat_button.style.color = libchat_options.slidebutton_color, chat_button.style.backgroundColor = libchat_options.slidebutton_bcolor, chat_button.style.boxShadow = "rgb(204, 204, 204) 0px 0px 5px", "b" == libchat_options.slidebutton_position ? chat_button.style.borderWidth = "4px 4px 0px 4px" : chat_button.style.borderWidth = "0px 4px 4px 4px";
      document.body.appendChild(chat_div), chat_button.addEventListener("click", function(e) {
        e.preventDefault(), window.clearTimeout(chat_timer), -1 === chat_div.className.indexOf("open") ? (chat_div.className += " open", checkStatus()) : chat_div.className = chat_div.className.replace(/(^|\s)open(\s|$)/, "")
      }), libchat_options.autoload_time && parseInt(libchat_options.autoload_time, 10) > 0 && (chat_timer = window.setTimeout(function() {
        chat_self_triggered = !0, checkStatus()
      }, 1e3 * parseInt(libchat_options.autoload_time, 10)))
    }
  }

  function setStatus(online) {
    if (null === chat_load.querySelector("iframe"))
      if (qs = "https://" + libchat_options.base_domain + "/chati.php?", qs += "hash=" + libchat_options.hash, window.document.title && (qs += "&referer_title=" + encodeURIComponent(window.document.title)), !1 !== online || !0 !== chat_self_triggered) {
        !0 === chat_self_triggered && (chat_self_triggered = !1, qs += "&auto=true", chat_load.setAttribute("aria-live", "polite"), chat_load.setAttribute("aria-hidden", "false")), window.addEventListener("message", function(e) {
          var data = e.data;
          "object" == typeof data && data.action && ("closeWidget" === data.action ? (chat_div.className = chat_div.className.replace(/(^|\s)open(\s|$)/, ""), chat_load.removeAttribute("aria-live"), chat_load.setAttribute("aria-hidden", "true")) : "chatStarted" === data.action || "autopop" === data.action && -1 === chat_div.className.indexOf("open") && (chat_div.className += " open"))
        });
        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "iframe_" + libchat_options.hash), iframe.setAttribute("name", "iframe_" + libchat_options.hash), iframe.setAttribute("src", qs), iframe.setAttribute("title", "Chat Widget"), iframe.setAttribute("frameborder", 0), iframe.setAttribute("scrolling", "no"), chat_load.appendChild(iframe)
      } else chat_self_triggered = !1
  }
  var JSONP = function() {
    function load(url, pfnError) {
      var script = document.createElement("script"),
        done = !1;
      script.src = url, script.async = !0;
      var errorHandler = pfnError || config.error;
      "function" == typeof errorHandler && (script.onerror = function(ex) {
        errorHandler({
          url: url,
          event: ex
        })
      }), script.onload = script.onreadystatechange = function() {
        done || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (done = !0, script.onload = script.onreadystatechange = null, script && script.parentNode && script.parentNode.removeChild(script))
      }, head || (head = document.getElementsByTagName("head")[0]), head.appendChild(script)
    }

    function encode(str) {
      return encodeURIComponent(str)
    }

    function jsonp(url, params, callback, callbackName) {
      var key, query = -1 === (url || "").indexOf("?") ? "?" : "&",
        uniqueName = (callbackName = callbackName || config.callbackName || "callback") + "_json" + libchat_options.hash;
      params = params || {};
      for (key in params) params.hasOwnProperty(key) && (query += encode(key) + "=" + encode(params[key]) + "&");
      return window[uniqueName] = function(data) {
        callback(data);
        try {
          delete window[uniqueName]
        } catch (e) {}
        window[uniqueName] = null
      }, load(url + query + callbackName + "=" + uniqueName), uniqueName
    }

    function setDefaults(obj) {
      config = obj
    }
    var head, // Modified. -Murat
    // var head, window = this, 
      config = {};
    return {
      get: jsonp,
      init: setDefaults
    }
  }();
  "complete" === document.readyState || "interactive" === document.readyState ? start() : (document.addEventListener("DOMContentLoaded", start, !1), window.addEventListener("load", start, !1));
})();