(function($) {

    var	$window = $(window),
        $body = $('body'),
        $wrapper = $('#wrapper');

    // Breakpoints.
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ null,      '480px'  ]
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
            startCLITyping(); // Start CLI animation
        }, 100);
    });

    // Hacky fix for IE flexbox min-height bug.
    if (browser.name == 'ie') {
        var $main = $('.main.fullscreen'),
            IEResizeTimeout;

        $window.on('resize.overflow_fixer', function() {

            clearTimeout(IEResizeTimeout);

            IEResizeTimeout = setTimeout(function() {

                var wh = $window.height();

                $main.each(function() {

                    var $this = $(this);

                    $this.css('height', '');

                    if ($this.height() <= wh)
                        $this.css('height', (wh - 1) + 'px');

                });

            });

        }).trigger('resize.overflow_fixer');
    }

    // Nav.
    var $nav = $('#nav');

    if ($nav.length > 0) {

        var $nav_a = $nav.find('a');

        $nav_a
            .addClass('scrolly')
            .on('click', function() {

                var $this = $(this);

                // External link? Bail.
                if ($this.attr('href').charAt(0) != '#')
                    return;

                // Deactivate all links.
                $nav_a.removeClass('active');

                // Activate link and lock it.
                $this
                    .addClass('active')
                    .addClass('active-locked');

            })
            .each(function() {

                var	$this = $(this),
                    id = $this.attr('href'),
                    $section = $(id);

                // No section for this link? Bail.
                if ($section.length < 1)
                    return;

                // Scrollex.
                $section.scrollex({
                    mode: 'middle',
                    initialize: function() {

                        // Deactivate section.
                        if (browser.canUse('transition'))
                            $section.addClass('inactive');

                    },
                    enter: function() {

                        // Activate section.
                        $section.removeClass('inactive');

                        // No locked links? Deactivate all links and activate this section's one.
                        if ($nav_a.filter('.active-locked').length == 0) {

                            $nav_a.removeClass('active');
                            $this.addClass('active');

                        }

                        // Otherwise, if this section's link is locked, unlock it.
                        else if ($this.hasClass('active-locked'))
                            $this.removeClass('active-locked');

                    }
                });

            });

    }

    // Scrolly.
    $('.scrolly').scrolly();

    // CLI Animation Function
    function startCLITyping() {
        const cliOutput = document.getElementById("cli-output");
        if (!cliOutput) return; // Prevent errors if element doesn't exist

        const hackerText = [
            "root@vikramsec:~$ nmap -A -T4 vikramsec.com",
            "[*] Scanning target: vikramsec.com...",
            "[+] Open ports found: 80, 443, 22",
            "[*] Enumerating vulnerabilities...",
            "[+] Possible exploit: CVE-2024-XXXX",
            "root@vikramsec:~$ exploit -target vikramsec.com",
            "[*] Exploiting...",
            "[+] System breached successfully!",
            "root@vikramsec:~$ logout"
        ];

        let index = 0;
        let lineIndex = 0;

        function typeLine() {
            if (index < hackerText[lineIndex].length) {
                cliOutput.innerHTML += hackerText[lineIndex][index];
                index++;
                setTimeout(typeLine, 20); // Typing speed
            } else {
                cliOutput.innerHTML += "<br>";
                lineIndex++;
                index = 0;
                if (lineIndex < hackerText.length) {
                    setTimeout(typeLine, 200); // Delay before next line
                }
            }
        }

        // Start typing animation
        cliOutput.innerHTML = ""; // Clear previous text
        typeLine();
    }

})(jQuery);


document.addEventListener("DOMContentLoaded", function () {
    const cliOutput = document.getElementById("cli-output");
    const lines = [
        "Initializing...",
        "Connecting to VikramSec...",
        "Authentication Successful.",
        "Loading assets...",
        "Welcome, Operator."
    ];
    
    let index = 0;
    function typeLine() {
        if (index < lines.length) {
            cliOutput.innerHTML += lines[index] + "\n";
            index++;
            setTimeout(typeLine, 500); // Adjust speed if needed
        }
    }

    typeLine();
});
