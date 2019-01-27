<div class="cookie-policy-container">
    We use cookies to enable website functionality, understand the performance of our site, provide social media features, and serve more relevant content to you. We may also place cookies on our and our partners’ behalf to help us deliver more targeted ads and assess the performance of these campaigns. You may review our Privacy Policy <a href="/privacy-policy">here</a> and our Cookies Policy <a href="/cookie-policy">here</a>.
    <span id="cookie-close-button">
    X
    </span>
</div>
<script>
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    $("#cookie-close-button").on("click", function() {
        $(".cookie-policy-container").hide();
        setCookie('cookie-policy', 'read', 15);
    });

    if(getCookie('cookie-policy') !== 'read') {
        $(".cookie-policy-container").show();
    }
</script>

