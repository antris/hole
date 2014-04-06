/// <reference path="./jquery.d.ts" />
var holeTextInput = function ($container, opts) {
    var $inputElem = opts.$inputElem;
    var $labelElem = opts.$labelElem.addClass('holelib-minilabel');
    var value = Bacon.$.textFieldValue($inputElem);
    var showMiniLabel = function () {
        $labelElem.removeClass('holelib-minilabel-hidden');
    };
    var hideMiniLabel = function () {
        $labelElem.addClass('holelib-minilabel-hidden');
    };
    var required = $inputElem.prop('required');
    var originalLabelText = $labelElem.text();
    var labelText = required ? originalLabelText : originalLabelText + " (optional)";

    value.map(function (val) {
        return val.length > 0;
    }).onValue(function (hasContent) {
        hasContent ? showMiniLabel() : hideMiniLabel();
    });

    $labelElem.text(labelText);
    $inputElem.attr({ placeholder: labelText });
    return $container.append($labelElem, $inputElem);
};

var hole;
(function (hole) {
    function create(opts) {
        var $container = $('<div>').addClass('holelib-container');
        var $inputElem = opts.$inputElem;
        var $labelElem = opts.$labelElem;
        $inputElem.addClass('holelib-input');
        $labelElem.addClass('holelib-label');
        switch (opts.type) {
            case 'text':
            case 'tel':
            case 'email':
            default:
                return holeTextInput($container, opts);
                break;
        }
    }
    hole.create = create;
})(hole || (hole = {}));
