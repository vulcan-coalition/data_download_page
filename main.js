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
                scrollTop: $(this.hash).offset().top - 40
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
    function startDownload(url, buttonId, fileName) {
        const downloadButton = document.getElementById(buttonId);
    
        window.open(url, '_blank');
        localStorage.setItem(fileName, 'downloaded');
        downloadButton.src = './img/check.png'; 
    }
    
    

    // Function to open a specific tab
    function openTab(evt, tabName) {
        // Get all elements with class="tabcontent" and hide them
        var tabcontent = document.getElementsByClassName("tabcontent");
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    
        // Get all elements with class="tablinks" and remove the class "active"
        var tablinks = document.getElementsByClassName("tablinks");
        for (var i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    $('.tablinks').click(function(event) {
        var tabName = $(this).text(); // Assuming tabName is the button text
        openTab(event, tabName);
    });
    
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
    
        data.forEach((item, index) => {
            const downloadItem = document.createElement('div');
            downloadItem.className = 'download-item';
    
            const anchor = document.createElement('a');
            anchor.href = item["Public URL"];
    
            // File size formatting (MB or GB)
            let fileSize = parseFloat(item["Size"]);
            let formattedSize = fileSize >= 1024 ? (fileSize / 1024).toFixed(2).toLocaleString() + " GB" : fileSize.toLocaleString() + " MB";
            anchor.textContent = item["Filename"] + " - Size: " + formattedSize;
    
            // Image button creation
            const imgButton = document.createElement('img');
            imgButton.src = './img/download.png'
            imgButton.className = 'download-button';
            imgButton.id = 'button-' + index;
            imgButton.style.width = '5 px';  // Set the width
            imgButton.style.height = '5 px';
    
            // Update the button on click and start the download
            imgButton.addEventListener('click', (e) => {
                e.preventDefault();
                startDownload(anchor.href, imgButton.id, item["Filename"]);
            });
    
            // Append elements to the download item and container
            downloadItem.appendChild(anchor);
            downloadItem.appendChild(imgButton);
            fileListContainer.appendChild(downloadItem);
            if (localStorage.getItem(item["Filename"]) === 'downloaded') {
                imgButton.src = './img/check.png' 
            }
        });
    }
    

    

    // Usage example for each JSON file and container ID
    loadJsonData('./img/file_upload_linkl.json', "fileListLarge");
    loadJsonData('./img/file_upload_linkm.json', "fileListMedium");
    loadJsonData('./img/file_upload_links.json', "fileListSmall");


    

    
    
    
  
    
    
    

})(jQuery);

