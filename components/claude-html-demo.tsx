const DEMO_BODY = `<div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1rem 0;">

  <h2 class="sr-only">Interactive form showcase covering text inputs, selects, checkboxes, radios, range sliders, color picker, file inputs, a custom toggle, and buttons with a live state preview.</h2>

  <!-- Account -->
  <div>
    <h3 style="margin: 0 0 .75rem;">Account</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      <div>
        <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Full name</label>
        <input id="f-name" type="text" placeholder="Jane Doe" style="width: 100%;" />
      </div>
      <div>
        <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Email</label>
        <input id="f-email" type="email" placeholder="jane@example.com" style="width: 100%;" />
      </div>
      <div>
        <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Password</label>
        <input id="f-pw" type="password" placeholder="At least 8 characters" style="width: 100%;" />
      </div>
      <div>
        <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Date of birth</label>
        <input id="f-dob" type="date" style="width: 100%;" />
      </div>
    </div>
  </div>

  <!-- Profile -->
  <div>
    <h3 style="margin: 0 0 .75rem;">Profile</h3>
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div>
        <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Bio</label>
        <textarea id="f-bio" placeholder="Tell us a little about yourself..." style="width:100%;"></textarea>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
        <div>
          <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Country</label>
          <select id="f-country" style="width:100%;">
            <option>United States</option>
            <option>United Kingdom</option>
            <option>China</option>
            <option>Japan</option>
            <option>Germany</option>
            <option>Brazil</option>
          </select>
        </div>
        <div>
          <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Age</label>
          <input id="f-age" type="number" min="0" max="120" value="28" style="width:100%;" />
        </div>
        <div>
          <label style="display:block; font-size:13px; color: var(--color-text-secondary); margin-bottom:6px;">Website</label>
          <input id="f-site" type="url" placeholder="https://" style="width:100%;" />
        </div>
      </div>
    </div>
  </div>

  <!-- Preferences -->
  <div>
    <h3 style="margin: 0 0 .75rem;">Preferences</h3>
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div>
        <div style="font-size:13px; color: var(--color-text-secondary); margin-bottom:8px;">Plan</div>
        <div style="display:flex; gap: 18px; font-size: 14px; flex-wrap: wrap;">
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="radio" name="plan" value="free" checked /> Free</label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="radio" name="plan" value="pro" /> Pro</label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="radio" name="plan" value="team" /> Team</label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="radio" name="plan" value="enterprise" /> Enterprise</label>
        </div>
      </div>
      <div>
        <div style="font-size:13px; color: var(--color-text-secondary); margin-bottom:8px;">Interests</div>
        <div style="display:flex; gap: 18px; font-size: 14px; flex-wrap: wrap;">
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" class="interest" value="design" checked /> Design</label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" class="interest" value="engineering" checked /> Engineering</label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" class="interest" value="marketing" /> Marketing</label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" class="interest" value="research" /> Research</label>
          <label style="display:flex; align-items:center; gap:6px; cursor:pointer;"><input type="checkbox" class="interest" value="ops" /> Operations</label>
        </div>
      </div>
    </div>
  </div>

  <!-- Display -->
  <div>
    <h3 style="margin: 0 0 .75rem;">Display</h3>
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <label style="font-size:14px; color: var(--color-text-secondary); min-width: 100px;">Font size</label>
        <input id="f-font" type="range" min="10" max="24" value="16" step="1" style="flex:1;" />
        <span id="f-font-out" style="font-size:14px; font-weight:500; min-width: 40px; text-align:right;">16px</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <label style="font-size:14px; color: var(--color-text-secondary); min-width: 100px;">Volume</label>
        <input id="f-vol" type="range" min="0" max="100" value="60" step="1" style="flex:1;" />
        <span id="f-vol-out" style="font-size:14px; font-weight:500; min-width: 40px; text-align:right;">60%</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <label style="font-size:14px; color: var(--color-text-secondary); min-width: 100px;">Accent color</label>
        <input id="f-color" type="color" value="#185fa5" style="width: 48px; height: 32px; border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-md); background: transparent; padding: 0; cursor: pointer;" />
        <span id="f-color-out" style="font-size:13px; font-family: var(--font-mono); color: var(--color-text-secondary);">#185fa5</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <label for="f-notif" style="font-size:14px;">Enable email notifications</label>
        <button id="f-notif" role="switch" aria-checked="true" style="position: relative; width: 40px; height: 22px; padding: 0; border-radius: 999px; background: var(--color-text-info); border: none; cursor: pointer;">
          <span id="f-notif-knob" style="position:absolute; top:2px; left:20px; width:18px; height:18px; background:#fff; border-radius:50%; transition: left .15s ease;"></span>
        </button>
      </div>
    </div>
  </div>

  <!-- Attachments + Search -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div>
      <h3 style="margin: 0 0 .75rem;">Attachments</h3>
      <input type="file" id="f-file" />
      <input type="file" id="f-file2" multiple accept="image/*" style="margin-top: 8px;" />
    </div>
    <div>
      <h3 style="margin: 0 0 .75rem;">Search</h3>
      <input id="f-search" type="search" placeholder="Search anything..." style="width: 100%;" />
    </div>
  </div>

  <!-- Actions -->
  <div style="display: flex; gap: 8px; padding-top: 1rem; border-top: 0.5px solid var(--color-border-tertiary); flex-wrap: wrap;">
    <button id="f-submit" style="background: var(--color-text-primary); color: var(--color-background-primary); border-color: var(--color-text-primary);">Save changes</button>
    <button id="f-cancel">Cancel</button>
    <button disabled>Disabled</button>
    <button style="border-color: var(--color-border-danger); color: var(--color-text-danger); margin-left: auto;">Delete account</button>
  </div>

  <!-- Live state -->
  <div style="background: var(--color-background-secondary); border-radius: var(--border-radius-lg); padding: 14px 16px;">
    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 8px;">Live state</div>
    <pre id="f-state" style="margin: 0; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: var(--color-text-primary); white-space: pre-wrap; word-break: break-word;">{}</pre>
  </div>
</div>

<script>
(function () {
  const $ = (id) => document.getElementById(id);
  const fontOut = $('f-font-out');
  const volOut = $('f-vol-out');
  const colorOut = $('f-color-out');
  const stateOut = $('f-state');

  let notifOn = true;

  function readState() {
    const interests = Array.from(document.querySelectorAll('.interest:checked')).map(el => el.value);
    const planEl = document.querySelector('input[name="plan"]:checked');
    return {
      name: $('f-name').value,
      email: $('f-email').value,
      passwordLength: $('f-pw').value.length,
      dob: $('f-dob').value,
      bio: $('f-bio').value,
      country: $('f-country').value,
      age: Number($('f-age').value) || 0,
      website: $('f-site').value,
      plan: planEl ? planEl.value : null,
      interests: interests,
      fontSize: Number($('f-font').value),
      volume: Number($('f-vol').value),
      accentColor: $('f-color').value,
      emailNotifications: notifOn,
      search: $('f-search').value
    };
  }

  function render() {
    fontOut.textContent = $('f-font').value + 'px';
    volOut.textContent = $('f-vol').value + '%';
    colorOut.textContent = $('f-color').value;
    stateOut.textContent = JSON.stringify(readState(), null, 2);
  }

  document.addEventListener('input', render);
  document.addEventListener('change', render);

  const toggle = $('f-notif');
  const knob = $('f-notif-knob');
  toggle.addEventListener('click', () => {
    notifOn = !notifOn;
    toggle.setAttribute('aria-checked', String(notifOn));
    if (notifOn) {
      toggle.style.background = 'var(--color-text-info)';
      knob.style.left = '20px';
    } else {
      toggle.style.background = 'var(--color-border-secondary)';
      knob.style.left = '2px';
    }
    render();
  });

  $('f-submit').addEventListener('click', () => {
    const s = readState();
    sendPrompt('Here is the form data I just submitted: ' + JSON.stringify(s));
  });

  $('f-cancel').addEventListener('click', () => {
    document.querySelectorAll('input, textarea, select').forEach(el => {
      if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = el.defaultChecked;
      } else if (el.type !== 'file') {
        el.value = el.defaultValue || '';
      }
    });
    render();
  });

  render();
})();
</script>`;

