$(function () {

    // Get SVG content
    //var svgObject = $('#svgTemplate object');
    //var svg = svgObject[0].contentDocument;
    var svg = $('#svgTemplate svg')

    $('.carousel').carousel({
        pause: true,
        interval: false
    });

    if ($('.lg-block').css('display') === "none") {
        $('.lg-block').remove();
    }
    else {
        $('.md-sm-block').remove();
        $('.md-sm-flex').remove();
        $('.md-sm-active-block').remove();
    }

    function RGBToHex(rgb) {
        let sep = rgb.indexOf(",") > -1 ? "," : " ";
        rgb = rgb.substr(4).split(")")[0].split(sep);

        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    }

    function getTintedColor(color, v) {
        if (color.length > 6) { color = color.substring(1, color.length) }
        var rgb = parseInt(color, 16);
        var r = Math.abs(((rgb >> 16) & 0xFF) + v); if (r > 255) r = r - (r - 255);
        var g = Math.abs(((rgb >> 8) & 0xFF) + v); if (g > 255) g = g - (g - 255);
        var b = Math.abs((rgb & 0xFF) + v); if (b > 255) b = b - (b - 255);
        r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16);
        if (r.length == 1) r = '0' + r;
        g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16);
        if (g.length == 1) g = '0' + g;
        b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16);
        if (b.length == 1) b = '0' + b;
        return "#" + r + g + b;
    }

    var primaryColor = null;
    var secondaryColor = null;

    $('#colorPicker1, #colorPicker2').colorpicker({
        inline: true,
        container: true,
        format: null,
        customClass: 'colorpicker-2x',
        sliders: {
            saturation: {
                maxLeft: 200,
                maxTop: 200
            },
            hue: {
                maxTop: 200
            },
            alpha: {
                maxTop: 200
            }
        }
    });

    $('#colorPicker1').on('colorpickerChange', function (event) {
        primaryColor = event.color.toString();
        $(svg).find('.cls-35').css('fill', event.color.toString());
    });

    $('#colorPicker2').on('colorpickerChange', function (event) {
        secondaryColor = event.color.toString();
        $(svg).find('.cls-32').css('fill', event.color.toString());
    });

    $('#colorPicker1, #colorPicker2').on('colorpickerChange', function () {
        if (primaryColor !== null) {
            $(svg).find('#Dégradé_sans_nom_14 stop').eq(0).attr('stop-color', primaryColor);
            $(svg).find('#Dégradé_sans_nom_19 stop, #Dégradé_sans_nom_19-2 stop, #Dégradé_sans_nom_19-3 stop, #Dégradé_sans_nom_19-4 stop, #Dégradé_sans_nom_19-5 stop').eq(0).attr('stop-color', primaryColor);
        }
        if (secondaryColor !== null) {
            $(svg).find('#Dégradé_sans_nom_14 stop').eq(1).attr('stop-color', secondaryColor);
            $(svg).find('#Dégradé_sans_nom_19 stop, #Dégradé_sans_nom_19-2 stop, #Dégradé_sans_nom_19-3 stop, #Dégradé_sans_nom_19-4 stop, #Dégradé_sans_nom_19-5 stop').eq(1).attr('stop-color', secondaryColor);
        }
    });

    function readURL(input, preview) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(preview).attr('xlink:href', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    /* /////////////////////////
            JOB SECTION
    */
    var job1Selector = $(svg).find('#Job1');
    var pointSelector = $(svg).find('#Point');
    var job2Selector = $(svg).find('#Job2');

    function moveJob1() {
        //transform = "translate(1137.23 739.02) rotate(18.05) scale(0.56 1)"
        $(job1Selector).attr('transform', 'translate(0 0) rotate(18.05) scale(0.56 1)');
        //$(job1Selector).attr('transform', 'matrix(0.62, 0.2, -0.31, 0.95, 0, 0)');
        $(job1Selector).attr('x', '2069');
        $(job1Selector).attr('y', '349');
    }

    function getPosition(selector) {
        return $(selector)[0].getBBox();
    }

    function movePoint(xPositionJob1, widthJob1) {
        $(pointSelector).css('visibility', 'visible');
        $(pointSelector).attr('transform', 'translate(0 0) rotate(18.05) scale(0.56 1)');
        //$(pointSelector).attr('transform', 'matrix(0.62, 0.2, -0.31, 0.95, 0, 0)');
        $(pointSelector).attr('y', '362');
        if ($(job1Selector).text().length > 0) {
            $(pointSelector).attr('x', xPositionJob1 + widthJob1 + 3);
        }
        else {
            $(pointSelector).attr('x', '2069');
        }
    }

    function moveJob2(xPositionPoint, widthPoint) {
        $(job2Selector).css('visibility', 'visible');
        $(job2Selector).attr('transform', 'translate(0 0) rotate(18.05) scale(0.56 1)');
        //$(job2Selector).attr('transform', 'matrix(0.62, 0.2, -0.31, 0.95, 0, 0)');
        $(job2Selector).attr('x', xPositionPoint + widthPoint + 3);
        $(job2Selector).attr('y', '349');
    }

    moveJob1();
    $(job1Selector).text("DÉVELOPPEUSE");
    $(job2Selector).text("GRAPHISTE");
    movePoint(getPosition(job1Selector).x, getPosition(job1Selector).width);
    moveJob2(getPosition(pointSelector).x, getPosition(pointSelector).width);

    $('#job1, #job2').on('input', function () {

        $(job1Selector).text($('#job1').val().toUpperCase());
        if (($('#job1').val().length === 0)) {
            $(pointSelector).attr('x', '2069');
        }
        else {
            movePoint(getPosition(job1Selector).x, getPosition(job1Selector).width);
        }
        moveJob2(getPosition(pointSelector).x, getPosition(pointSelector).width);

        if ($('#job2').val().length === 0) {
            $(pointSelector).css('visibility', 'hidden');
            $(job2Selector).text('');
        }
        else {
            $(pointSelector).css('visibility', 'visible');
            $(job2Selector).text($('#job2').val().toUpperCase());
        }
    });

    /* /////////////////////////
            NAME SECTION
    */

    $(svg).find('#Name').attr('transform', 'matrix(0.76, 0.25, -0.31, 0.95, 1008, 647)');

    $('#name').on('input', function (event) {
        $(svg).find('#Name').text($(event.currentTarget).val().toUpperCase());
    });

    /* //////////////////////////////
            CONTACT SECTION
    */

    $('#city').on('input', function (event) {
        $(svg).find('#City').text($(event.currentTarget).val());
    });
    $('#numberPhone').on('input', function (event) {
        $(svg).find('#NumberPhone').text($(event.currentTarget).val());
    });
    $('#email').on('input', function (event) {
        $(svg).find('#Email').text($(event.currentTarget).val());
    });
    $('#website').on('input', function (event) {
        $(svg).find('#Website').text($(event.currentTarget).val());
    });
    $('#facebook').on('input', function (event) {
        $(svg).find('#Facebook').text($(event.currentTarget).val());
    });

    /* /////////////////////////
            LOGO SECTION
    */
    var companySelector = $(svg).find('#Company text:nth-child(1)');
    var sloganSelector = $(svg).find('#Company text:nth-child(2)');
    var lineSelector = $(svg).find('.cls-84');
    var logoSelector = $(svg).find('#Logo image');

    $(companySelector).attr('transform', 'translate(485.46 941.07) rotate(-21.26)');
    $(companySelector).attr('x', 115);
    $(companySelector).attr('y', -140);
    $(companySelector).attr('alignment-baseline', 'middle');
    $(companySelector).attr('text-anchor', 'middle');
    $(companySelector).text('PERFORMANCE PRÉCISION');

    $(sloganSelector).attr('transform', 'translate(542.56 944.65) rotate(-21.26) scale(0.96 1)');
    $(sloganSelector).attr('x', 63);
    $(sloganSelector).attr('y', -130);
    $(sloganSelector).attr('alignment-baseline', 'middle');
    $(sloganSelector).attr('text-anchor', 'middle');
    $(sloganSelector).text('Votre partenaire réussite');

    $(lineSelector).css('fill', 'transparent');

    $('#logo').on('change', function () {
        readURL(this, logoSelector);
    });

    $('#slogan').on('input', function (event) {
        $(sloganSelector).text($(event.currentTarget).val());
    });

    $('#company').on('input', function (event) {
        $(companySelector).text($(event.currentTarget).val());
    });

});