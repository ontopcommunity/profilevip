(function(){
  function qs(s, r){ return (r||document).querySelector(s); }
  function qsa(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
  var ICON = {
    facebook: "./assets/img/social/facebook.svg",
    tiktok: "./assets/img/social/tiktok.svg",
    locket: "./assets/img/social/locket.svg",
    instagram: "./assets/img/social/instagram.svg",
    threads: "./assets/img/social/threads.svg"
  };
  fetch("./assets/data/profile.json?t=" + Date.now()).then(function(r){ return r.ok ? r.json() : null; }).then(function(p){
    if (!p) return;
    // header name
    qsa(".magic-text").forEach(function(el){ if (p.headerName) el.textContent = p.headerName; });
    // display name
    var h1 = qs("section.animate h1.text-3xl");
    if (h1 && p.displayName) {
      var tick = h1.querySelector("img");
      h1.innerHTML = p.displayName + " ";
      if (tick) h1.appendChild(tick);
      else {
        var img = document.createElement("img");
        img.className = "blue-tick ml-2";
        img.src = "./assets/img/icon/tick.png";
        h1.appendChild(img);
      }
    }
    // subtitle under name
    if (p.subtitle) {
      var sub = qs("section.animate h1.text-3xl + p");
      if (sub) sub.textContent = p.subtitle;
    }
    // location
    if (p.location) {
      qsa("section.animate p").forEach(function(el){
        if (el.textContent.indexOf("Ha") >= 0 || el.textContent.indexOf("Tinh") >= 0 || el.textContent.indexOf("Tĩnh") >= 0 || el.querySelector("i.ri-map-pin")) {
          /* keep structure */ 
        }
      });
    }
    // bio paragraphs
    if (p.bio && p.bio.length) {
      var bioBox = qs(".flex.flex-1.flex-col.gap-y-3 .flex.flex-col.gap-2");
      if (bioBox) {
        bioBox.innerHTML = p.bio.map(function(line){ return "<p>" + line + "</p>"; }).join("");
      }
    }
    // socials
    if (p.socials && p.socials.length) {
      var grid = qs("section.animate h2") && (function(){
        var sections = qsa("section.animate");
        for (var i=0;i<sections.length;i++){
          var h = sections[i].querySelector("h2");
          if (h && h.textContent.trim() === "Social") {
            return sections[i].querySelector(".grid");
          }
        }
        return null;
      })();
      if (grid) {
        grid.innerHTML = p.socials.map(function(s){
          var href = s.url && s.url !== "#" ? s.url : "#";
          var click = href === "#" ? ' onclick="return false;"' : "";
          var icon = ICON[s.type] || ICON.facebook;
          return '<a class="group relative text-sm leading-normal no-underline hover:bg-transparent" href="'+href+'" target="_blank" rel="noopener"'+click+'>'+
            '<div class="relative flex flex-row items-center gap-x-4 px-2 py-1.5 transition-all">'+
            '<div class="absolute -inset-0 z-10 rounded-lg border border-border bg-muted opacity-0 transition-all group-hover:opacity-50"></div>'+
            '<img class="social-app-icon z-20" src="'+icon+'" alt="'+s.type+'">'+
            '<div class="z-20 flex flex-col"><div class="font-medium">'+(s.name||"")+'</div>'+
            '<div class="font-normal text-muted-foreground">'+(s.subtitle||"")+'</div></div></div></a>';
        }).join("");
      }
    }
    // quotes for footer
    if (p.quotes && p.quotes.length) {
      window.OFFLINE_QUOTES = p.quotes;
      var el = document.getElementById("cham-ngon");
      if (el) el.textContent = p.quotes[0];
    }
    // gallery extras
    if (p.galleryExtra && p.galleryExtra.length) {
      var picSection = (function(){
        var sections = qsa("section.animate");
        for (var i=0;i<sections.length;i++){
          var h = sections[i].querySelector("h2");
          if (h && h.textContent.trim() === "Picture") return sections[i].querySelector(".grid");
        }
        return null;
      })();
      if (picSection) {
        p.galleryExtra.forEach(function(src){
          var a = document.createElement("a");
          a.className = "group overflow-hidden relative flex flex-col gap-y-3 rounded-2xl border border-border bg-primary-foreground transition-all hover:border-foreground/25 hover:shadow-sm";
          a.setAttribute("data-fancybox", "gallery");
          a.setAttribute("data-src", "./" + src);
          a.innerHTML = '<div class="aspect-[4/3] w-full"></div><img src="./'+src+'" alt="Img" class="absolute top-0 h-full w-full object-cover">';
          picSection.appendChild(a);
        });
      }
    }
  }).catch(function(){});
})();
