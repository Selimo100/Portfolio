/**
 * Contact form: client-side validation and submit feedback.
 *
 * The form is a plain POST to sendMail.php — that integration is unchanged.
 * This script only adds inline validation on top of the browser's own
 * constraint validation, and never blocks a submission that PHP would accept.
 * With JavaScript disabled the native `required` / `type="email"` rules and
 * the server-side checks in sendMail.php still apply.
 */
(function () {
  "use strict";

  /* --- Dismissible alerts ---------------------------------------------- */

  document.querySelectorAll("[data-alert-close]").forEach(function (button) {
    button.addEventListener("click", function () {
      var alert = button.closest(".alert");
      if (alert) alert.remove();
    });
  });

  /* --- Validation ------------------------------------------------------- */

  var form = document.querySelector("[data-validate]");
  if (!form) return;

  var fields = Array.prototype.slice.call(
    form.querySelectorAll(".field__control")
  );

  function setFieldState(control) {
    var field = control.closest(".field");
    if (!field) return true;

    var valid = control.checkValidity();
    field.classList.toggle("is-invalid", !valid);
    control.setAttribute("aria-invalid", String(!valid));
    return valid;
  }

  fields.forEach(function (control) {
    // Only nag after the user has left the field once.
    control.addEventListener("blur", function () {
      if (control.value !== "") setFieldState(control);
    });

    control.addEventListener("input", function () {
      var field = control.closest(".field");
      if (field && field.classList.contains("is-invalid")) {
        setFieldState(control);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    var firstInvalid = null;

    fields.forEach(function (control) {
      if (!setFieldState(control) && !firstInvalid) {
        firstInvalid = control;
      }
    });

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
      return;
    }

    var submit = form.querySelector('[type="submit"]');
    if (submit) {
      submit.classList.add("is-loading");
      submit.setAttribute("aria-busy", "true");
      var label = submit.querySelector("[data-submit-label]");
      if (label) label.textContent = "Sending…";
    }
  });
})();
