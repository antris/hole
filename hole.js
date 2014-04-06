/// <reference path="./jquery.d.ts" />
var holeTextInput = function ($container, opts) {
    var $inputElem = opts.$inputElem;
    var $labelElem = opts.$labelElem.addClass('holelib-minilabel');
    var value = Bacon.$.textFieldValue($inputElem);
    var valueIsEmpty = value.map(function (val) {
        return val.length == 0;
    });
    var focused = $inputElem.focusE().map(true).merge($inputElem.blurE().map(false));
    var hideMiniLabelEffect = function (fieldIsEmpty) {
        $labelElem.toggleClass('holelib-minilabel-hidden', fieldIsEmpty);
    };
    var focusedMiniLabelEffect = function (isFocused) {
        $labelElem.toggleClass('holelib-minilabel-focused', isFocused);
    };
    var required = $inputElem.prop('required');
    var originalLabelText = $labelElem.text();
    var labelText = required ? originalLabelText : originalLabelText + " (optional)";

    focused.onValue(focusedMiniLabelEffect);
    valueIsEmpty.onValue(hideMiniLabelEffect);

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
