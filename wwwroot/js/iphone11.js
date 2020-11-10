$(function () {

    //// Get SVG content
    ////var svgObject = $('#svgTemplate object');
    ////var svg = svgObject[0].contentDocument;
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

    //$(window).resize(function () {
    //    $(".show-pp").css('display', 'block');
    //    $('.hide-pp').remove();
    //});

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
        $(svg).find('.cls-12, .cls-19, .cls-26').css('fill', event.color.toString());
    });


    $('#colorPicker2').on('colorpickerChange', function (event) {
        $(svg).find('.cls-6').css('fill', event.color.toString());

        var numberOfItems = 10;
        var rainbow = new Rainbow();
        rainbow.setNumberRange(1, numberOfItems);
        var hex = RGBToHex(event.color.toString());
        rainbow.setSpectrum('lightgray', hex);
        var s = '';
        var colors = [];
        for (var i = 1; i <= numberOfItems; i++) {
            var hexColor = rainbow.colourAt(i);
            s = '#' + hexColor;
            colors.push(s);
        }

        $(svg).find('#Dégradé_sans_nom_4 stop').eq(0).attr('stop-color', getTintedColor(colors[2].substring(1), 3));
        $(svg).find('#Dégradé_sans_nom_4 stop').eq(1).attr('stop-color', getTintedColor(colors[3].substring(1), 3));
        $(svg).find('#Dégradé_sans_nom_4 stop').eq(2).attr('stop-color', getTintedColor(colors[4].substring(1), 3));
        $(svg).find('#Dégradé_sans_nom_4 stop').eq(3).attr('stop-color', getTintedColor(colors[5].substring(1), 3));

        $(svg).find('.cls-54').css('fill', getTintedColor(colors[4].substring(1), 3));
        $(svg).find('.cls-55').css('opacity', '0.8');
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

    /* /////////////////////////////////////
            PROFILE PICTURE SECTION
    */

    $('#profile').on('change', function () {
        readURL(this, $(svg).find('.cls-8 image'));
    });

    /* /////////////////////////
            JOB SECTION
    */
    var job1Selector = $(svg).find('#TitleBox text:nth-child(1)');
    var pointSelector = $(svg).find('#TitleBox text:nth-child(2)');
    var job2Selector = $(svg).find('#TitleBox text:nth-child(3)');

    function moveJob1() {
        $(job1Selector).attr('transform', 'matrix(-0.23, 0.64, -0.94, -0.34, 0, 0)');
        $(job1Selector).attr('x', '410');
        $(job1Selector).attr('y', '-1126');
    }

    function getPosition(selector) {
        return $(selector)[0].getBBox();
    }

    function movePoint(xPositionJob1, widthJob1) {
        if ($(job1Selector).text().length > 0) {
            $(pointSelector).css('visibility', 'visible');
            $(pointSelector).attr('transform', 'matrix(-0.23, 0.64, -0.52, -0.19, 0, 0)');
            $(pointSelector).attr('x', xPositionJob1 + widthJob1);
            $(pointSelector).attr('y', '-2025');
        }
        else {
            $(pointSelector).css('visibility', 'visible');
            $(pointSelector).attr('transform', 'matrix(-0.23, 0.64, -0.94, -0.34, 0, 0)');
            $(pointSelector).attr('x', '410');
            $(pointSelector).attr('y', '-2025');
        }
    }

    function moveJob2(xPositionPoint, widthPoint) {
        $(job2Selector).css('visibility', 'visible');
        $(job2Selector).attr('transform', 'matrix(-0.23, 0.64, -0.94, -0.34, 0, 0)');
        $(job2Selector).attr('x', xPositionPoint + widthPoint + 10);
        $(job2Selector).attr('y', '-1126');
    }

    moveJob1();
    $(job1Selector).text("DEVELOPPEUSE");
    $(job2Selector).text("GRAPHISTE");
    movePoint(getPosition(job1Selector).x, getPosition(job1Selector).width);
    moveJob2(getPosition(pointSelector).x, getPosition(pointSelector).width);

    $('#job1, #job2').on('input', function () {

        $(job1Selector).text($('#job1').val().toUpperCase());
        if (($('#job1').val().length === 0)) {
            $(pointSelector).attr('x', '410');
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
    var nameSelector = $(svg).find('#Name');
    var nameContainer = $(svg).find('#Container');

    $(nameSelector).text('AUDREY REDONDO');
    $(nameSelector).attr('transform', 'matrix(0.61, 0.22, -0.34, 0.94, ' + 0 + ', ' + 0 + ')');
    $(nameSelector).attr('x', 2215);
    $(nameSelector).attr('y', 250);
    $(nameSelector).attr("width", 281.9375);
    $(nameSelector).attr('alignment-baseline', 'middle');
    $(nameSelector).attr('text-anchor', 'start');

    function increaseContainer(nameWidth, length) {

        var increase = getPosition(nameSelector).width - nameWidth;

        if (increase === 0) {
            if (length < $(nameSelector).text().length || getPosition(nameSelector).width + increase + 20 < 0) {
                increase = 14;
            }
            else {
                increase = -14;
            }
        }
        else {
            if ($('#name').val().length === 1) {
                increase = 28
                $(nameSelector).attr('x', 2470)
                $(nameContainer).attr("y", 820);
                $(nameContainer).attr("height", increase);
            }
            else {
                $(nameSelector).attr('x', getPosition(nameSelector).x - increase - (increase/6));
                $(nameContainer).attr("y", getPosition(nameContainer).y - increase);
                if (getPosition(nameSelector).width + increase > 0) {
                    $(nameContainer).attr("height", getPosition(nameSelector).width + increase);
                }
                else {
                    $(nameContainer).attr("height", getPosition(nameSelector).width);
                }
            }
            $(nameSelector).attr('y', 250);
        }
    }

    $('#name').on('input', function () {
        var length = $(nameSelector).text().length;
        var nameWidth = getPosition(nameSelector).width;
        $(nameSelector).text($('#name').val().toUpperCase());
        increaseContainer(nameWidth, length);
    });


    /* //////////////////////////////
            PRODUCTIONS SECTION
    */

    var quantitySelector = $(svg).find('#Quantity');
    var definitionSelector = $(svg).find('#Definition');

    $('#picture1').on('change', function () {
        readURL(this, $(svg).find('.cls-22 image'));
    });

    $('#picture2').on('change', function () {
        readURL(this, $(svg).find('.cls-23 image'));
    });
    $('#picture3').on('change', function () {
        readURL(this, $(svg).find('.cls-24 image'));
    });

    $('#quantity').on('input', function (event) {
        $(quantitySelector).attr('transform', 'matrix(0.86, 0.31, -0.34, 0.94, ' + 0 + ', ' + 0 + ')');
        $(quantitySelector).attr('x', '79.8%');
        $(quantitySelector).attr('y', '24.7%');
        $(quantitySelector).attr('alignment-baseline', 'middle');
        $(quantitySelector).attr('text-anchor', 'middle');
        $(quantitySelector).text($(event.currentTarget).val() + '+');
    });
    $('#productions').on('change, keyup', function (event) {
        $(definitionSelector).attr('transform', 'matrix(0.86, 0.31, -0.34, 0.94, ' + 0 + ', ' + 0 + ')');
        $(definitionSelector).attr('x', '79.6%');
        $(definitionSelector).attr('y', '26.8%');
        $(definitionSelector).attr('alignment-baseline', 'middle');
        $(definitionSelector).attr('text-anchor', 'middle');
        $(definitionSelector).text($(event.currentTarget).val());
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


    /* /////////////////////////
            LOGO SECTION
    */
    var companySelector = $(svg).find('#Company text:nth-child(1)');
    var sloganSelector = $(svg).find('#Company text:nth-child(2)');
    var lineSelector = $(svg).find('.cls-84');
    var logoSelector = $(svg).find('#Logo image');

    $(companySelector).attr('transform', 'translate(0 0) rotate(-10.73) scale(0.75 1)');
    $(companySelector).attr('x', 520);
    $(companySelector).attr('y', 955);
    $(companySelector).attr('alignment-baseline', 'middle');
    $(companySelector).attr('text-anchor', 'middle');
    $(companySelector).text('PERFORMANCE PRÉCISION');

    $(sloganSelector).attr('transform', 'matrix(0.72, -0.14, 0.19, 0.98, 0, 0)');
    $(sloganSelector).attr('x', 525);
    $(sloganSelector).attr('y', 985);
    $(sloganSelector).attr('alignment-baseline', 'middle');
    $(sloganSelector).attr('text-anchor', 'middle');
    $(sloganSelector).text('Votre partenaire réussite');

    $(lineSelector).css('fill', 'transparent');

    $(logoSelector).attr('width', '260');
    $(logoSelector).attr('height', '260');
    $(logoSelector).attr('x', getPosition(logoSelector).x - 20);

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