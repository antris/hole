/// <reference path="./jquery.d.ts" />
declare var Bacon: any;

module hole {

  var holeTextInput = ($container, opts) => {
    var $inputElem = opts.$inputElem
    var $labelElem = opts.$labelElem.addClass('holelib-minilabel')
    var value = Bacon.$.textFieldValue($inputElem)
    var valueIsEmpty = value.map((val) => val.length == 0)
    var focused = $inputElem.focusE().map(true).merge($inputElem.blurE().map(false))
    var hideMiniLabelEffect = (fieldIsEmpty) => {
      $labelElem.toggleClass('holelib-minilabel-hidden', fieldIsEmpty)
    }
    var focusedMiniLabelEffect = (isFocused) => {
      $labelElem.toggleClass('holelib-minilabel-focused', isFocused)
    }
    var required = $inputElem.prop('required')
    var originalLabelText = $labelElem.text()
    var labelText = required ? originalLabelText : originalLabelText + " (optional)"

    focused.onValue(focusedMiniLabelEffect)
    valueIsEmpty.onValue(hideMiniLabelEffect)

    $labelElem.text(labelText)
    $inputElem.attr({placeholder: labelText})
    return $container.append(
      $labelElem,
      $inputElem
    )
  }

  export function create (opts) {
    var $container = $('<div>').addClass('holelib-container')
    var $inputElem = opts.$inputElem
    var $labelElem = opts.$labelElem
    $inputElem.addClass('holelib-input')
    $labelElem.addClass('holelib-label')
    switch (opts.type) {
      case 'text':
      case 'tel':
      case 'email':
      default:
        return holeTextInput($container, opts)
      break;
    }
  }
}