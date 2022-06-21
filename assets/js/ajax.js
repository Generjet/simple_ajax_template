// $('#navbar-nav a.collapsed').on('click', function (e) {
//     e.stopPropagation();
// });

var menuLinks = document.querySelectorAll("#navbar-nav li a");

menuLinks.forEach( function(ele, i){
	ele.addEventListener("click", function(e){
		e.preventDefault()

		var page = e.target.getAttribute("href");
		var target = e.target.getAttribute("target");

		if(!page && e.target.parentElement instanceof HTMLAnchorElement) {
			page = e.target.parentElement.getAttribute("href");
			target = e.target.parentElement.getAttribute("href");
		}

		if (page.indexOf('.html') === -1) {
			return false;
		}

		if (target == "_self") {window.location.href= page; return true};

		if (target == "_blank") window.open(page, "_blank");

		if (page == "javascript: void(0);") return false;

		$("#navbar-nav li, #navbar-nav li a").removeClass("active");
		$("#navbar-nav li a").attr("aria-expanded", "false");

        if (page) {
			// navbar-nav
            var a = document.getElementById("navbar-nav").querySelector('[href="' + page + '"]');

            if (a) {
				
                a.classList.add("active");
                var parentCollapseDiv = a.closest('.collapse.menu-dropdown');

                if (parentCollapseDiv) {
                    parentCollapseDiv.classList.add("show");
                    parentCollapseDiv.parentElement.children[0].classList.add("active");
                    parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
                    if (parentCollapseDiv.parentElement.closest('.collapse.menu-dropdown')) {
                        parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
                        if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
                            parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
                    }
                }
            }
        }

		if (page == "javascript: void(0);") return false;
		call_ajax_page(page);
	});
})


function call_ajax_page(page) {

	if(page === "index.html")
	{
		document.title = "Dashboard |  Velzon - Responsive Bootstrap 5 Admin Dashboard";
	}
	else
	{
		var title = page.replace(".html", "");
		var title1 = title.replace("-", " ");
		document.title = title1.charAt(0).toUpperCase() + title1.slice(1) + " | Velzon - Responsive Bootstrap 5 Admin Dashboard";
	}
	
	$.ajax({
		url: "ajax/" + page,
		cache: false,
		dataType: "html",
		type: "GET",
		success: function(data) {
			window.location.hash = page;
			// console.log(window.location.hash);
			$("#ajaxresult").empty();
			$("#ajaxresult").html(data);
			$(window).scrollTop(0);
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	 var path = window.location.hash.substr(1);
	if (path == "index.html") {
		call_ajax_page("index.html");
	} else {
		call_ajax_page("index.html");
	}
});

window.onhashchange = function() {
 	var hash = window.location.hash;
	//  console.log(window.location.hash);
 	if(hash) {
 		hash = hash.replace("#", '');
		if($('#navbar-nav a[href="' + hash + '"]').length > 0) {
			$('#navbar-nav a[href="' + hash + '"]')[0].click();
		}
 	}
}