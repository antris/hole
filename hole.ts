/// <reference path="./jquery.d.ts" />
declare var Bacon: any;

module hole {

  var addOptionalTextToLabel = ($inputElem, $labelElem) => {
    var required = $inputElem.prop('required')
    var originalLabelText = $labelElem.text()
    var labelText = required ? originalLabelText : originalLabelText + " (optional)"
    $labelElem.text(labelText)
    $inputElem.attr({placeholder: labelText})
  }

  var addClassToMiniLabelWhenFocused = ($inputElem, $labelElem) => {
    var isFocused = $inputElem.focusE().map(true).merge($inputElem.blurE().map(false))
    isFocused.onValue((isFocused) => {
      $labelElem.toggleClass('holelib-minilabel-focused', isFocused)
    })
  }

  var hideMiniLabelWhenValueIsEmpty = ($inputElem, $labelElem) => {
    var isEmpty = Bacon.$.textFieldValue($inputElem).map((val) => val.length == 0)
    isEmpty.onValue((fieldIsEmpty) => {
      $labelElem.toggleClass('holelib-minilabel-hidden', fieldIsEmpty)
    })
  }

  var holeTextInput = ($container, opts) => {
    var $inputElem = opts.$inputElem
    var $labelElem = opts.$labelElem.addClass('holelib-minilabel')

    addOptionalTextToLabel($inputElem, $labelElem)
    addClassToMiniLabelWhenFocused($inputElem, $labelElem)
    hideMiniLabelWhenValueIsEmpty($inputElem, $labelElem)

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