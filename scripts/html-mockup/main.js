/* PGCCDC HTML mockup: vanilla JS for the interactive parts of the design.
   Mirrors the behaviour of the Next.js components (header, menus, scroll
   reveal, video, copy button, contact form). No dependencies. */
(function () {
  "use strict";

  var ORG_EMAIL = "tolsonbanner@princegeorges-countycdc.org";
  // Web3Forms access key, inserted by build-html-mockup.mjs. Empty = open the email app instead.
  var FORM_KEY = "__WEB3FORMS_KEY__";
  var VIMEO_ID = "1121020185";

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector("body > header");
  if (header) {
    var calm = "border-b border-transparent bg-white".split(" ");
    var lifted = "border-b border-line/80 bg-white/90 shadow-[0_8px_30px_-12px_rgb(0_20_46/0.18)] backdrop-blur-xl".split(" ");
    var onScroll = function () {
      var scrolled = window.scrollY > 8;
      header.classList.remove.apply(header.classList, scrolled ? calm : lifted);
      header.classList.add.apply(header.classList, scrolled ? lifted : calm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Signature Programs mega-menu ---------- */
  var menuButton = document.querySelector('nav[aria-label="Main"] button[aria-controls]');
  if (menuButton) {
    var panel = document.getElementById(menuButton.getAttribute("aria-controls"));
    var wrap = menuButton.parentElement;
    var chevron = menuButton.querySelector("svg");
    var timer = null;
    var setOpen = function (open) {
      panel.hidden = !open;
      menuButton.setAttribute("aria-expanded", String(open));
      if (chevron) chevron.classList.toggle("rotate-180", open);
    };
    var hover = function (open) {
      clearTimeout(timer);
      timer = setTimeout(function () { setOpen(open); }, open ? 60 : 180);
    };
    menuButton.addEventListener("click", function () { setOpen(panel.hidden); });
    wrap.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hover(true); });
    wrap.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") hover(false); });
    wrap.addEventListener("focusout", function (e) { if (!wrap.contains(e.relatedTarget)) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) { setOpen(false); menuButton.focus(); }
    });
    document.addEventListener("pointerdown", function (e) {
      if (!panel.hidden && !wrap.contains(e.target)) setOpen(false);
    });
  }

  /* ---------- Mobile menu dialog ---------- */
  var openBtn = document.querySelector('[aria-label="Open menu"]');
  var mobile = document.getElementById("mobile-menu");
  if (openBtn && mobile) {
    var dialog = mobile.querySelector('[role="dialog"]');
    var lastFocus = null;
    var trap = function (e) {
      if (e.key === "Escape") return closeMenu();
      if (e.key !== "Tab") return;
      var items = dialog.querySelectorAll("a[href], button:not([disabled])");
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    var openMenu = function () {
      lastFocus = document.activeElement;
      mobile.hidden = false;
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      mobile.querySelector('[aria-label="Close menu"]').focus();
      document.addEventListener("keydown", trap);
    };
    var closeMenu = function () {
      mobile.hidden = true;
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trap);
      if (lastFocus) lastFocus.focus();
    };
    openBtn.addEventListener("click", openMenu);
    mobile.querySelectorAll("[data-menu-close]").forEach(function (el) { el.addEventListener("click", closeMenu); });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Click-to-play Vimeo trailer ---------- */
  document.querySelectorAll("button[data-vimeo]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = "https://player.vimeo.com/video/" + (btn.getAttribute("data-vimeo") || VIMEO_ID) + "?autoplay=1&dnt=1&title=0&byline=0";
      frame.title = btn.getAttribute("data-title") || "Video";
      frame.allow = "autoplay; fullscreen; picture-in-picture";
      frame.allowFullscreen = true;
      frame.className = "absolute inset-0 size-full";
      btn.replaceWith(frame);
      frame.focus();
    });
  });

  /* ---------- Copy mailing address ---------- */
  document.querySelectorAll("button[data-copy-address]").forEach(function (btn) {
    var address = btn.closest("div").parentElement.querySelector("address");
    var label = Array.prototype.find.call(btn.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
    var live = btn.querySelector("[aria-live]");
    btn.addEventListener("click", function () {
      if (!navigator.clipboard || !address) return;
      navigator.clipboard.writeText(address.innerText.trim()).then(function () {
        if (label) label.textContent = "Copied";
        if (live) live.textContent = "Mailing address copied to clipboard";
        setTimeout(function () {
          if (label) label.textContent = "Copy address";
          if (live) live.textContent = "";
        }, 2200);
      });
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.querySelector("form[novalidate]");
  if (form) {
    var errorClass = "mt-2 text-sm font-semibold text-red-700";
    var submitBtn = form.querySelector('button[type="submit"]');
    var idleLabel = submitBtn.innerHTML;
    var setError = function (input, message) {
      var errId = input.id + "-err";
      var existing = document.getElementById(errId);
      if (existing) existing.remove();
      if (message) {
        var p = document.createElement("p");
        p.id = errId;
        p.className = errorClass;
        p.textContent = message;
        input.insertAdjacentElement("afterend", p);
        input.setAttribute("aria-invalid", "true");
        input.setAttribute("aria-describedby", errId);
      } else {
        input.setAttribute("aria-invalid", "false");
        input.removeAttribute("aria-describedby");
      }
    };
    var clearAlert = function () {
      var a = form.querySelector('[role="alert"]');
      if (a) a.remove();
    };
    var showAlert = function () {
      clearAlert();
      var a = document.createElement("div");
      a.setAttribute("role", "alert");
      a.className = "flex gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800";
      a.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 size-5 shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>' +
        "<p>Sorry, your message couldn't be sent. Please try again, or email us directly at " +
        '<a class="font-semibold underline" href="mailto:' + ORG_EMAIL + '">' + ORG_EMAIL + "</a>.</p>";
      submitBtn.insertAdjacentElement("beforebegin", a);
    };
    var setSending = function (on) {
      submitBtn.disabled = on;
      form.setAttribute("aria-busy", String(on));
      submitBtn.innerHTML = on
        ? 'Sending… <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 animate-spin" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>'
        : idleLabel;
    };
    var showDone = function (sentTo) {
      var done = document.createElement("div");
      done.setAttribute("role", "status");
      done.className = "flex flex-col items-start gap-4 rounded-[var(--radius-lg)] bg-leaf-100 p-8";
      var text = sentTo
        ? "Your message has been sent. We'll reply to <strong class=\"text-navy-900\"></strong> as soon as we can."
        : 'Your email app should open with your message ready to send. If it didn\'t, email us directly at <a class="font-semibold text-blue-700 underline" href="mailto:' + ORG_EMAIL + '">' + ORG_EMAIL + "</a>.";
      done.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-10 text-leaf-700" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>' +
        '<h3 class="font-display text-2xl font-medium text-navy-900">Thank you for reaching out!</h3>' +
        '<p class="text-ink-soft">' + text + "</p>" +
        '<button type="button" class="min-h-11 font-bold text-blue-700 underline underline-offset-4">Send another message</button>';
      if (sentTo) done.querySelector("strong").textContent = sentTo; // text only, never HTML
      done.querySelector("button").addEventListener("click", function () {
        done.replaceWith(form);
      });
      form.replaceWith(done);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;
      var f = form.elements;
      var name = f.name.value.trim();
      var email = f.email.value.trim();
      var phone = f.phone.value.trim();
      var topic = f.topic.value;
      var message = f.message.value.trim();
      var errors = [
        [f.name, name ? "" : "Please enter your name."],
        [f.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Please enter a valid email address, like name@example.com."],
        [f.message, message.length >= 10 ? "" : "Please tell us a little more (at least 10 characters)."]
      ];
      var firstBad = null;
      errors.forEach(function (pair) {
        setError(pair[0], pair[1]);
        if (pair[1] && !firstBad) firstBad = pair[0];
      });
      if (firstBad) { firstBad.focus(); return; }
      clearAlert();

      // Spam bots fill in the hidden field; quietly pretend it worked
      if (f.botcheck && f.botcheck.checked) return showDone(email);

      if (!FORM_KEY || FORM_KEY.indexOf("__") === 0) {
        var body = message + "\n\n" + name + "\n" + email + (phone ? "\n" + phone : "");
        window.location.href = "mailto:" + ORG_EMAIL + "?subject=" + encodeURIComponent("Website: " + topic) + "&body=" + encodeURIComponent(body);
        return showDone("");
      }

      setSending(true);
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: "New website message: " + topic,
          from_name: "PGCCDC website",
          name: name,
          email: email,
          phone: phone || "Not provided",
          topic: topic,
          message: message
        })
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (r) {
            if (!res.ok || !r.success) throw new Error(r.message || res.statusText);
          });
        })
        .then(function () {
          setSending(false);
          form.reset();
          showDone(email);
        })
        .catch(function () {
          setSending(false);
          showAlert();
        });
    });
  }
})();
