// The six concept links, in one place, so they can be swapped when the demos move.
var CONCEPT_LINKS = {
  "chanel-22": "https://ivy-chanel-rts.netlify.app/?location=poa",
  "chanel-culture-pass": "https://ivy-chanel-new.netlify.app/#token=pass",
  "louis-vuitton": "https://ivy-lv-master.netlify.app/?location=store",
  "balmain": "https://balmain.ivypass.com/#token=fragrance",
  "six-senses": "https://sixsenses.ivypass.com/#token=dive",
  "ralph-lauren": "https://ralphlauren.ivypass.com/#token=sneaker"
};

document.querySelectorAll("a[data-concept]").forEach(function (a) {
  var url = CONCEPT_LINKS[a.getAttribute("data-concept")];
  if (!url) return;
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
});

// The form: sent to Netlify Forms in place, then a plain thank-you.
// Without this script the form still posts and Netlify shows its own confirmation.
var form = document.getElementById("yours-form");
if (form) {
  var state = document.getElementById("yours-state");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var button = form.querySelector("button");
    button.disabled = true;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        form.hidden = true;
        state.className = "state";
        state.textContent = "Thank you. We will reply to you by email.";
        state.hidden = false;
        state.tabIndex = -1;
        state.focus();
      })
      .catch(function () {
        button.disabled = false;
        state.className = "state error";
        state.textContent = "That did not send. Write to info@ivypass.com instead.";
        state.hidden = false;
      });
  });
}
