(function(globals) {
  
  // AJAX
  
  function ajax_init() {
    var xmlhttp = null;
    if(window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      // code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    } else {
      alert("Your browser does not support XMLHTTP!");
    }
    return xmlhttp;
  }
  
  var ajax_pool = [];
  
  function get_ajax_client() {
    if(ajax_pool.length < 1) { 
      console.log("increasing ajax pool");
      for(var i=0; i<10; i++) {
        ajax_pool.push(ajax_init());
      }
    }
    return ajax_pool.shift();
  }
  
  function release_ajax_client(client) {
    ajax_pool.push(client);
  }
  
	function ajax_mtime(url, cb) {
	  var xmlhttp = get_ajax_client();
	  xmlhttp.onreadystatechange = function() {
	    if (this.readyState === 4 && this.status === 200) {
	      var mtime = new Date(this.getResponseHeader('Last-Modified'));
	      if(mtime.toString() === 'Invalid Date') {
	        cb();
	      } else {
	        cb(mtime);
	      }
	    }
      release_ajax_client(this);
	  }
		xmlhttp.open("HEAD", url, true);
	  xmlhttp.send();
	};

  // refresh everything on changed modified time of content
  
  var known_mtime = null;

  function get_mtime() {
    ajax_mtime("content/index.html?"+Math.random(), function(mtime) {
			mtime = mtime.toISOString();
      if(known_mtime == null) {
        console.log("current mtime", mtime);
        known_mtime = mtime;
      } else {
        if(known_mtime != mtime) {
          console.log("new mtime", mtime);
	        known_mtime = mtime;
          document.getElementById("content").contentWindow.location.reload(true);
        }
      }
    });
  }
  
  setInterval( get_mtime, 1000 );
  
})(window)
