document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelectorAll("button");let s=0;t.forEach((i,u)=>{i.setAttribute("tabindex","0")}),document.addEventListener("keydown",i=>{switch(i.key){case"ArrowRight":case"ArrowDown":i.preventDefault(),s=(s+1)%t.length,t[s].focus();break;case"ArrowLeft":case"ArrowUp":i.preventDefault(),s=(s-1+t.length)%t.length,t[s].focus();break;case"Enter":case" ":document.activeElement&&document.activeElement.tagName==="BUTTON"&&(i.preventDefault(),document.activeElement.click());break}}),t.length>0&&t[0].focus()});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("mobile-inventory-btn"),s=document.getElementById("mobile-inventory-panel"),i=document.getElementById("mobile-inventory-content");t&&s&&t.addEventListener("click",()=>{if(s.classList.contains("hidden")){if(s.classList.remove("hidden"),t.textContent="❌ Close",i){const a=JSON.parse(localStorage.getItem("inventory_item")||"{}"),b=Object.keys(a);if(b.length===0)i.innerHTML='<p class="text-amber-800 text-sm">Sorry, there are no items here yet</p>';else{const o=b.map(l=>`<p class="text-amber-800 text-sm">• ${l}</p>`).join("");i.innerHTML=`
                <h3 class="text-amber-800 font-bold mb-2">Inventory</h3>
                ${o}
              `}}}else s.classList.add("hidden"),t.textContent="📦 Inventory"})});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("language-dropdown-btn"),s=document.getElementById("language-dropdown"),i=document.getElementById("current-lang"),u=document.getElementById("current-flag");t&&s&&i&&u&&(t.addEventListener("click",a=>{a.stopPropagation(),t.getAttribute("aria-expanded")==="true"?(s.classList.add("hidden"),t.setAttribute("aria-expanded","false")):(s.classList.remove("hidden"),t.setAttribute("aria-expanded","true"))}),s.addEventListener("click",a=>{const o=a.target.closest("button[data-lang]");if(o){const l=o.getAttribute("data-lang"),g=o.getAttribute("data-flag");if(l&&g){const x={en:"English",fr:"Français",es:"Español","pt-br":"Português (Brasil)"};i.textContent=x[l]||l,u.textContent=g,localStorage.setItem("preferred-language",l),s.classList.add("hidden"),t.setAttribute("aria-expanded","false"),window.dispatchEvent(new CustomEvent("language-changed",{detail:{language:l}})),console.log(`Language changed to: ${l}`)}}}),document.addEventListener("click",a=>{!t.contains(a.target)&&!s.contains(a.target)&&(s.classList.add("hidden"),t.setAttribute("aria-expanded","false"))}),setTimeout(()=>{const a=localStorage.getItem("preferred-language");if(a){const b=s.querySelector(`button[data-lang="${a}"]`);if(b){const o=b.getAttribute("data-flag"),l={en:"English",fr:"Français",es:"Español","pt-br":"Português (Brasil)"};i.textContent=l[a]||a,u.textContent=o}}},150))});class q{constructor(){this.notifications=[]}show(s,i="info",u=3e3){const a=document.createElement("div");a.className=`notification notification-${i}`,a.innerHTML=`
        <div class="notification-content">
          <span class="notification-icon">${this.getIcon(i)}</span>
          <span class="notification-message">${s}</span>
        </div>
      `,document.body.appendChild(a),setTimeout(()=>{a.classList.add("show")},10),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>{a.parentNode&&a.parentNode.removeChild(a)},300)},u),this.notifications.push(a)}getIcon(s){return{success:"✓",warning:"⚠",error:"✗",info:"ℹ"}[s]||"ℹ"}}window.notificationManager=new q;window.showNotification=(t,s="info",i=3e3)=>{window.notificationManager.show(t,s,i)};document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("sandbox-popup"),s=document.getElementById("close-sandbox"),i=document.getElementById("sandbox-content");function u(o){const l={"sandbox.title":{en:"Transformation Lab",fr:"Laboratoire de Transformation",es:"Laboratorio de Transformación","pt-br":"Laboratório de Transformação"},"sandbox.description":{en:"Test Cloudinary image transformations in real-time. Enter your cloud name, public ID, and transformation parameters to see the results.",fr:"Testez les transformations d'images Cloudinary en temps réel. Entrez votre nom de cloud, ID public et paramètres de transformation pour voir les résultats.",es:"Prueba las transformaciones de imágenes de Cloudinary en tiempo real. Ingresa tu nombre de nube, ID público y parámetros de transformación para ver los resultados.","pt-br":"Teste transformações de imagens Cloudinary em tempo real. Digite seu nome de nuvem, ID público e parâmetros de transformação para ver os resultados."}},g=localStorage.getItem("preferred-language")||"en";return l[o]?.[g]||l[o]?.en||o}function a(){const o=document.getElementById("sandbox-title"),l=document.getElementById("sandbox-description");o&&(o.textContent=u("sandbox.title")),l&&(l.textContent=u("sandbox.description")),window.dispatchEvent(new CustomEvent("sandbox-content-updated"))}t&&(console.log("Found sandbox popup, setting up event listeners"),a(),window.addEventListener("language-changed",a),document.addEventListener("click",o=>{const l=o.target;l&&l.id==="sandbox-btn"&&(console.log("Sandbox button clicked via event delegation"),t.classList.remove("hidden"),t.classList.add("flex"),window.scrollTo({top:0,behavior:"smooth"}),i&&(i.innerHTML=`
              <div class="cloudinary-sandbox">
                <div class="sandbox-content">
                  <!-- Input Section -->
                  <div class="input-section mb-6">
                    <div class="mb-4">
                      <label class="block text-amber-500 text-sm mb-2">Cloud Name:</label>
                      <input 
                        id="cloud-name"
                        type="text" 
                        class="w-full p-2 bg-gray-800 border border-amber-600 text-amber-200 rounded"
                        placeholder="your-cloud-name"
                        value="demo"
                      />
                    </div>
                    
                    <div class="mb-4">
                      <label class="block text-amber-800 text-sm mb-2">Public ID:</label>
                      <input 
                        id="public-id"
                        type="text" 
                        class="w-full p-2 bg-gray-800 border border-amber-600 text-amber-200 rounded"
                        placeholder="sample"
                        value="sample"
                      />
                    </div>
                    
                    <div class="mb-4">
                      <label class="block text-amber-800 text-sm mb-2">Transformation:</label>
                      <input 
                        id="transformation"
                        type="text" 
                        class="w-full p-2 bg-gray-800 border border-amber-600 text-amber-200 rounded font-mono text-sm"
                        placeholder="c_scale,w_300,h_200,f_auto,q_auto"
                        value="c_scale,w_300,h_200,f_auto,q_auto"
                      />
                    </div>
                    
                    <div class="mb-4">
                      <label class="block text-amber-800 text-sm mb-2">Format:</label>
                      <select 
                        id="format"
                        class="w-full p-2 bg-gray-800 border border-amber-600 text-amber-200 rounded"
                      >
                        <option value="auto">Auto</option>
                        <option value="jpg">JPG</option>
                        <option value="png">PNG</option>
                        <option value="webp">WebP</option>
                        <option value="avif">AVIF</option>
                      </select>
                    </div>
                  </div>
                  
                  <!-- URL Display -->
                  <div class="url-section mb-6">
                    <label class="block text-amber-800 text-sm mb-2">Generated URL:</label>
                      <input 
                        id="generated-url"
                        type="text" 
                        readonly
                      class="w-full p-2 bg-gray-800 border border-amber-600 text-amber-200 rounded font-mono text-xs"
                    />
                  </div>
                  
                  <!-- Preview Section -->
                  <div class="preview-section mb-6">
                    <h4 class="text-amber-800 text-md font-bold mb-3">Preview:</h4>
                    <div class="preview-container">
                      <img 
                        id="preview-image"
                        class="max-w-full border border-amber-600 rounded"
                        alt="Transformation preview"
                      />
                    </div>
                  </div>
                  
                  <!-- Lab Test Section (only shown on lab pages) -->
                  <div id="lab-test-container" class="lab-test-section p-4 border border-amber-600 rounded-lg mb-4 hidden" style="background: linear-gradient(135deg, #2a1f1a 0%, #1a1410 25%, #0f0a08 50%, #0a0705 75%, #050302 100%);">
                    <h4 class="text-amber-400 text-lg font-bold mb-3" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);" id="lab-test-title">Lab Test:</h4>
                    <p class="text-amber-200 text-sm mb-4" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);" id="lab-test-question">
                      After transforming the image, what letters or words can you see? Select your answer:
                    </p>
                    <div class="space-y-2 mb-4" id="lab-test-options">
                      <!-- Options will be dynamically generated -->
                    </div>
                    <div class="flex gap-2">
                      <button 
                        id="submit-answer"
                        class="px-4 py-2 bg-amber-600 text-black rounded hover:bg-amber-500 transition-colors font-bold"
                      >
                        Submit Answer
                      </button>
                      <button 
                        id="clear-answer"
                        class="px-4 py-2 bg-gray-600 text-amber-200 rounded hover:bg-gray-500 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div id="test-result" class="mt-3 text-sm font-bold hidden"></div>
                    <div id="success-message" class="mt-4 p-3 border border-green-500 rounded-lg bg-green-900 bg-opacity-30 hidden">
                      <p class="text-green-300 text-sm leading-relaxed" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);" id="success-message-text">
                        Well done! You've successfully enhanced the image and discovered the hidden letters "Ch Os". It looks like this is a piece of Dr. Chiaro Obscuro's stationery, and it ties this criminal to the crime.
                        Keep this information safe as you continue your investigation!
                      </p>
                    </div>
                  </div>
                  
                  <!-- Lab Results Storage (always shown) -->
                  <div id="lab-results-container" class="lab-results-storage p-4 border border-green-600 rounded-lg" style="background: linear-gradient(135deg, #1a2f1a 0%, #0f1a0f 25%, #0a0f0a 50%, #050a05 75%, #020502 100%);">
                    <h4 class="text-green-400 text-lg font-bold mb-3" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">Lab Results:</h4>
                    <div id="stored-results" class="text-green-200 text-sm space-y-1" style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);">
                      <p class="text-gray-400 italic">No results yet. Complete the lab test above to see your findings.</p>
                    </div>
                    
                    <!-- continue button -->
                    <div class="flex justify-end">
                      <button 
                        id="continue-btn"
                        class="px-4 py-2 bg-amber-600 text-black rounded hover:bg-amber-500 transition-colors font-bold"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `,b()))}),s&&s.addEventListener("click",()=>{t.classList.add("hidden"),t.classList.remove("flex")}),t.addEventListener("click",o=>{o.target===t&&(t.classList.add("hidden"),t.classList.remove("flex"))}),document.addEventListener("keydown",o=>{o.key==="Escape"&&!t.classList.contains("hidden")&&(t.classList.add("hidden"),t.classList.remove("flex"))}));function b(){const o=document.getElementById("cloud-name"),l=document.getElementById("public-id"),g=document.getElementById("transformation"),x=document.getElementById("format"),C=document.getElementById("generated-url"),B=document.getElementById("preview-image"),f=document.getElementById("submit-answer"),h=document.getElementById("clear-answer"),c=document.getElementById("test-result"),y=document.getElementById("success-message"),L=document.getElementById("stored-results");if(!o||!l||!g||!x||!C||!B||!f||!h||!c||!y||!L){console.error("Some sandbox elements not found");return}function E(){const e=o.value,n=l.value,d=g.value,r=x.value;if(!e||!n)return;const m=`https://res.cloudinary.com/${e}/image/upload`,p=d?`/${d}`:"",v=r!=="auto"?`.${r}`:"",N=`${m}${p}/${n}${v}`;C.value=N,B.src=N}function A(){const e=window.location.pathname;return e.includes("lab_1")||e.includes("lab_2")||e.includes("/1")||e.includes("/2")}function w(){const e=window.location.pathname;return e.includes("lab_1")||e.includes("/1")?{name:"Lab 1",correctAnswer:"Ch Os",question:"After transforming the image, what letters or words can you see?",options:[{value:"Ch Os",text:"Ch Os"},{value:"Cl Os",text:"Cl Os"},{value:"C H O S",text:"C H O S"},{value:"Other",text:"Other"}],successMessage:`Well done! You've successfully enhanced the image and discovered the hidden letters "Ch Os". It looks like this is a piece of Dr. Chiaro Obscuro's stationery, and it ties this criminal to the crime. Keep this information safe as you continue your investigation!`,defaultCloudName:"demo",defaultPublicId:"sample",defaultTransformation:"e_contrast:50,c_scale,w_300,h_200,f_auto,q_auto"}:e.includes("lab_2")||e.includes("/2")?{name:"Lab 2",correctAnswer:"blue and white",question:"What's the original color of the string?",options:[{value:"red and blue",text:"red and blue"},{value:"red and white",text:"red and white"},{value:"blue and white",text:"blue and white"},{value:"white",text:"white"}],successMessage:"Yes! The string is blue and white. It looks like it's from a bakery!",defaultCloudName:"dr60nybtj",defaultPublicId:"twine_w1pkkj",defaultTransformation:"e_sepia/f_auto/q_auto"}:null}function O(){const e=document.querySelector('input[name="lab-answer"]:checked'),n=w(),d=n.correctAnswer;if(c.classList.remove("hidden"),!e){c.textContent="Please select an answer before submitting.",c.className="mt-3 text-sm font-bold text-yellow-400";return}const r=e.value,m=new Date().toLocaleString();r===d?(c.textContent=`✓ Correct! You found the hidden letters: ${d}`,c.className="mt-3 text-sm font-bold text-green-400",y.classList.remove("hidden"),R(n.name,r,!0,m),k(),window.dispatchEvent(new CustomEvent("labCompleted",{detail:{labName:n.name}})),window.showNotificationPanel&&window.showNotificationPanel(`Excellent detective work! You found the hidden letters: ${d}`)):(c.textContent="Not quite right. Look more carefully at the transformed image.",c.className="mt-3 text-sm font-bold text-red-400",y.classList.add("hidden"))}function _(){document.querySelectorAll('input[name="lab-answer"]').forEach(n=>n.checked=!1),c.classList.add("hidden")}function k(){document.querySelectorAll('input[name="lab-answer"]').forEach(n=>{n.disabled=!0,n.parentElement?.classList.add("opacity-50","cursor-not-allowed")}),f.disabled=!0,f.classList.add("opacity-50","cursor-not-allowed"),f.textContent="Completed ✓",h.disabled=!0,h.classList.add("opacity-50","cursor-not-allowed")}function $(){document.querySelectorAll('input[name="lab-answer"]').forEach(n=>{n.disabled=!1,n.parentElement?.classList.remove("opacity-50","cursor-not-allowed")}),f.disabled=!1,f.classList.remove("opacity-50","cursor-not-allowed"),f.textContent="Submit Answer",h.disabled=!1,h.classList.remove("opacity-50","cursor-not-allowed")}function P(){const e=document.getElementById("lab-test-container");e&&e.classList.remove("hidden")}function T(){const e=document.getElementById("lab-test-container");e&&e.classList.add("hidden")}function D(){const e=document.getElementById("lab-results-container");e&&e.classList.remove("hidden")}function M(){const e=w(),n=document.getElementById("lab-test-title"),d=document.getElementById("lab-test-question"),r=document.getElementById("lab-test-options"),m=document.getElementById("success-message-text");n&&(n.textContent=`${e.name} Test:`),d&&(d.textContent=e.question),m&&(m.textContent=e.successMessage),r&&(r.innerHTML="",e.options.forEach(p=>{const v=document.createElement("label");v.className="flex items-center space-x-2 cursor-pointer",v.innerHTML=`
              <input type="radio" name="lab-answer" value="${p.value}" class="text-amber-600">
              <span class="text-amber-200">${p.text}</span>
            `,r.appendChild(v)}))}function S(){const e=w();JSON.parse(localStorage.getItem("labResults")||"[]").some(r=>r.lab===e.name&&r.correct===!0)?(k(),c.classList.remove("hidden"),c.textContent=`✓ ${e.name} already completed successfully!`,c.className="mt-3 text-sm font-bold text-green-400",y.classList.remove("hidden")):($(),y.classList.add("hidden"))}function R(e,n,d,r){const m=JSON.parse(localStorage.getItem("labResults")||"[]"),p={lab:e,answer:n,correct:d,timestamp:r};m.push(p),localStorage.setItem("labResults",JSON.stringify(m)),I()}function I(){const e=JSON.parse(localStorage.getItem("labResults")||"[]");if(e.length===0){L.innerHTML='<p class="text-gray-400 italic">No results yet. Complete the lab test above to see your findings.</p>';return}let n="";e.forEach((r,m)=>{const p=r.correct?"✓":"✗",v=r.correct?"text-green-400":"text-red-400";n+=`<div class="flex justify-between items-center py-1">
            <span>${r.lab}: ${r.answer}</span>
            <span class="${v}">${p}</span>
          </div>`}),L.innerHTML=n;const d=document.getElementById("clear-all-results");d&&d.addEventListener("click",()=>{localStorage.removeItem("labResults"),I(),S()})}if([o,l,g,x].forEach(e=>{e.addEventListener("input",E)}),f.addEventListener("click",O),h.addEventListener("click",_),E(),I(),A()){const e=w();if(e){if(e.defaultCloudName){const n=document.getElementById("cloud-name");n&&(n.value=e.defaultCloudName)}if(e.defaultPublicId){const n=document.getElementById("public-id");n&&(n.value=e.defaultPublicId)}if(e.defaultTransformation){const n=document.getElementById("transformation");n&&(n.value=e.defaultTransformation)}E(),P(),M(),S()}else T()}else T();D()}});
