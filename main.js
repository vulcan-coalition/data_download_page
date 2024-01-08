(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } 
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 80
            }, 500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });

    //dowload bar
    function startDownload() {
        var elem = document.getElementById("progressBar"); 
        var width = 1;
        var id = setInterval(frame, 100);
    
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++; 
                elem.style.width = width + '%'; 
            }
        }
    }

    // Function to open a specific tab
    function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    async function loadJsonData(jsonFilePath, containerId) {
        try {
            const response = await fetch(jsonFilePath);
            const data = await response.json();
    
            createDownloadList(data, containerId);
        } catch (error) {
            console.error('Error fetching or parsing JSON:', error);
        }
    }
    
    function createDownloadList(data, containerId) {
        const fileListContainer = document.getElementById(containerId);
    
        data.forEach(item => {
            const downloadItem = document.createElement('div');
            downloadItem.className = 'download-item';
    
            const anchor = document.createElement('a');
            anchor.href = item["Public URL"];
            anchor.textContent = item["Filename"];
            anchor.target = "_blank"; // Open in new tab
    
            downloadItem.appendChild(anchor);
            fileListContainer.appendChild(downloadItem);
        });
    }
    
    // Usage example for each JSON file and container ID
    loadJsonData('./img/file_upload_linkL1.json', 'fileListTab1');
    loadJsonData('./img/file_upload_linkL1.json', 'fileListTab2');
    loadJsonData('./img/file_upload_linkL1.json', 'fileListTab3');
    

    
    
    
  
    
    
    

})(jQuery);

