/* ── Live Chat — Tidio Integration ── */
(function() {
  var tidioKey = 'YOUR_TIDIO_PUBLIC_KEY'; // REPLACE with your Tidio public key
  if (tidioKey !== 'YOUR_TIDIO_PUBLIC_KEY') {
    var s = document.createElement('script');
    s.src = 'https://code.tidio.co/' + tidioKey + '.js';
    s.async = true;
    s.onload = function() {
      var launcher = document.getElementById('chat-launcher');
      if (launcher) launcher.style.display = 'none';
    };
    document.body.appendChild(s);
  }
})();

/* ── Custom Chat Launcher ── */
var chatOpen = false;
var tooltipHidden = false;

// Hide tooltip after 4s
setTimeout(function() {
  var t = document.getElementById('chat-tooltip');
  if (t) { t.style.opacity = '0'; t.style.transition = 'opacity 0.5s'; setTimeout(function(){ t.style.display='none'; }, 500); }
  tooltipHidden = true;
}, 4000);

function toggleChat() {
  chatOpen = !chatOpen;
  var panel = document.getElementById('chat-panel');
  var iconOpen = document.getElementById('chat-icon-open');
  var iconClose = document.getElementById('chat-icon-close');
  var tooltip = document.getElementById('chat-tooltip');
  panel.classList.toggle('open', chatOpen);
  iconOpen.style.display = chatOpen ? 'none' : 'block';
  iconClose.style.display = chatOpen ? 'block' : 'none';
  if (tooltip) tooltip.style.display = 'none';
}

function chatQuickReply(btn, text) {
  addChatUserMsg(text);
  btn.parentElement.style.display = 'none';
  setTimeout(function() {
    addChatIncomingMsg("Thanks for reaching out! A member of our team will follow up shortly. In the meantime, you can also fill out our free case evaluation form below \u2014 it only takes 2 minutes.");
  }, 800);
}

function sendChatMsg() {
  var input = document.getElementById('chatInput');
  var text = input.value.trim();
  if (!text) return;
  addChatUserMsg(text);
  input.value = '';
  setTimeout(function() {
    addChatIncomingMsg("Thank you for your message! Our team reviews every inquiry and will reach out to you shortly. For urgent matters, please call us directly.");
  }, 900);
}

function addChatUserMsg(text) {
  var msgs = document.querySelector('.chat-messages');
  var div = document.createElement('div');
  div.style.cssText = 'align-self:flex-end;background:var(--clr-gold);color:#09090E;padding:0.65rem 0.9rem;border-radius:1rem;border-bottom-right-radius:4px;font-size:0.84rem;max-width:80%;line-height:1.5;';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function addChatIncomingMsg(text) {
  var msgs = document.querySelector('.chat-messages');
  var div = document.createElement('div');
  div.className = 'chat-msg incoming';
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}
