import {feather} from "../../app-assets/vendors/js/vendors.min";

$(window).on('load', function() {
  if (feather) {
    feather.replace({
      width: 14,
      height: 14
    });
  }
})