const HOST_STYLES = `:root {
  --color-text-primary: #2d2d2c;
  --color-text-secondary: #6b6b68;
  --color-text-info: #185fa5;
  --color-text-danger: #c22929;
  --color-background-primary: #ffffff;
  --color-background-secondary: #f5f4f0;
  --color-border-secondary: #d8d6cf;
  --color-border-tertiary: #e6e4dd;
  --color-border-danger: #c22929;
  --border-radius-md: 4px;
  --border-radius-lg: 8px;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", monospace;
}
* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  color: var(--color-text-primary);
  font-family: -apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  background: #ffffff;
}
body { padding: 20px 24px; }
input, textarea, select {
  font-family: inherit;
  font-size: 14px;
  color: var(--color-text-primary);
  background: var(--color-background-primary);
  border: 0.5px solid var(--color-border-secondary);
  border-radius: var(--border-radius-md);
  padding: 7px 10px;
  transition: border-color 0.15s ease;
}
input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--color-text-info);
}
textarea { min-height: 64px; resize: vertical; }
button {
  font-family: inherit;
  font-size: 14px;
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  border: 0.5px solid var(--color-border-secondary);
  border-radius: var(--border-radius-md);
  padding: 7px 14px;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}
button:hover:not(:disabled) { border-color: var(--color-text-primary); }
button:disabled { opacity: 0.5; cursor: not-allowed; }
h3 {
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary);
  letter-spacing: -0.005em;
}
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
input[type="range"] { padding: 0; border: none; background: transparent; }
input[type="file"] { padding: 0; border: none; background: transparent; font-size: 12px; }
input[type="color"] { padding: 0; }`;

const DEMO_DOC = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>${HOST_STYLES}</style>
</head>
<body>
<script>window.sendPrompt = function(t){console.log('[demo] sendPrompt:', t);};</script>
${DEMO_BODY}
</body>
</html>`;

export function ClaudeReplyDemo() {
  return (
    <>
      <iframe
        title="A reply rendered as if in Claude's chat sandbox"
        srcDoc={DEMO_DOC}
        sandbox="allow-scripts"
        style={{
          display: "block",
          width: "100%",
          height: 1340,
          border: "0.5px solid var(--bone)",
          background: "#fff",
          margin: "48px 0 12px",
        }}
      />
      <p
        style={{
          margin: "0 0 28px",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--ink-3)",
          textAlign: "center",
        }}
      >
        Rendered in an isolated iframe approximating Claude’s chat sandbox. The styling is the model’s own.
      </p>
    </>
  );
}

export function ClaudeReplySource() {
  return (
    <div
      style={{
        margin: "32px 0 48px",
        maxHeight: 420,
        overflow: "auto",
        background: "var(--paper-2)",
        border: "0.5px solid var(--bone)",
      }}
    >
      <pre
        style={{
          margin: 0,
          padding: "20px 24px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          lineHeight: 1.65,
          background: "transparent",
          border: 0,
          color: "var(--ink)",
        }}
      >
        <code>{DEMO_BODY}</code>
      </pre>
    </div>
  );
}
