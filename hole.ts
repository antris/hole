/// <reference path="./jquery.d.ts" />
declare var Bacon: any;
var holeTextInput = ($container, opts) => {
  var $inputElem = opts.$inputElem
  var $labelElem = opts.$labelElem.addClass('holelib-minilabel')
  var value = Bacon.$.textFieldValue($inputElem)
  var showMiniLabel = () => { $labelElem.removeClass('holelib-minilabel-hidden') }
  var hideMiniLabel = () => { $labelElem.addClass('holelib-minilabel-hidden') }
  var required = $inputElem.prop('required')
  var originalLabelText = $labelElem.text()
  var labelText = required ? originalLabelText : originalLabelText + " (optional)"

  value.map((val) => val.length > 0).onValue((hasContent) => {
    hasContent ? showMiniLabel() : hideMiniLabel()
  })

  $labelElem.text(labelText)
  $inputElem.attr({placeholder: labelText})
  return $container.append(
    $labelElem,
    $inputElem
  )
}

module hole {
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