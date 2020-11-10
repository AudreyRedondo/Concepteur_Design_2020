$(function () {
    
    $(window).on({
        load: function () {
            $("#containerTemplate").removeClass("loading");
        }
    });
    
    /* /////////////////////////////////////
            MODAL TEMPLATES SECTION
    */

    function StartLoading(selector) {
        $(selector).addClass("loading");
    }
    function StopLoading(selector) {
        $(selector).removeClass("loading");
    }
    function CloseModal() {
        placeholderElement.find('.modal').modal('hide');
        placeholderElement.empty();
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    var placeholderElement = $('#modal-placeholder');
    var selectedTemplate = '1';
    
    // Open and set current template
    $('button[data-toggle="modal"]').click(function (event) {
        var url = $(this).data('url');
        $.get(url).done(function (data) {

            placeholderElement.html(data);

            var radios = $(':radio');
            radios.each(function () {
                if ($(this).val() === selectedTemplate) {
                    $(this).attr('checked', true);
                }
                else {
                    $(this).attr('checked', false);
                }
            })

            var templateId = $('input[name=template]:checked', '#templates').val();
            $('#templates').data('id', templateId);

            placeholderElement.find('.modal').modal('show');
            $('body').removeAttr('style');
        });
    });

    // Select a template & Update route id
    $(document).on('click', '#templates .card-template', 'click', function (event) {
        var template = event.currentTarget;
        var radio = $(template).children('input[name=template]');
        if (radio.length > 0) {
            var radios = $(':radio');
            radios.each(function () {
                $(this).attr('checked', false);
            })
            $(radio).attr('checked', true);
            $('#templates').data('id', $(radio).val());
        }
    });

    // Update partial views
    placeholderElement.on('click', '[data-save="modal"]', function (event) {

        event.preventDefault();

        var previousSelectedTemplate = selectedTemplate;
        var form = $(this).parents('.modal').find('form');
        if (form.data('id') !== selectedTemplate) {
            selectedTemplate = form.data('id');
        }

        var actionUrl = form.attr('action');
        var dataToSend = form.serialize();
        var name = $('input[name=template]:checked', '#templates').next('input').val();

        if (previousSelectedTemplate === selectedTemplate) {
            selectedTemplate = previousSelectedTemplate;
            placeholderElement.find('.modal').modal('hide');
            placeholderElement.empty();
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
        else {

            $.post(actionUrl + '/' + form.data('id'), dataToSend).done(function (data) {

                var id = form.data('id');
                StartLoading("#containerTemplate");

                // if more than one template exists
                var templateForm = $('#formTemplate');
                var TemplateFormUrl = templateForm.data('url');
                var templateSvg = $('#svgTemplate');
                var TemplateSvgUrl = templateSvg.data('url');

                // load template form
                $.get(TemplateFormUrl + '/' + id).done(function (form) {
                    templateForm.children('form').replaceWith(form);
                });

                // load template svg and scripts
                $.get(TemplateSvgUrl + '/' + id).done(function (svg) {
                    templateSvg.children('svg').replaceWith(svg);
                    $.getScript('../../js/' + name.toLowerCase().replace(" ", "") + '.js');
                    //$.getScript('../../js/' + name.toLowerCase().replace(" ", "") + '.js').done(function (scripts) {
                    //    $('script').remove('#scriptsTemplate');
                    //    $('<script></' + 'script>').appendTo(document.body);
                    //    $('script:last').attr('id', 'scriptsTemplate');
                    //    $('script:last').attr('type', 'text/javascript');
                    //    $('script:last').html(scripts);
                    //});
                   StopLoading("#containerTemplate");
                });
                CloseModal();
            })
        }
    });

    // Close modal
    $(document).on('click', 'button[data-dismiss="modal"]', 'click', function () {
        CloseModal();
    });
});