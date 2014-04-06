/// <reference path="./jquery.d.ts" />

var hole;
(function (hole) {
    var addOptionalTextToLabel = function ($inputElem, $labelElem) {
        var required = $inputElem.prop('required');
        var originalLabelText = $labelElem.text();
        var labelText = required ? originalLabelText : originalLabelText + " (optional)";
        $labelElem.text(labelText);
        $inputElem.attr({ placeholder: labelText });
    };

    var addClassToMiniLabelWhenFocused = function ($inputElem, $labelElem) {
        var isFocused = $inputElem.focusE().map(true).merge($inputElem.blurE().map(false));
        isFocused.onValue(function (isFocused) {
            $labelElem.toggleClass('holelib-minilabel-focused', isFocused);
        });
    };

    var hideMiniLabelWhenValueIsEmpty = function ($inputElem, $labelElem) {
        var isEmpty = Bacon.$.textFieldValue($inputElem).map(function (val) {
            return val.length == 0;
        });
        isEmpty.onValue(function (fieldIsEmpty) {
            $labelElem.toggleClass('holelib-minilabel-hidden', fieldIsEmpty);
        });
    };

    var holeTextInput = function ($container, opts) {
        var $inputElem = opts.$inputElem;
        var $labelElem = opts.$labelElem.addClass('holelib-minilabel');

        addOptionalTextToLabel($inputElem, $labelElem);
        addClassToMiniLabelWhenFocused($inputElem, $labelElem);
        hideMiniLabelWhenValueIsEmpty($inputElem, $labelElem);

        return $container.append($labelElem, $inputElem);
    };

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
